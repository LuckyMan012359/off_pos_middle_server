const express = require('express');
const subProductController = require('../controllers/subProductController');

const router = express.Router();

// Create a user
router.post('/add-item', subProductController.addItemFromMain);

module.exports = router;
