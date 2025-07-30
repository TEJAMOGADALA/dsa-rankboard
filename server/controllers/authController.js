const pool = require('../config/db'); // Note the updated path to the db config
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 
// @desc    Register a new user
// @route   POST /auth/register
exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length > 0) {
            return res.status(401).json("User already exists!");
        }
 
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
 
        const client = await pool.connect();
        let newUser;
        try {
            await client.query('BEGIN');
            const userInsertQuery = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id';
            const userResult = await client.query(userInsertQuery, [email, bcryptPassword]);
            const newUserId = userResult.rows[0].id;
 
            const profileInsertQuery = 'INSERT INTO user_profiles (user_id, username) VALUES ($1, $2)';
            await client.query(profileInsertQuery, [newUserId, username]);
 
            await client.query('COMMIT');
            newUser = { id: newUserId };
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
 
const payload = { user: { id: newUser.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
 
// @desc    Login a user
// @route   POST /auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Invalid credential");
        }
 
const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            return res.status(401).json("Invalid credential");
        }
 
        const payload = { user: { id: user.rows[0].id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};