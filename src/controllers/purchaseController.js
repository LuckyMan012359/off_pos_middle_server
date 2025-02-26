const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.addPurchaseFromMain = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const response = await axios.post(
      `http://localhost/sub_store/api/v1/ApiPurchaseController/addPurchase`,
      data,
    );

    console.log(response.data);

    res.json({ status: 'Purchase added successfully!' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePurchaseFromMain = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    res.json({ status: 'Purchase updated successfully' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};
