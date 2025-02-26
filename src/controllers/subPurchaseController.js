const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.addPurchaseFromSub = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const response = await axios.post(
      `http://localhost/off_pos/api/v1/ApiPurchaseController/addPurchase`,
      data,
    );

    console.log(response.data);

    res.json({ status: 'Purchase added successfully!' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePurchaseFromSub = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const response = await axios.post(
      `http://localhost/off_pos/api/v1/ApiPurchaseController/updatePurchase`,
      data,
    );

    console.log(response.data);

    res.json({ status: 'Purchase updated successfully' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deletePurchaseFromSub = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const reqData = {
      api_auth_key: data.api_auth_key,
      verify_code: data.verify_code,
      domain: data.domain,
    };

    const response = await axios.post(
      `http://localhost/off_pos/api/v1/ApiPurchaseController/deletePurchase`,
      reqData,
    );

    console.log(response.data);

    res.json({ status: 'Purchase deleted successfully' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};
