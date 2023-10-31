'user strict';
const config = require('../config');
const response = require('../models/_response');
var jwt = require('jsonwebtoken');
var util = require('./util');

exports.createToken = function(id, notExpire) {
  // create a token
  var token = jwt.sign({ id: id }, config.session.secret, (notExpire)?{}:{
    expiresIn: config.session.tokenLife // expires in 24 hours
  });
  return token;
};

exports.verifyToken = function(req, res, callback) {
  var ret = new response;
  var token = req.headers['x-access-token'];
  if (!token) {
    ret.code=310;
    ret.message='No token provided.';
    util.logConsole(3,ret);
    return res.status(401).send(ret);
  }

  jwt.verify(token, config.session.secret, function(err, decoded) {
    if (err) {
      ret.code=309;
      ret.message='Failed to authenticate token.';
      util.logConsole(3,ret);
      return res.status(401).send(ret);
    }
    callback();
  });
};
