const express = require('express');
const router = express.Router();
// We import both functions here now
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser); // This is your new login route!

module.exports = router;