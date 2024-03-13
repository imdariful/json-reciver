const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// enable cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  next();
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive POST requests
app.post('/receive', (req, res) => {
  // Log the received data to the console
  console.log('Received data:', req.body);

  // Write received data to a file named received.json
  fs.writeFile('received.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).send('Error writing file');
      return;
    }
    console.log('Data saved to received.json');
    res.status(200).send('Data received and saved');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
