const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Create a user
router.post('/add-item', productController.addItemFromMain);

module.exports = router;
