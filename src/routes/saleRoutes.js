const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

// Create a user
router.post('/add-sale', saleController.addSaleFromMain);
router.post('/update-sale', saleController.updateSaleFromMain);
router.post('/delete-sale', saleController.deleteSaleFromMain);

module.exports = router;
