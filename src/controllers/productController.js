const User = require('../models/Category');
const axios = require('axios');

exports.addItemFromMain = async (req, res) => {
  try {
    console.log(123456789);
    const data = req.body;

    let reqData = {
      api_auth_key: '8c988a7e-1418-4b9e-a472-a955adfa6cc0',
      name: data.name,
      alternative_name: data.alternative_name,
      type: data.type,
      category_name: data.category_name,
      brand_name: data.brand_name,
      supplier_name: data.supplier_name,
      alert_quantity: data.alert_quantity,
      unit_type: data.unit_type === '1' ? 'Single Unit' : 'Double Unit',
      purchase_unit_name: data.purchase_unit_name,
      sale_unit_name: data.sale_unit_name,
      conversion_rate: data.conversion_rate,
      purchase_price: data.purchase_price,
      whole_sale_price: data.whole_sale_price,
      sale_price: data.sale_price,
      description: data.description,
      warranty: data.warranty,
      warranty_type: data.warranty_date,
      guarantee: data.guarantee,
      guarantee_type: data.guarantee_type,
      photo: 'test.png',
      loyalty_point: data.loyalty_point,
      del_status: 'Live',
      tax_information: data.tax_information,
    };

    const response = await axios.post(
      'http://localhost/sub_store/api/v1/ApiItemController/addItem',
      reqData,
    );

    console.log('Response:', response.data);
    res.json({ status: 'Category added successfully!' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};
