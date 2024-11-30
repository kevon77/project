const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// API Endpoint for currency conversion
app.get('/convert', async (req, res) => {
  const { amount, from, to } = req.query;

  try {
    const apiKey = 'YOUR_API_KEY'; // Replace with a valid API key
    const response = await axios.get(
      `https://open.er-api.com/v6/latest/${from}`
    );

    const rate = response.data.rates[to];
    const convertedAmount = (amount * rate).toFixed(2);

    res.json({ convertedAmount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching exchange rates.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
