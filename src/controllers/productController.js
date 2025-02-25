const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.addItemFromMain = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    if (data.p_type === 'General_Product' || data.p_type === 'Installment_Product') {
      data.opening_stock_data.forEach(async (outlet) => {
        let reqData = {
          api_auth_key: outlet.api_key,
          name: data.name,
          alternative_name: data.alternative_name,
          type: data.p_type,
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
          guarantee_type: data.guarantee_date,
          loyalty_point: data.loyalty_point,
          profit_margin: data.profit_margin,
          del_status: 'Live',
          tax_information: data.tax_information,
          opening_stock: `[{'item_description':'','quantity':'${outlet.quantity}','outlet_name':'${outlet.outlet_name}'}]`,
        };

        if (outlet.quantity !== '') {
          const response = await axios.post(
            `http://${outlet.domain}/api/v1/ApiItemController/addItem`,
            reqData,
          );
          console.log(response.data);

          console.log(reqData);

          console.log(outlet.domain);

          if (data.photo) {
            const form = new FormData();
            const imagePath = path.join(__dirname, '..', 'uploads', data.photo);

            console.log(imagePath);

            if (fs.existsSync(imagePath)) {
              const image = fs.createReadStream(imagePath);
              form.append('photo', image, data.photo);

              const imageResponse = await axios.post(
                `http://${outlet.domain}/api/v1/ApiItemController/uploadImage`,
                form,
                { headers: form.getHeaders() },
              );

              console.log('Image upload response:', imageResponse.data);
            } else {
              throw new Error('Image file not found.');
            }
          }
        }
      });
    } else if (data.p_type !== 'Variation_Product' || data.p_type !== 'Combo_Product') {
      const groupedData = data.opening_stock_data.reduce((acc, item) => {
        if (!acc[item.api_key]) {
          acc[item.api_key] = [];
        }
        acc[item.api_key].push(item);
        return acc;
      }, {});

      const result = Object.values(groupedData);

      console.log(result);

      result.forEach(async (element) => {
        let reqData = {
          api_auth_key: element[0].api_key,
          name: data.name,
          alternative_name: data.alternative_name,
          type: data.p_type,
          code: data.code,
          photo: data.photo,
          category_name: data.category_name,
          brand_name: data.brand_name,
          supplier_name: data.supplier_name,
          alert_quantity: data.alert_quantity,
          unit_type: data.unit_type === 1 ? 'Single Unit' : 'Double Unit',
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
          guarantee_type: data.guarantee_date,
          loyalty_point: data.loyalty_point,
          profit_margin: data.profit_margin,
          del_status: 'Live',
          tax_information: data.tax_information,
          opening_stock: JSON.stringify(element),
        };

        const requestURL = `http://${element[0].domain}/api/v1/ApiItemController/addItem`;
        const response = await axios.post(requestURL, reqData);
        console.log('url ->>>>>>>>>>>>>>>>>>>>>>>>>>', requestURL);

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
              `http://${data.opening_stock_data[0].domain}/api/v1/ApiItemController/uploadImage`,
              form,
              { headers: form.getHeaders() },
            );

            console.log('Image upload response:', imageResponse.data);
          } else {
            throw new Error('Image file not found.');
          }
        }
      });
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

    console.dir(data, { depth: 2 });

    let outletIds = [];

    data.preview_opening_stock_data.forEach((item) => {
      if (!outletIds.includes(item.outlet_id)) {
        outletIds.push(item.outlet_id);
      }
    });

    if (data.p_type === 'General_Product' || data.p_type === 'Installment_Product') {
      for (let outlet of data.opening_stock_data) {
        console.log('outlet_data =->?>>>>>>>>>>>>>>>', outlet);

        let reqData = {
          api_auth_key: outlet.api_key,
          name: data.name,
          alternative_name: data.alternative_name,
          type: data.type,
          code: data.code,
          photo: data.photo,
          category_name: data.category_name,
          brand_name: data.brand_name,
          supplier_name: data.supplier_name,
          alert_quantity: data.alert_quantity,
          unit_type: Number(data.unit_type) === 1 ? 'Single Unit' : 'Double Unit',
          purchase_unit_name: data.purchase_unit_name,
          sale_unit_name: data.sale_unit_name,
          conversion_rate: data.conversion_rate,
          purchase_price: data.purchase_price,
          whole_sale_price: data.whole_sale_price,
          sale_price: data.sale_price,
          description: data.description,
          warranty: data.warranty,
          warranty_type: data.warranty_date ? data.warranty_date : data.warranty_type,
          guarantee: data.guarantee,
          guarantee_type: data.guarantee_date ? data.guarantee_date : data.guarantee_type,
          loyalty_point: data.loyalty_point,
          profit_margin: data.profit_margin,
          del_status: 'Live',
          tax_information: data.tax_information,
          opening_stock: `[{'item_description':'','quantity':'${outlet.quantity}','outlet_name':'${outlet.outlet_name}'}]`,
        };

        if (outlet.quantity !== '') {
          const requestURL = `http://${outlet.domain}/api/v1/ApiItemController/updateItem`;

          const response = await axios.post(requestURL, reqData);

          console.log(reqData);
          console.log(response.data);
          console.log('url ->>>>>>>>>>>>>>>>>>>>>>>>>>', requestURL);

          console.log(data.photo);

          if (data.photo) {
            const form = new FormData();
            const imagePath = path.join(__dirname, '..', 'uploads', data.photo);

            console.log(imagePath);

            if (fs.existsSync(imagePath)) {
              const image = fs.createReadStream(imagePath);
              form.append('photo', image, data.photo);

              const imageResponse = await axios.post(
                `http://${data.opening_stock_data[0].domain}/api/v1/ApiItemController/uploadImage`,
                form,
                { headers: form.getHeaders() },
              );

              console.log('Image upload response:', imageResponse.data);
            } else {
              throw new Error('Image file not found.');
            }
          }

          outletIds = outletIds.filter((id) => id !== outlet.outlet_id);
        }
      }
    } else if (data.p_type !== 'Variation_Product' || data.p_type !== 'Combo_Product') {
      const groupedData = data.opening_stock_data.reduce((acc, item) => {
        if (!acc[item.api_key]) {
          acc[item.api_key] = [];
        }
        acc[item.api_key].push(item);
        return acc;
      }, {});

      const result = Object.values(groupedData);

      console.log(result);

      for (let element of result) {
        let reqData = {
          api_auth_key: element[0].api_key,
          name: data.name,
          alternative_name: data.alternative_name,
          type: data.type,
          code: data.code,
          photo: data.photo,
          category_name: data.category_name,
          brand_name: data.brand_name,
          supplier_name: data.supplier_name,
          alert_quantity: data.alert_quantity,
          unit_type: Number(data.unit_type) === 1 ? 'Single Unit' : 'Double Unit',
          purchase_unit_name: data.purchase_unit_name,
          sale_unit_name: data.sale_unit_name,
          conversion_rate: data.conversion_rate,
          purchase_price: data.purchase_price,
          whole_sale_price: data.whole_sale_price,
          sale_price: data.sale_price,
          description: data.description,
          warranty: data.warranty,
          warranty_type: data.warranty_date ? data.warranty_date : data.warranty_type,
          guarantee: data.guarantee,
          guarantee_type: data.guarantee_type ? data.guarantee_type : data.guarantee_date,
          loyalty_point: data.loyalty_point,
          profit_margin: data.profit_margin,
          del_status: 'Live',
          tax_information: data.tax_information,
          opening_stock: JSON.stringify(element),
          domain: element[0].domain,
        };

        const requestURL = `http://${element[0].domain}/api/v1/ApiItemController/updateItem`;
        const response = await axios.post(requestURL, reqData);

        console.log(reqData);

        console.log(response.data);

        if (data.photo) {
          const form = new FormData();
          const imagePath = path.join(__dirname, '..', 'uploads', data.photo);

          console.log(imagePath);

          if (fs.existsSync(imagePath)) {
            const image = fs.createReadStream(imagePath);
            form.append('photo', image, data.photo);

            const imageResponse = await axios.post(
              `http://${data.opening_stock_data[0].domain}/api/v1/ApiItemController/uploadImage`,
              form,
              { headers: form.getHeaders() },
            );

            console.log('Image upload response:', imageResponse.data);
          } else {
            throw new Error('Image file not found.');
          }
        }

        outletIds = outletIds.filter((id) => id !== element[0].outlet_id);
      }
    }

    console.log(outletIds);

    if (outletIds.length > 0) {
      for (let outlet of outletIds) {
        const outletData = data.preview_opening_stock_data.find(
          (item) => item.outlet_id === outlet,
        );

        console.log(outletData);

        const reqData = {
          code: data.code,
          api_auth_key: outletData.outlet_data[0].token,
        };

        const response = await axios.post(
          `http://${outletData.outlet_data[0].domain}/api/v1/ApiItemController/deleteItem`,
          reqData,
        );

        console.log(response.data);

        console.log(outletData);
      }
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

    console.log(data);

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
      console.log(opening_stocks);

      const groupedData = opening_stocks.reduce((acc, item) => {
        if (!acc[item.api_key]) {
          acc[item.outlet_id] = [];
        }
        acc[item.outlet_id].push(item);
        return acc;
      }, {});

      const result = Object.values(groupedData);

      for (let element of result) {
        console.log(element[0].outlet_data[0].domain);

        const outlet = element[0].outlet_data[0];

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
    }

    res.json({ status: 'Item deleted successfully!' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: error.message });
  }
};
