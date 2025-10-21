// api/index.js
require('dotenv').config();
const serverless = require('serverless-http');
const app = require('../src/app');

if (process.env.VERCEL === '1' || process.env.VERCEL === 'true') {
  module.exports = serverless(app);
} else {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
