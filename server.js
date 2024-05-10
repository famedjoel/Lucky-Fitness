import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { dirname, join } from 'path'; // Import dirname and join

const __filename = fileURLToPath(import.meta.url); // Get the filename of the current module
const __dirname = dirname(__filename); // Get the directory name of the current module

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'client' directory
app.use(express.static(join(__dirname, 'client')));

// Route all other requests to your single HTML file
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
