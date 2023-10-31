'use strict';
var session = require('../utils/session');
var util = require('../utils/util');
var Checkout = require('../models/checkoutModel');
var Profile = require('../models/profileModel');

exports.processPay = function(req, res) {
  util.logConsole(0,'Category/processPay');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
    var formData = JSON.parse(req.query['formData']);

    Profile.updateProfileBilling(
      req.query['usrId'],
      formData['firstNameBilling'],
      formData['lastNameBilling'],
      formData['couIdBilling'],
      formData['staIdBilling'],
      formData['cityBilling'],
      formData['addressBilling'],
      formData['zipBilling'],
      formData['phoneBilling'],
      formData['sameBilling'],
    function(task) {
      util.logConsole(3,task);
      if (task.code==0 && task.data && task.data.code == 0) {

        Checkout.processPay(
          req.query['usrId'],
          formData['isGift'],
          formData['notes'],
          formData['modePay'],
          req.query['cartItems'],
          req.query['secureRandom'],
          req.query['codeCoinbase'],
    		function(task) {
    			util.logConsole(3,task);
          res.send(task);
    		});

      }
      else {
        res.send(task);
      }
    });

	});
};

exports.getOrder = function(req, res) {
  util.logConsole(0,'Checkout/getOrder');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Checkout.getOrder(
			req.query['usrId'],
      req.query['ordId'],
      req.query['hash'],
		function(task) {
			util.logConsole(3,task);
      res.send(task);
		});
	});
};

exports.getOrderItems = function(req, res) {
  util.logConsole(0,'Checkout/getOrderItems');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Checkout.getOrderItems(
			req.query['usrId'],
      req.query['ordId'],
      req.query['hash'],
		function(task) {
			util.logConsole(3,task);
      res.send(task);
		});
	});
};
