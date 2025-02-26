const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.addPurchaseFromMain = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const response = await axios.post(
      `http://${data.outlet_info.domain}/api/v1/ApiPurchaseController/addPurchase`,
      data,
    );

    console.log(response.data);

    if (data.attachment) {
      const form = new FormData();
      const imagePath = path.join(__dirname, '..', 'uploads', 'attachments', data.attachment);

      if (fs.existsSync(imagePath)) {
        const image = fs.createReadStream(imagePath);
        form.append('photo', image, data.photo);

        const imageResponse = await axios.post(
          `http://${data.outlet_info.domain}/api/v1/ApiPurchaseController/uploadAttachment`,
          form,
          { headers: form.getHeaders() },
        );

        console.log('Image upload response:', imageResponse.data);
      } else {
        throw new Error('Image file not found.');
      }
    }

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

    const response = await axios.post(
      `http://${data.outlet_info.domain}/api/v1/ApiPurchaseController/updatePurchase`,
      data,
    );

    console.log(response.data);

    if (data.attachment) {
      const form = new FormData();
      const imagePath = path.join(__dirname, '..', 'uploads', 'attachments', data.attachment);

      if (fs.existsSync(imagePath)) {
        const image = fs.createReadStream(imagePath);
        form.append('photo', image, data.photo);

        const imageResponse = await axios.post(
          `http://${data.outlet_info.domain}/api/v1/ApiPurchaseController/uploadAttachment`,
          form,
          { headers: form.getHeaders() },
        );

        console.log('Image upload response:', imageResponse.data);
      } else {
        throw new Error('Image file not found.');
      }
    }

    res.json({ status: 'Purchase updated successfully' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deletePurchaseFromMain = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const reqData = {
      api_auth_key: data.api_auth_key,
      verify_code: data.verify_code,
    };

    const response = await axios.post(
      `http://${data.domain}/api/v1/ApiPurchaseController/deletePurchase`,
      reqData,
    );

    console.log(response.data);

    res.json({ status: 'Purchase deleted successfully' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};
