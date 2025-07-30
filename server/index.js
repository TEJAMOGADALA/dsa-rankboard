//http://localhost:5001/auth/test-db


const express = require('express');
const dotenv = require('dotenv');
 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
 
// == MIDDLEWARE ==
app.use(express.json()); // Allows us to access req.body
 
// == ROUTES ==
app.use('/auth', require('./routes/auth')); // All routes in auth.js will start with /auth
 
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the DSA Rankboard API!" });
});
 
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});