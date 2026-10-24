const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

let mongoClient;
let portfolioCollection;
let contactCollection;

app.get('/health', (req, res) => {
  res.status(portfolioCollection ? 200 : 503).json({
    status: portfolioCollection ? 'ok' : 'starting'
  });
});

app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolio = await portfolioCollection.findOne({ _id: 'main' });
    if (!portfolio?.data) {
      return res.status(404).json({
        message: 'Portfolio data is not configured in MongoDB.'
      });
    }
    res.json(portfolio.data);
  } catch (err) {
    console.error('Failed to load portfolio:', err);
    res.status(500).json({ message: 'Failed to load portfolio data.' });
  }
});

app.get('/api/codeforces/:handle', async (req, res) => {
  try {
    const { handle } = req.params;
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    res.json(response.data.result[0]);
  } catch (err) {
    res.status(404).json({ err: "Failed to access data from Codeforces" });
  }
});


app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (![name, email, message].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  try {
    await contactCollection.insertOne({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date()
    });
    res.status(201).json({ success: true, message: 'Message received successfully!' });
  } catch (err) {
    console.error('Failed to save contact message:', err);
    res.status(500).json({ success: false, message: 'Failed to save your message.' });
  }
});

async function start() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required. Add your MongoDB connection string to backend/.env.');
  }

  mongoClient = new MongoClient(process.env.MONGODB_URI);
  await mongoClient.connect();
  const db = mongoClient.db(process.env.MONGODB_DB || 'personal_web');
  portfolioCollection = db.collection('portfolio');
  contactCollection = db.collection('contact_messages');

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, '0.0.0.0', () => console.log(`Backend listening on port ${PORT}`));
}

start().catch((err) => {
  console.error('Backend startup failed:', err.message);
  process.exit(1);
});
