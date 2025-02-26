const express = require('express');
const purchaseController = require('../controllers/purchaseController');

const router = express.Router();

// Create a user
router.post('/add-purchase', purchaseController.addPurchaseFromMain);
router.post('/update-purchase', purchaseController.updatePurchaseFromMain);
router.post('/delete-purchase', purchaseController.deletePurchaseFromMain);

module.exports = router;
