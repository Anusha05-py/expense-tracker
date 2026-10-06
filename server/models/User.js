const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // No two users can register with the same email
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Automatically adds a "createdAt" date to new users

module.exports = mongoose.model('User', userSchema);