const User = require('../models/Category');
const axios = require('axios');

exports.addItemFromMain = async (req, res) => {
  try {
    const data = req.body;

    console.log(JSON.stringify(data));

    if (data.p_type === 'General_Product' || data.p_type === 'Installment_Product') {
      data.opening_stock_data.forEach(async (outlet) => {
        let reqData = {
          api_auth_key: outlet.api_key,
          name: data.name,
          alternative_name: data.alternative_name,
          type: data.type,
          code: data.code,
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
          loyalty_point: data.loyalty_point,
          profit_margin: data.profit_margin,
          del_status: 'Live',
          tax_information: data.tax_information,
          opening_stock: `[{'item_description':'','quantity':'${outlet.quantity}','outlet_name':'${outlet.outlet_name}'}]`,
        };

        const response = await axios.post(
          `http://${outlet.domain}/api/v1/ApiItemController/addItem`,
          reqData,
        );

        console.log(reqData);
        console.log(response.data);
      });
    } else if (data.p_type !== 'Variation_Product' || data.p_type !== 'Combo_Product') {
      let reqData = {
        api_auth_key: data.opening_stock_data[0].api_key,
        name: data.name,
        alternative_name: data.alternative_name,
        type: data.type,
        code: data.code,
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
        loyalty_point: data.loyalty_point,
        profit_margin: data.profit_margin,
        del_status: 'Live',
        tax_information: data.tax_information,
        opening_stock: JSON.stringify(data.opening_stock_data),
      };

      const response = await axios.post(
        `http://${data.opening_stock_data[0].domain}/api/v1/ApiItemController/addItem`,
        reqData,
      );

      console.log(reqData);

      console.log(response.data);
    }

    res.json({ status: 'Item added successfully!' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.editItemFromMain = async (req, res) => {
  try {
    const data = req.body;

    console.log(JSON.stringify(data.opening_stock_data));

    if (data.p_type === 'General_Product' || data.p_type === 'Installment_Product') {
      data.opening_stock_data.forEach(async (outlet) => {
        let reqData = {
          api_auth_key: outlet.api_key,
          name: data.name,
          alternative_name: data.alternative_name,
          type: data.type,
          code: data.code,
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
          loyalty_point: data.loyalty_point,
          profit_margin: data.profit_margin,
          del_status: 'Live',
          tax_information: data.tax_information,
          opening_stock: `[{'item_description':'','quantity':'${outlet.quantity}','outlet_name':'${outlet.outlet_name}'}]`,
        };

        const response = await axios.post(
          `http://${outlet.domain}/api/v1/ApiItemController/updateItem`,
          reqData,
        );

        console.log(reqData);
        console.log(response.data);
      });
    } else {
      let reqData = {
        api_auth_key: data.opening_stock_data[0].api_key,
        name: data.name,
        alternative_name: data.alternative_name,
        type: data.type,
        code: data.code,
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
        loyalty_point: data.loyalty_point,
        profit_margin: data.profit_margin,
        del_status: 'Live',
        tax_information: data.tax_information,
        opening_stock: JSON.stringify(data.opening_stock_data),
      };

      const response = await axios.post(
        `http://${data.opening_stock_data[0].domain}/api/v1/ApiItemController/addItem`,
        reqData,
      );

      console.log(reqData);

      console.log(response.data);
    }

    res.json({ status: 'Item edited successfully!' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItemFromMain = async (req, res) => {
  try {
    const data = req.body;

    const opening_stocks = data.opening_stocks;

    if (data.type === 'General_Product' || data.type === 'Installment_Product') {
      opening_stocks.forEach((opening_stock) => {
        const fetchData = async () => {
          const outlet = opening_stock.outlet_data[0];

          const reqData = {
            code: data.code,
            api_auth_key: outlet.token,
          };

          const response = await axios.post(
            `http://${outlet.domain}/api/v1/ApiItemController/deleteItem`,
            reqData,
          );

          console.log(response.data);
        };

        fetchData();
      });
    } else {
      console.log(opening_stocks[0].outlet_data[0].domain);

      const outlet = opening_stocks[0].outlet_data[0];

      const reqData = {
        code: data.code,
        api_auth_key: outlet.token,
      };

      const response = await axios.post(
        `http://${outlet.domain}/api/v1/ApiItemController/deleteItem`,
        reqData,
      );

      console.log(response.data);
    }

    res.json({ status: 'Item edited successfully!' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};
