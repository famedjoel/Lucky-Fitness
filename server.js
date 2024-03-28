import express from 'express';
import bodyParser from 'body-parser';
import { setupRoutes } from './routes.js';

const app = express();
const PORT = 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static('client'));

// Setup routes
setupRoutes(app);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
