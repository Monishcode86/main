const express = require('express');
const bwipjs = require('bwip-js'); // Barcode library

const app = express();
const port = 3000;

// Endpoint to generate and return barcode image
app.get('/barcode/:code', async (req, res) => {
  const code = req.params.code;

  try {
    // Generate barcode using bwip-js
    const pngBuffer = await bwipjs.toBuffer({
      bcid: 'code128',  // Barcode type
      text: code,       // Text to encode
      scale: 3,         // Scaling factor
      height: 10,       // Bar height, in millimeters
      includetext: true // Show human-readable text
    });

    // Set response headers
    res.set('Content-Type', 'image/png');
    res.send(pngBuffer);
  } catch (error) {
    console.error('Error generating barcode:', error);
    res.status(500).send('Error generating barcode');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Barcode service listening at http://localhost:${port}`);
});
