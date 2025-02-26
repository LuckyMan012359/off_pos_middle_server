const express = require('express');
const subPurchaseController = require('../controllers/subPurchaseController');

const router = express.Router();

router.post('/add-purchase', subPurchaseController.addPurchaseFromSub);
router.post('/update-purchase', subPurchaseController.updatePurchaseFromSub);
router.post('/delete-purchase', subPurchaseController.deletePurchaseFromSub);

module.exports = router;
