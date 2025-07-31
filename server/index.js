//http://localhost:5001/auth/test-db


const express = require('express');
const dotenv = require('dotenv');
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
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the DSA Rankboard API!" });
});
 

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});