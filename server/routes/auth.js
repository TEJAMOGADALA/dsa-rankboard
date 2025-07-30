const router = require('express').Router();
const { register, login } = require('../controllers/authController');
 
// Defines the endpoint and maps it to the register function
router.post('/register', register);
 
// Defines the endpoint and maps it to the login function
router.post('/login', login);
 
module.exports = router;