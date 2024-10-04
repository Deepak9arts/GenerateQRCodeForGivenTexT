/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';



inquirer
  .prompt([
    {
       type:'input',
       name: 'url',
       message: 'Enter the URL to generate a QR code:',

    }
  ])
  .then((answers) => {
    const url=answers.url;

    const qrCode = qr.image(url, { type: 'png' });
    const qrCodeFile = fs.createWriteStream('QRCode.png');
    qrCode.pipe(qrCodeFile);

    
    fs.writeFile('URL.txt',url,(err) => {
      if (err) throw err;
          console.log('The URL has been saved to URL.txt and the QR code has been generated as qrcode.png');
    });
})
  .catch((error) => {
    
    console.error('Error:', error);    
  });




//   The qrCode.pipe(qrCodeFile); statement is used to write the generated QR code image stream to a file. Here's a breakdown of what it does:

// qr.image(url, { type: 'png' }): This generates a QR code image from the provided URL. The { type: 'png' } option specifies that the output should be in PNG format. The result is a readable stream.

// fs.createWriteStream('qrcode.png'): This creates a writable stream to a file named qrcode.png.

// qrCode.pipe(qrCodeFile);: This pipes the readable stream (QR code image) into the writable stream (file). Essentially, it writes the QR code image to the qrcode.png file.