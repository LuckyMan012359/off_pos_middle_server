const express = require('express');
const subSaleController = require('../controllers/subSaleController');

const router = express.Router();

// Create a user
router.post('/add-sale', subSaleController.addSaleFromSub);
router.post('/update-sale', subSaleController.updateSaleFromSub);
router.post('/delete-sale', subSaleController.deleteSaleFromSub);

module.exports = router;
