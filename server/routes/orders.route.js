const express = require('express');
const router = express.Router();
//const auth = require('./auth');

const OrdersController = require('../controllers/orders.controller.js');

router.post('/',  OrdersController.create);
router.get('/',  OrdersController.getAll);
router.get('/:orderId',  OrdersController.get);
router.put('/:orderId', OrdersController.update);
router.delete('/:orderId', OrdersController.delete);



module.exports = router;    


