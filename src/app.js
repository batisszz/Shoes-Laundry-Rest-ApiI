// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemsRouter = require('./routes/items');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/', (req, res) => res.json({ ok: true, service: 'shoe-laundry-api' }));

// API routes
app.use('/api/items', itemsRouter);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
