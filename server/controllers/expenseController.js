const Expense = require('../models/Expense');

// @desc    Get all expenses for the logged-in user
const getExpenses = async (req, res) => {
  try {
    // req.user.id comes from the security guard (authMiddleware)
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add a new expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    // Create the expense and link it to the logged-in user
    const expense = await Expense.create({
      user: req.user.id, 
      title,
      amount,
      category
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getExpenses, addExpense };