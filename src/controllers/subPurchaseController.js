const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.addPurchaseFromSub = async (req, res) => {
  try {
    const data = req.body;

    const response = await axios.post(
      `http://localhost/off_pos/api/v1/ApiPurchaseController/addPurchase`,
      data,
    );

    res.json({ status: 'Purchase added successfully!' });

    if (data.attachment) {
      const form = new FormData();
      const imagePath = path.join(__dirname, '..', 'uploads', 'attachments', data.attachment);

      if (fs.existsSync(imagePath)) {
        const image = fs.createReadStream(imagePath);
        form.append('photo', image, data.photo);

        const imageResponse = await axios.post(
          `http://localhost/off_pos/api/v1/ApiPurchaseController/uploadAttachment`,
          form,
          { headers: form.getHeaders() },
        );

        console.log('Image upload response:', imageResponse.data);
      } else {
        throw new Error('Image file not found.');
      }
    }
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

    if (data.attachment) {
      const form = new FormData();
      const imagePath = path.join(__dirname, '..', 'uploads', 'attachments', data.attachment);

      if (fs.existsSync(imagePath)) {
        const image = fs.createReadStream(imagePath);
        form.append('photo', image, data.photo);

        const imageResponse = await axios.post(
          `http://localhost/off_pos/api/v1/ApiPurchaseController/uploadAttachment`,
          form,
          { headers: form.getHeaders() },
        );

        console.log('Image upload response:', imageResponse.data);
      } else {
        throw new Error('Image file not found.');
      }
    }

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
