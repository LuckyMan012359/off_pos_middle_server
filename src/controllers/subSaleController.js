const axios = require('axios');

exports.addSaleFromSub = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    if (data.data && typeof data.data === 'string') {
      data.data = JSON.parse(data.data);
    }

    if (data.data.order && typeof data.data.order === 'string') {
      data.data.order = JSON.parse(data.data.order);
    }

    const orderData = data.data.order;

    const items = orderData.items.map((item, key) => {
      return {
        item_id: item.item_id,
        quantity: item.item_quantity,
        menu_price_without_discount: item.item_price_without_discount,
        menu_price_with_discount: item.item_price_with_discount,
        menu_unit_price: item.item_unit_price,
        menu_discount_value: item.item_discount_amount,
        discount_type: item.discount_type,
        menu_note: data.data.note,
        discount_amount: item.item_discount_amount,
        item_type: item.item_type,
        expiry_imei_serial: item.expiry_imei_serial,
        is_promo_item: item.is_promo_item,
        promo_parent_id: item.is_promo_item === 'No' ? 0 : item?.promo_parent_id,
        item_seller_id: item.item_seller_id,
        delivery_status: data.delivery_status,
        loyalty_point_earn: data.loyalty_point[key],
      };
    });

    let paymentDetail = [];

    if (data.data.is_multi_currency === '1') {
      const paymentData = {
        payment_name: data.payment_name,
        currency_type: data.currency_type,
        multi_currency: data.multi_currency,
        multi_currency_rate: data.multi_currency_rate,
        amount: data.amount,
      };

      paymentDetail.push(paymentData);
    } else {
      let payment_obj = [];

      if (data.data.payment_object && data.data.payment_object !== '[]') {
        payment_obj = JSON.parse(data.data.payment_object);
      }

      payment_obj.forEach((element) => {
        const paymentData = {
          payment_name: element.payment_name,
          amount: element.amount,
          usage_point: element.usage_point,
        };

        paymentDetail.push(paymentData);
      });
    }

    let reqData = {
      api_auth_key: data.api_auth_key,
      domain: data.domain,
      customer_name: data.data.customer_name,
      employee_name: data.employee_name === 'Select Employee' ? '' : data.employee_name,
      total_items: orderData.total_items_in_cart,
      sub_total: orderData.sub_total,
      paid_amount: data.data.paid_amount,
      previous_due: data.data.finalize_previous_due,
      due_amount: data.data.due_amount,
      vat: orderData.total_vat,
      rounding: orderData.rounding,
      total_payable: orderData.total_payable,
      total_item_discount_amount: orderData.total_item_discount_amount,
      sub_total_with_discount: orderData.sub_total_with_discount,
      sub_total_discount_amount: orderData.sub_total_discount_amount,
      total_discount_amount: orderData.total_discount_amount,
      delivery_charge: orderData.delivery_charge,
      charge_type: orderData.charge_type,
      sub_total_discount_value: orderData.sub_total_discount_value,
      sub_total_discount_type: orderData.sub_total_discount_type,
      sale_date: data.data.sale_date,
      date_time: data.data.sale_time,
      grand_total: data.grand_total,
      delivery_status: data.delivery_status,
      delivery_partner_name: data.delivery_partner_name,
      due_date_time: data.data.due_date,
      account_note: data.account_note,
      account_type: data.account_type,
      sale_vat_objects: JSON.stringify(orderData.sale_vat_objects),
      random_code: orderData.random_code,
      note: data.data.note,
      order_date_time: data.order_date_time,
      sale_id: data.sale_id,
      added_date: data.added_date,
      outlet_name: data.outlet_name,
      items: JSON.stringify(items),
      payment_details: JSON.stringify(paymentDetail),
    };

    const response = await axios.post(
      `http://localhost/off_pos/api/v1/ApiSaleController/addSale`,
      reqData,
    );

    console.log('response data ->>>>>>>>>>>>>>>>>>>>', response.data);

    console.dir(reqData, { depth: null });

    console.dir(data, { depth: null });

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log(error);
  }
};

