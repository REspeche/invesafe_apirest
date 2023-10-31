'use strict';
const config = require('../config');

module.exports = function(app) {
  var checkoutController = require('../controllers/checkoutController');

  //Home secured
  app.route(config.app.base+'/v1/secured/checkout/processPay')
    .post(checkoutController.processPay);

  app.route(config.app.base+'/v1/secured/checkout/getOrder')
    .post(checkoutController.getOrder);

  app.route(config.app.base+'/v1/secured/checkout/getOrderItems')
    .post(checkoutController.getOrderItems);
};
