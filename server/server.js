const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes'); 
const expenseRoutes = require('./routes/expenseRoutes'); // 1. Import expense routes

const app = express();
app.use(cors());

app.use(cors()); 
app.use(express.json()); 

connectDB();

app.use('/api/users', authRoutes);
app.use('/api/expenses', expenseRoutes); // 2. Connect the URL /api/expenses

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Hello from the Expense Tracker backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});