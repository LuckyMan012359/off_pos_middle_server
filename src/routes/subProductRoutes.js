const express = require('express');
const subProductController = require('../controllers/subProductController');

const router = express.Router();

// Create a user
router.post('/add-item', subProductController.addItemFromSub);
router.post('/update-item', subProductController.updateItemFromSub);
router.post('/delete-item', subProductController.deleteItemFromSub);

module.exports = router;
