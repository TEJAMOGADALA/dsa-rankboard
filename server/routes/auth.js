const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController');
 
// Defines the endpoint and maps it to the register function
router.post('/register', register);
 
// Defines the endpoint and maps it to the login function
router.post('/login', login);

// == GOOGLE OAUTH ==
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, generate JWT and redirect
    const token = jwt.sign({ user: { id: req.user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
});

// == GITHUB OAUTH ==
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, generate JWT and redirect
    const token = jwt.sign({ user: { id: req.user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
});
 
module.exports = router;