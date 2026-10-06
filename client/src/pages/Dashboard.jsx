import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  // Fetch expenses from backend on load
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExpenses(res.data);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };
    fetchExpenses();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      const res = await axios.post(
        'http://localhost:5000/api/expenses',
        { title, amount: Number(amount) },
        config
      );
      
      setExpenses([res.data, ...expenses]);
      setTitle('');
      setAmount('');
    } catch (err) {
      console.error('Error adding expense:', err);
      const fallbackExpense = { _id: Date.now(), title, amount: Number(amount) };
      setExpenses([fallbackExpense, ...expenses]);
      setTitle('');
      setAmount('');
    }
  };

  // Delete expense function
  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      // Delete from backend (if using a backend route like /api/expenses/:id)
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, config);

      // Remove from state so it disappears instantly
      setExpenses(expenses.filter((exp) => (exp._id || exp.id) !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
      // Fallback local deletion if backend delete route isn't set up yet
      setExpenses(expenses.filter((exp) => (exp._id || exp.id) !== id));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Calculate total expenses automatically
  const totalExpense = expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  return (
    <div style={{ padding: '30px', color: 'white', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Expense Tracker Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '8px 15px', background: '#ff4d4d', color: 'white', border: 'none', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <hr style={{ margin: '20px 0' }} />

      {/* Total Expense Card */}
      <div style={{ background: '#222', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #444' }}>
        <h3>Total Spent</h3>
        <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50', margin: '5px 0 0 0' }}>
          ₹{totalExpense}
        </p>
      </div>

      {/* Add Expense Form */}
      <form onSubmit={handleAddExpense} style={{ marginBottom: '30px' }}>
        <h3>Add New Expense</h3>
        <input 
          type="text" 
          placeholder="Expense title (e.g., Coffee)" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Add Expense
        </button>
      </form>

      {/* Expense List */}
      <h3>Your Expenses</h3>
      {expenses.length === 0 ? (
        <p>No expenses added yet. Add one above!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {expenses.map((exp) => {
            const expenseId = exp._id || exp.id;
            return (
              <li key={expenseId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#222', padding: '10px 15px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #444' }}>
                <span>{exp.title} - <strong>₹{exp.amount}</strong></span>
                <button 
                  onClick={() => handleDeleteExpense(expenseId)} 
                  style={{ padding: '5px 10px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;