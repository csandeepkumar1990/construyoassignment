const express = require('express');
const apiRouter = express();
//orders
apiRouter.use('/orders', require('./orders.route'));


module.exports = apiRouter;



