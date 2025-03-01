const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (for frontend HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route for currency conversion
app.get('/convert', async (req, res) => {
  const { amount, from, to } = req.query;

  if (!amount || !from || !to) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const apiKey = 'YOUR_API_KEY'; // Replace with a valid API key
    const response = await axios.get(`https://open.er-api.com/v6/latest/${from}`);

    if (!response.data.rates[to]) {
      return res.status(400).json({ error: 'Invalid currency code' });
    }

    const rate = response.data.rates[to];
    const convertedAmount = (amount * rate).toFixed(2);

    res.json({ convertedAmount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching exchange rates.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
