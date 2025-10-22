// api/index.js
require('dotenv').config();
const serverless = require('serverless-http');
const app = require('../src/app');

// Kalau dijalankan di Vercel 
if (process.env.VERCEL === '1' || process.env.VERCEL === 'true') {
  module.exports = serverless(app);
} else {
  // Kalau dijalankan secara lokal (npm run dev)
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
