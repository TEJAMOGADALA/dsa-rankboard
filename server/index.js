//http://localhost:5001/auth/test-db


const express = require('express');
const dotenv = require('dotenv');
const open = require('open'); // For opening URLs in the browser
const swaggerDocs = require('./config/swagger'); // use Swagger for API documentation
const session = require('express-session'); // 1. require session
const passport = require('passport');     // 2. require passport
require('./config/passport-setup');       // 3. This executes the passport config file
require('./cron/updateScores');           // Start the cron job
 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
 
// == MIDDLEWARE ==
app.use(express.json()); // Allows us to access req.body
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
 
// == ROUTES ==
app.use('/auth', require('./routes/auth')); // All routes in auth.js will start with /auth
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

// A root API endpoint that lists all available routes
app.get('/api', (req, res) => {
  res.json({
      message: "Welcome to the DSA Rankboard API!",
      endpoints: {
          authentication: {
              register: "POST /auth/register",
              login: "POST /auth/login"
          },
          profiles: {
              update_profile: "PUT /api/profiles",
              get_leetcode_stats: "GET /api/profiles/leetcode/:username",
              get_codeforces_stats: "GET /api/profiles/codeforces/:handle",
              get_test_score: "GET /api/profiles/score/:leetcodeUsername/:codeforcesHandle"
          },
          leaderboard: {
              get_global_leaderboard: "GET /api/leaderboard"
          },
          documentation: "GET /api-docs"
      }
  });
});
 
// ==SWAGGER DOCS ==
// Server the interactive API documentation at /api-docs
swaggerDocs(app); // Initialize Swagger documentation
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  // Automatically open the API documentation page on server start
  open(`http://localhost:${PORT}/api-docs`).catch(err => {
    console.error('Failed to open browser:', err);
  });
});