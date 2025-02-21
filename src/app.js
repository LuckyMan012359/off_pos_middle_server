const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));

app.use((req, res, next) => {
  console.log(`\x1b[42m ${req.method} ${req.url} request received.\x1b[0m`);
  next();
});

app.post('/upload', (req, res) => {
  const { image, image_name } = req.body;

  if (!image) {
    return res.status(400).json({ message: 'No image data provided' });
  }

  const base64Data = image.replace(/^data:image\/png;base64,/, '');

  const filePath = path.join(__dirname, 'uploads', image_name);

  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({ message: 'Failed to save image' });
    }

    // Successfully saved the image, return the image name or path
    res.status(200).json({ image_name: filePath });
    console.log('success');
  });
});
app.use('/api/main/product', productRoutes);
app.use('/api/main/sale', saleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
