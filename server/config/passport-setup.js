const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const pool = require('./db');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        done(null, userResult.rows[0]);
    } catch (err) {
        done(err);
    }
});

const handleOAuthUser = async (email, username, done) => {
    try {
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            // User exists, log them in
            return done(null, existingUser.rows[0]);
        }

        // If user doesn't exist, create a new one
        const client = await pool.connect();
        let newUser;
        try {
            await client.query('BEGIN');
            // Password can be null as OAuth is used for login
            const userQuery = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id';
            const userResult = await client.query(userQuery, [email, 'OAUTH_USER']);
            const newUserId = userResult.rows[0].id;
            
            const profileQuery = 'INSERT INTO user_profiles (user_id, username) VALUES ($1, $2) RETURNING *';
            const profileResult = await client.query(profileQuery, [newUserId, username]);
            
            await client.query('COMMIT');
            newUser = { id: newUserId, ...profileResult.rows[0] };
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
        return done(null, newUser);

    } catch (err) {
        return done(err, false);
    }
};

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    handleOAuthUser(profile.emails[0].value, profile.displayName, done);
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    // GitHub may not provide a public email, handle this case
    const email = profile.emails ? profile.emails[0].value : null;
    if (!email) {
        return done(new Error("GitHub did not provide an email address."), false);
    }
    handleOAuthUser(email, profile.username, done);
}));