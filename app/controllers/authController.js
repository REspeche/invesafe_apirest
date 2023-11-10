'use strict';
var session = require('../utils/session');
var util = require('../utils/util');
var Auth = require('../models/authModel');

exports.login = function(req, res) {
  util.logConsole(0,'Auth/login');
  util.logConsole(1,req.query);
  Auth.login(
        req.query['email'],
				req.query['password'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.logout = function(req, res) {
  util.logConsole(0,'Auth/logout');
  util.logConsole(1,req.query);
  session.verifyToken(req, res, function() {
    Auth.logout(
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
  });
};

exports.signup = function(req, res) {
  util.logConsole(0,'Auth/signup');
  util.logConsole(1,req.query);
  Auth.signup(
        req.query['type'],
        req.query['firstName'],
        req.query['lastName'],
				req.query['email'],
        req.query['phone'],
        req.query['countryCode'],
				req.query['password'],
        req.query['usaCitizen'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.signUpSite = function(req, res) {
  util.logConsole(0,'Auth/signUpSite');
  util.logConsole(1,req.query);
  Auth.signUpSite(
        req.query['type'],
        req.query['firstName'],
        req.query['lastName'],
				req.query['email'],
        req.query['phone'],
        req.query['countryCode'],
				req.query['password'],
        req.query['usaCitizen'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.forgot = function(req, res) {
  util.logConsole(0,'Auth/forgot');
  util.logConsole(1,req.query);
  Auth.forgot(req.query['email'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.forgotsite = function(req, res) {
  util.logConsole(0,'Auth/forgotsite');
  util.logConsole(1,req.query);
  Auth.forgotsite(req.query['email'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.changepass = function(req, res) {
  util.logConsole(0,'Auth/changepass');
  util.logConsole(1,req.query);
  Auth.changepass(
    req.query['email'],
    req.query['hash'],
    req.query['password'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.activeaccount = function(req, res) {
  util.logConsole(0,'Auth/activeaccount');
  util.logConsole(1,req.query);
  Auth.activeaccount(
    req.query['email'],
    req.query['hash'],
    req.query['isSite'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.validateagain = function(req, res) {
  util.logConsole(0,'Auth/validateagain');
  util.logConsole(1,req.query);
  Auth.validateagain(
    req.query['email'],
    req.query['password'],
    req.query['isSite'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.getAccount = function(req, res) {
  util.logConsole(0,'Auth/getAccount');
  util.logConsole(1,req.query);
  session.verifyToken(req, res, function() {
    Auth.getAccount(
      req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
  });
};

exports.updateAccount = function(req, res) {
  util.logConsole(0,'Auth/updateAccount');
  util.logConsole(1,req.query);
  session.verifyToken(req, res, function() {
    Auth.updateAccount(
      req.query['usrId'],
      req.query['email'],
      req.query['pass'],
      req.query['passN'],
      req.query['passR'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
  });
};

exports.welcomeUnderstand = function(req, res) {
  util.logConsole(0,'Auth/welcomeUnderstand');
  util.logConsole(1,req.query);
  session.verifyToken(req, res, function() {
    Auth.welcomeUnderstand(
      req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
  });
};

exports.getSecurityOptions = function(req, res) {
  util.logConsole(0,'Auth/getSecurityOptions');
  util.logConsole(1,req.query);
  session.verifyToken(req, res, function() {
    Auth.getSecurityOptions(
      req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
  });
};