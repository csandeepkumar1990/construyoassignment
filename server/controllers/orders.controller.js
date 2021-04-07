const { validationResult } = require('express-validator');

const OrdersService = require('../services/orders.service');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const orders = {
    title: req.body.title,
    bookingDate: req.body.bookingDate,
    address: req.body.address,
    customer: req.body.customer
  };

  try {
    const newOrders = await OrdersService.create(orders);
    res.status(200).send(newOrders);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Orders.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const orders = await OrdersService.getAll();
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the orders", code: err.code || 500
    });
  }
};

exports.get = async (req, res) => {
  try {
    let id = req.params.orderId
    const orders = await OrdersService.get(id);
    if (!orders)
      throw ({ message: "Orders not found for the given orders id: " + id, code: 404 });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the orders", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const orders = {
      title: req.body.title,
      bookingDate: req.body.bookingDate
    }

    // if(orders.customer){
    //   orders.customer = JSON.parse(orders.customer)
    //   if(Object.keys(orders.customer).length < 1){
    //     delete orders.customer
    //   }
    // }
    // if(orders.address){
    //   orders.address = JSON.parse(orders.address)
    //   if(Object.keys(orders.address).length < 1){
    //     delete orders.address
    //   }
    // }

    let id = req.params.orderId
    const updatedOrders = await OrdersService.update(orders, id);
    res.status(200).send(updatedOrders);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Orders.", code: err.code || 500
    });
  }
};



exports.delete = async (req, res) => {
 
  try {
    let id = req.params.orderId
    const updatedOrders = await OrdersService.delete(id);
    if (updatedOrders) {
      res.status(200).send({ message: "delete success for orders id: " + id, code: 200 });
    } else {
      res.status(200).send({ message: "orders not found for id: " + id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Orders.", code: err.code || 500
    });
  }
};

