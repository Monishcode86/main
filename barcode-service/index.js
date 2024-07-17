const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = 5000;

// Example user email and password

// Concatenate email and password into text for QR code
app.get('/qrcode', async (req, res) => {
    try {
        const userEmail = 'operator1@sigmacnc.in';
        const userPassword = '$Wim@2024';
        const text = `Email: ${userEmail}, Password: ${userPassword}`;

       const qrCode = QRCode.toString(text, { type: 'terminal' }, function (err, url) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(url);
        });
          res.send(`<img src="${qrCode}" alt="QR Code" />`);
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Error generating QR code');
    }
})

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// For Terminal


// const { createCanvas } = require('canvas'); // Optional, for customizing QR code appearance

// const app = express();
// const port = 5000;
// const text ='Hello, World!';
// QRCode.toString(text,{type:'terminal'}, function (err, url) {
//     console.log(url)
//   })

// For URL

// Endpoint to generate and return QR code image

// app.get('/qrcode', async (req, res) => {
//   const text = req.query.text || 'Hello, World!';
  
//   try {
//     // Generate QR code using qrcode
//     const qrCode = await QRCode.toDataURL(text, { errorCorrectionLevel: 'H' });
    
//     // Return the QR code image as a response
//     res.send(`<img src="${qrCode}" alt="QR Code" />`);
//   } catch (error) {
//     console.error('Error generating QR code:', error);
//     res.status(500).send('Error generating QR code');
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`QR code service listening at http://localhost:${port}`);
});
