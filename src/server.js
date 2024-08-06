// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.post('/api/message', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('YOUR_AI_SERVICE_ENDPOINT', { prompt: message });
    res.json({ reply: response.data.reply });
  } catch (error) {
    console.error('Error processing the message:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
