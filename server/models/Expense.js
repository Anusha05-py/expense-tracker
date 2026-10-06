const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This securely links the expense to a specific user's account
    required: true
  },
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now // If you don't provide a date, it defaults to right now
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);