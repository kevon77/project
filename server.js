const express = require('express');
const app = express();
const path = require('path');

// Serve static files (if needed, for front-end files like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route
app.get('/', (req, res) => {
  res.send('Welcome to the Currency Converter!');
});

// Your currency conversion route
app.get('/convert', async (req, res) => {
  const { amount, from, to } = req.query;
  // Your existing conversion logic here
  res.json({ convertedAmount: 'Converted Value' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
