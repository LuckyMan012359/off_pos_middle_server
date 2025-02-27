const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const subProductRoutes = require('./routes/subProductRoutes');
const subSaleRoutes = require('./routes/subSaleRoutes');
const subPurchaseRoutes = require('./routes/subPurchaseRoutes');

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

const uploadDirectory = path.join(__dirname, 'uploads', 'attachments');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload-attachment', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  res.status(200).send({
    message: 'File uploaded successfully',
  });
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
app.use('/api/main/purchase', purchaseRoutes);
app.use('/api/sub/product', subProductRoutes);
app.use('/api/sub/sale', subSaleRoutes);
app.use('/api/sub/purchase', subPurchaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
