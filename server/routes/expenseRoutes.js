const express = require('express');
const router = express.Router();
const { getExpenses, addExpense } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware'); // Import your security guard

// We put 'protect' inside the route. 
// Now, a user MUST have a valid token to access these!
router.route('/')
  .get(protect, getExpenses)
  .post(protect, addExpense);

module.exports = router;