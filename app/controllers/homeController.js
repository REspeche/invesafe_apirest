'use strict';
var session = require('../utils/session');
var util = require('../utils/util');
var Home = require('../models/homeModel');

exports.getCounters = function(req, res) {
  util.logConsole(0,'Home/getCounters');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Home.getCounters(
		req.query['usrId'],
		function(task) {
			res.send(task);
		});
	});
};

exports.getLastMembers = function(req, res) {
  util.logConsole(0,'Home/getLastMembers');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Home.getLastMembers(
		req.query['usrId'],
		function(task) {
			res.send(task);
		});
	});
};

exports.getRecentProjects = function(req, res) {
  util.logConsole(0,'Home/getRecentProjects');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Home.getRecentProjects(
		req.query['usrId'],
		function(task) {
			res.send(task);
		});
	});
};

exports.getAllInfo = function(req, res) {
  util.logConsole(0,'Home/getAllInfo');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
    Home.getAllInfo(
		req.query['usrId'],
		function(task) {
			res.send(task);
		});
	});
};

exports.getLast30Deals = function(req, res) {
  util.logConsole(0,'Home/getLast30Deals');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Home.getLast30Deals(
		req.query['usrId'],
		function(task) {
			res.send(task);
		});
	});
};
