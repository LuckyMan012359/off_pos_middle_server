const express = require('express');
const purchaseController = require('../controllers/purchaseController');

const router = express.Router();

// Create a user
router.post('/add-item', purchaseController.addPurchaseFromMain);

module.exports = router;
