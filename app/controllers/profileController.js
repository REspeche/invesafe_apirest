'use strict';
var session = require('../utils/session');
var util = require('../utils/util');
var Profile = require('../models/profileModel');
var File = require('../models/fileModel');

exports.getProfile = function(req, res) {
  util.logConsole(0,'Profile/getProfile');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Profile.getProfile(
		req.query['usrId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.getProfileCheckout = function(req, res) {
  util.logConsole(0,'Profile/getProfileCheckout');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Profile.getProfileCheckout(
		req.query['usrId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.updateProfile = function(req, res) {
  util.logConsole(0,'Profile/updateProfile');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Profile.updateProfile(
		req.query['usrId'],
		req.query['name'],
		req.query['firstName'],
		req.query['lastName'],
		req.query['company'],
		req.query['typeInvestor'],
		req.query['typeEntrepreneur'],
		req.query['couId'],
		req.query['staId'],
		req.query['city'],
		req.query['address'],
		req.query['zip'],
		req.query['tmzId'],
		req.query['phone'],
		req.query['webSite'],
		req.query['linkedinProfile'],
		req.query['instagramProfile'],
		req.query['facebookProfile'],
		req.query['twitterProfile'],
		req.query['youtubeProfile'],
		req.query['position'],
		(req.query['avatar']==undefined || req.query['avatar']=='undefined')?'':req.query['avatar'],
    req.query['firstNameBilling'],
    req.query['lastNameBilling'],
    req.query['couIdBilling'],
    req.query['staIdBilling'],
    req.query['cityBilling'],
    req.query['addressBilling'],
    req.query['zipBilling'],
    req.query['phoneBilling'],
    req.query['sameBilling'],
		function(task) {
			util.logConsole(3,task);
			if (task.code==0 && task.data && task.data.code == 0) {
				File.uploadImage('profile', req, task.data.id, task.data.id, Profile.uploadImage, false, function(newFile) {
					if (newFile != undefined) task.data.avatar = newFile;
					res.send(task);
				});
			}
			else {
				res.send(task);
			}
		});
	});
};

exports.getMembers = function(req, res) {
  util.logConsole(0,'Profile/getMembers');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Profile.getMembers(
		req.query['usrId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.updateMember = function(req, res) {
  util.logConsole(0,'Profile/updateMember');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Profile.updateMember(
		req.query['usrId'],
		req.query['memId'],
		req.query['name'],
		req.query['role'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.getMember = function(req, res) {
  util.logConsole(0,'Profile/getMember');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Profile.getMember(
		req.query['usrId'],
      	req.query['memId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.removeMember = function(req, res) {
  util.logConsole(0,'Profile/removeMember');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Profile.removeMember(
		req.query['usrId'],
  	req.query['memId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};
