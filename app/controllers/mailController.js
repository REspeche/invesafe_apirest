'use strict';
var util = require('../utils/util');
var Mail = require('../models/mailModel');

exports.verifyCaptcha = function(req, res) {
	util.logConsole(0,'Mail/verifyCaptcha');
  util.logConsole(1,req.query);
	Mail.verifyCaptcha(
		req.query['token'],
		function(task) {
			res.send(task);
		});
};

exports.contactUs = function(req, res) {
	util.logConsole(0,'Mail/contactUs');
  util.logConsole(1,req.query);
	Mail.contactUs(
		req.query['name'],
		req.query['email'],
		req.query['subject'],
		req.query['message'],
		function(task) {
			res.send(task);
		});
};

exports.iAmDeveloper = function(req, res) {
	util.logConsole(0,'Mail/iAmDeveloper');
  util.logConsole(1,req.query);
	Mail.iAmDeveloper(
		req.query['name'],
		req.query['email'],
		req.query['phone'],
		req.query['message'],
		function(task) {
			res.send(task);
		});
};

exports.subscribeNewsletters = function(req, res) {
	util.logConsole(0,'Mail/subscribeNewsletters');
  	util.logConsole(1,req.query);
	Mail.subscribeNewsletters(
		req.query['email'],
		function(task) {
			res.send(task);
		});
};

exports.testEmail = function(req, res) {
	util.logConsole(0,'Mail/testEmail');
	util.logConsole(1,req.query);
	Mail.testEmail(
		req.query['email'],
		function(task) {
			res.send(task);
		});
};
