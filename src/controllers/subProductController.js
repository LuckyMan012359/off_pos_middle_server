const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.addItemFromSub = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    if (data.p_type === 'General_Product' || data.p_type === 'Installment_Product') {
      data.opening_stock_data.forEach(async (outlet) => {
        let reqData = {
          api_auth_key: data.api_key,
          name: data.name,
          alternative_name: data.alternative_name,
          type: data.type,
          code: data.code,
          photo: data.photo,
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
          domain: data.domain,
          opening_stock: `[{'item_description':'','quantity':'${outlet.quantity}','outlet_name':'${outlet.outlet_name}'}]`,
        };

        const response = await axios.post(
          `http://localhost/off_pos/api/v1/ApiItemController/addItem`,
          reqData,
        );

        console.log(reqData);
        console.log(response.data);

        console.log(data.photo);

        if (data.photo) {
          const form = new FormData();
          const imagePath = path.join(__dirname, '..', 'uploads', data.photo);

          console.log(imagePath);

          if (fs.existsSync(imagePath)) {
            const image = fs.createReadStream(imagePath);
            form.append('photo', image, data.photo);

            const imageResponse = await axios.post(
              `http://localhost/off_pos/api/v1/ApiItemController/uploadImage`,
              form,
              { headers: form.getHeaders() },
            );

            console.log('Image upload response:', imageResponse.data);
          } else {
            throw new Error('Image file not found.');
          }
        }
      });
    } else if (data.p_type !== 'Variation_Product' || data.p_type !== 'Combo_Product') {
      let reqData = {
        api_auth_key: data.api_key,
        name: data.name,
        alternative_name: data.alternative_name,
        type: data.type,
        code: data.code,
        photo: data.photo,
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
        domain: data.domain,
        del_status: 'Live',
        tax_information: data.tax_information,
        opening_stock: JSON.stringify(data.opening_stock_data),
      };

      const response = await axios.post(
        `http://localhost/off_pos/api/v1/ApiItemController/addItem`,
        reqData,
      );

      console.log(reqData);

      console.log(response.data);

      console.log(data.photo);

      if (data.photo) {
        const form = new FormData();
        const imagePath = path.join(__dirname, '..', 'uploads', data.photo);

        console.log(imagePath);

        if (fs.existsSync(imagePath)) {
          const image = fs.createReadStream(imagePath);
          form.append('photo', image, data.photo);

          const imageResponse = await axios.post(
            `http://localhost/off_pos/api/v1/ApiItemController/uploadImage`,
            form,
            { headers: form.getHeaders() },
          );

          console.log('Image upload response:', imageResponse.data);
        } else {
          throw new Error('Image file not found.');
        }
      }
    }

    res.json({ status: 'Item added successfully!' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateItemFromSub = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    if (data.p_type === 'General_Product' || data.p_type === 'Installment_Product') {
      data.opening_stock_data.forEach(async (outlet) => {
        let reqData = {
          api_auth_key: data.api_key,
          outlet_name: outlet.outlet_name,
          name: data.name,
          alternative_name: data.alternative_name,
          type: data.type,
          code: data.code,
          photo: data.photo,
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
          domain: data.domain,
          opening_stock: `[{'item_description':'','quantity':'${outlet.quantity}','outlet_name':'${outlet.outlet_name}'}]`,
        };

        const response = await axios.post(
          `http://localhost/off_pos/api/v1/ApiItemController/updateItem`,
          reqData,
        );

        console.log(reqData);
        console.log(response.data);

        console.log(data.photo);

        if (data.photo) {
          const form = new FormData();
          const imagePath = path.join(__dirname, '..', 'uploads', data.photo);

          console.log(imagePath);

          if (fs.existsSync(imagePath)) {
            const image = fs.createReadStream(imagePath);
            form.append('photo', image, data.photo);

            const imageResponse = await axios.post(
              `http://localhost/off_pos/api/v1/ApiItemController/uploadImage`,
              form,
              { headers: form.getHeaders() },
            );

            console.log('Image upload response:', imageResponse.data);
          } else {
            throw new Error('Image file not found.');
          }
        }
      });
    } else if (data.p_type !== 'Variation_Product' || data.p_type !== 'Combo_Product') {
      let reqData = {
        api_auth_key: data.api_key,
        outlet_name: data.opening_stock_data[0].outlet_name,
        name: data.name,
        alternative_name: data.alternative_name,
        type: data.type,
        code: data.code,
        photo: data.photo,
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
        domain: data.domain,
        del_status: 'Live',
        tax_information: data.tax_information,
        opening_stock: JSON.stringify(data.opening_stock_data),
      };

      const response = await axios.post(
        `http://localhost/off_pos/api/v1/ApiItemController/updateItem`,
        reqData,
      );

      console.log(reqData);

      console.log(response.data);

      console.log(data.photo);

      if (data.photo) {
        const form = new FormData();
        const imagePath = path.join(__dirname, '..', 'uploads', data.photo);

        console.log(imagePath);

        if (fs.existsSync(imagePath)) {
          const image = fs.createReadStream(imagePath);
          form.append('photo', image, data.photo);

          const imageResponse = await axios.post(
            `http://localhost/off_pos/api/v1/ApiItemController/uploadImage`,
            form,
            { headers: form.getHeaders() },
          );

          console.log('Image upload response:', imageResponse.data);
        } else {
          throw new Error('Image file not found.');
        }
      }
    }

    res.json({ status: 'Item added successfully!' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItemFromSub = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    let reqData = {
      api_auth_key: data.token,
      domain: data.domain,
      code: data.code,
    };

    const response = await axios.post(
      `http://localhost/off_pos/api/v1/ApiItemController/deleteItem`,
      reqData,
    );

    console.log(reqData);
    console.log(response.data);

    res.json({ status: 'Item deleted successfully!' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};
