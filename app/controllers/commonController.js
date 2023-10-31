'use strict';
var session = require('../utils/session');
var util = require('../utils/util');
const config = require('../config');
var Common = require('../models/commonModel');
var File = require('../models/fileModel');

exports.getCountAlerts = function(req, res) {
	util.logConsole(0,'Common/getCountAlerts');
  	util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Common.getCountAlerts(
			req.query['usrId'],
			function(task) {
				util.logConsole(3,task);
				res.send(task);
			});
	});
};

exports.getListCountries = function(req, res) {
	util.logConsole(0,'Common/getListCountries');
  	util.logConsole(1,req.query);
	Common.getListCountries(
		function(task) {
			//util.logConsole(3,task);
			res.send(task);
		});
};

exports.getListCountriesUsa = function(req, res) {
	util.logConsole(0,'Common/getListCountriesUsa');
  	util.logConsole(1,req.query);
	Common.getListCountriesUsa(
		function(task) {
			//util.logConsole(3,task);
			res.send(task);
		});
};

exports.getListCompanies = function(req, res) {
	util.logConsole(0,'Common/getListCompanies');
  	util.logConsole(1,req.query);
	Common.getListCompanies(
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
};

exports.getListMentors = function(req, res) {
	util.logConsole(0,'Common/getListMentors');
  	util.logConsole(1,req.query);
	Common.getListMentors(
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
};

exports.getListAlerts = function(req, res) {
	util.logConsole(0,'Common/getListAlerts');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Common.getListAlerts(
			req.query['usrId'],
			req.query['limit'],
			function(task) {
				util.logConsole(3,task);
				res.send(task);
			});
	});
};

exports.setViewedAlert = function(req, res) {
	util.logConsole(0,'Common/setViewedAlert');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Common.setViewedAlert(
			req.query['axuId'],
			function(task) {
				util.logConsole(3,task);
				res.send(task);
			});
	});
};

exports.getListStates = function(req, res) {
	util.logConsole(0,'Common/getListStates');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
		Common.getListStates(
			req.query['couId'],
			function(task) {
				//util.logConsole(3,task);
				res.send(task);
			});
	});
};

exports.getListTypeQuery = function(req, res) {
	util.logConsole(0,'Common/getListTypeQuery');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Common.getListTypeQuery(
			req.query['usrId'],
			function(task) {
				util.logConsole(3,task);
				res.send(task);
			});
	});
};

exports.insertQuery = function(req, res) {
	util.logConsole(0,'Common/insertQuery');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Common.insertQuery(
			req.query['usrId'],
			req.query['subject'],
			req.query['phone'],
			req.query['comment'],
			function(task) {
				util.logConsole(3,task);
				res.send(task);
			});
	});
};

exports.getListCategories = function(req, res) {
	util.logConsole(0,'Common/getListCategories');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
		Common.getListCategories(
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.viewFile = function(req, res) {
	File.viewFile(req, res);
};

exports.getSettings = function(req, res) {
	util.logConsole(0,'Common/getSettings');
  	util.logConsole(1,req.query);
	Common.getSettings(
		function(task) {
			res.send(task);
		});
};

exports.getListCategoriesSite = function(req, res) {
	util.logConsole(0,'Common/getListCategoriesSite');
  	util.logConsole(1,req.query);
	Common.getListCategoriesSite(
		function(task) {
			res.send(task);
		});
};

exports.getListMentorsSite = function(req, res) {
	util.logConsole(0,'Common/getListMentorsSite');
  util.logConsole(1,req.query);
	Common.getListMentorsSite(
		function(task) {
			res.send(task);
		});
};

exports.getListSponsorsSite = function(req, res) {
	util.logConsole(0,'Common/getListSponsorsSite');
  util.logConsole(1,req.query);
	Common.getListSponsorsSite(
		function(task) {
			res.send(task);
		});
};

exports.getListTimeZones = function(req, res) {
	util.logConsole(0,'Common/getListTimeZones');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
		Common.getListTimeZones(
			req.query['couId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};
