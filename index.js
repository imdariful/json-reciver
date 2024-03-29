const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

// enable cors
app.use(cors());

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