exports.updateSaleFromSub = async (req, res) => {
  try {
    const data = req.body;

    if (data.data && typeof data.data === 'string') {
      data.data = JSON.parse(data.data);
    }

    if (data.data.order && typeof data.data.order === 'string') {
      data.data.order = JSON.parse(data.data.order);
    }

    const orderData = data.data.order;

    const items = orderData.items.map((item, key) => {
      return {
        item_id: item.item_id,
        quantity: item.item_quantity,
        menu_price_without_discount: item.item_price_without_discount,
        menu_price_with_discount: item.item_price_with_discount,
        menu_unit_price: item.item_unit_price,
        menu_discount_value: item.item_discount_amount,
        discount_type: item.discount_type,
        menu_note: data.data.note,
        discount_amount: item.item_discount_amount,
        item_type: item.item_type,
        expiry_imei_serial: item.expiry_imei_serial,
        is_promo_item: item.is_promo_item,
        promo_parent_id: item.is_promo_item === 'No' ? 0 : item?.promo_parent_id,
        item_seller_id: item.item_seller_id,
        delivery_status: data.delivery_status,
        loyalty_point_earn: data.loyalty_point[key],
      };
    });

    let paymentDetail = [];

    if (data.data.is_multi_currency === '1') {
      const paymentData = {
        payment_name: data.payment_name,
        currency_type: data.currency_type,
        multi_currency: data.multi_currency,
        multi_currency_rate: data.multi_currency_rate,
        amount: data.amount,
      };

      paymentDetail.push(paymentData);
    } else {
      let payment_obj = [];

      if (data.data.payment_object && data.data.payment_object !== '[]') {
        payment_obj = JSON.parse(data.data.payment_object);
      }

      payment_obj.forEach((element) => {
        const paymentData = {
          payment_name: element.payment_name,
          amount: element.amount,
          usage_point: element.usage_point,
        };

        paymentDetail.push(paymentData);
      });
    }

    let reqData = {
      api_auth_key: data.api_auth_key,
      domain: data.domain,
      customer_name: data.data.customer_name,
      employee_name: data.employee_name === 'Select Employee' ? '' : data.employee_name,
      total_items: orderData.total_items_in_cart,
      sub_total: orderData.sub_total,
      paid_amount: data.data.paid_amount,
      previous_due: data.data.finalize_previous_due,
      due_amount: data.data.due_amount,
      vat: orderData.total_vat,
      rounding: orderData.rounding,
      total_payable: orderData.total_payable,
      total_item_discount_amount: orderData.total_item_discount_amount,
      sub_total_with_discount: orderData.sub_total_with_discount,
      sub_total_discount_amount: orderData.sub_total_discount_amount,
      total_discount_amount: orderData.total_discount_amount,
      delivery_charge: orderData.delivery_charge,
      charge_type: orderData.charge_type,
      sub_total_discount_value: orderData.sub_total_discount_value,
      sub_total_discount_type: orderData.sub_total_discount_type,
      sale_date: data.data.sale_date,
      date_time: data.data.sale_time,
      grand_total: data.grand_total,
      delivery_status: data.delivery_status,
      delivery_partner_name: data.delivery_partner_name,
      due_date_time: data.data.due_date,
      account_note: data.account_note,
      account_type: data.account_type,
      sale_vat_objects: JSON.stringify(orderData.sale_vat_objects),
      random_code: data.random_code,
      note: data.data.note,
      order_date_time: data.order_date_time,
      sale_id: data.sale_id,
      parent_id: data.parent_id,
      added_date: data.added_date,
      outlet_name: data.outlet_name,
      items: JSON.stringify(items),
      payment_details: JSON.stringify(paymentDetail),
    };

    const response = await axios.post(
      `http://localhost/off_pos/api/v1/ApiSaleController/updateSale`,
      reqData,
    );

    console.log(response.data);

    console.dir(reqData, { depth: null });

    // console.dir(data, { depth: null });

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteSaleFromSub = async (req, res) => {
  try {
    console.log(req.body);

    const reqData = {
      random_code: req.body.random_code,
      api_auth_key: req.body.api_auth_key,
      domain: req.body.domain,
    };

    const response = await axios.post(
      `http://localhost/off_pos/api/v1/ApiSaleController/deleteSale`,
      reqData,
    );

    console.log(response.data);

    console.log(reqData);

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log(error);
  }
};
