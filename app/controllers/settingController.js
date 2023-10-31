'use strict';
var session = require('../utils/session');
var util = require('../utils/util');
var querystring = require("querystring");
var formidable = require('formidable');
var Setting = require('../models/settingModel');
var File = require('../models/fileModel');

exports.getSettingsGeneral = function(req, res) {
  util.logConsole(0,'Setting/getSettingsGeneral');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Setting.getSettingsGeneral(
		req.query['usrId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.updateSettingsGeneral = function(req, res) {
  util.logConsole(0,'Setting/updateSettingsGeneral');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Setting.updateSettingsGeneral(
		req.query['usrId'],
		req.query['emailNoReply'],
		req.query['emailAdmin'],
		req.query['autoApprove'],
		req.query['captcha'],
		req.query['emailVerification'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.getSettingsLimits = function(req, res) {
  util.logConsole(0,'Setting/getSettingsLimits');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Setting.getSettingsLimits(
		req.query['usrId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.updateSettingsLimits = function(req, res) {
  util.logConsole(0,'Setting/updateSettingsLimits');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Setting.updateSettingsLimits(
		req.query['usrId'],
		req.query['projectsShow'],
		req.query['fileSize'],
		req.query['minProject'],
		req.query['maxProject'],
		req.query['minDonation'],
		req.query['maxDonation'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.getSettingsPayment = function(req, res) {
  util.logConsole(0,'Setting/getSettingsPayment');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Setting.getSettingsPayment(
		req.query['usrId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.updateSettingsPayment = function(req, res) {
  util.logConsole(0,'Setting/updateSettingsPayment');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Setting.updateSettingsPayment(
		req.query['usrId'],
		req.query['currencyCode'],
		req.query['paymentGateway'],
		req.query['paypalAccount'],
		req.query['paypalSandbox'],
		req.query['stripeSecret'],
		req.query['stripePublishable'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.getSettingsSocial = function(req, res) {
  util.logConsole(0,'Setting/getSettingsSocial');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Setting.getSettingsSocial(
		req.query['usrId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.updateSettingsSocial = function(req, res) {
  util.logConsole(0,'Setting/updateSettingsSocial');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Setting.updateSettingsSocial(
		req.query['usrId'],
		req.query['facebook'],
		req.query['twitter'],
		req.query['linkedin'],
		req.query['instagram'],
		req.query['youtube'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.getPages = function(req, res) {
  util.logConsole(0,'Setting/getPages');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Setting.getPages(
		req.query['usrId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.getPage = function(req, res) {
  util.logConsole(0,'Setting/getPage');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Setting.getPage(
		req.query['usrId'],
      	req.query['pagId'],
		function(task) {
			util.logConsole(3,task);
			res.send(task);
		});
	});
};

exports.updatePage = function(req, res) {
  util.logConsole(0,'Setting/updatePage');
  session.verifyToken(req, res, function() {
    var vFields = {};
    new formidable.IncomingForm()
      .parse(req)
      .on('field', function(name, value) {
          vFields[name] = value;
      })
      .on('end', function() {
        Setting.updatePage(
          vFields.usrId,
          vFields.pagId,
          vFields.title,
          true, //edit mode
        function(task) {
          util.logConsole(3,task);
		  var fileName = vFields.fileName;
		  var lang = vFields.lang;
		  if (fileName.indexOf('-'+lang)<0) fileName = fileName.split('.')[0]+'-'+lang+'.'+fileName.split('.')[1];
		  File.writeFileOnDisk('page', fileName, querystring.unescape(vFields.content), function() {
			res.json(task);
		  });
        });

      });
  });
};

exports.removePage = function(req, res) {
  util.logConsole(0,'Setting/removePage');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Setting.removePage(
		req.query['usrId'],
      	req.query['pagId'],
		function(task) {
			util.logConsole(3,task);
			res.json(task);
		});
	});
};

exports.getSponsors = function(req, res) {
	util.logConsole(0,'Setting/getSponsors');
	util.logConsole(1,req.query);
	  session.verifyToken(req, res, function() {
		Setting.getSponsors(
		  req.query['usrId'],
		  function(task) {
			  util.logConsole(3,task);
			  res.send(task);
		  });
	  });
  };
  
  exports.getSponsor = function(req, res) {
	util.logConsole(0,'Setting/getSponsor');
	util.logConsole(1,req.query);
	  session.verifyToken(req, res, function() {
		Setting.getSponsor(
		  	req.query['usrId'],
			req.query['spoId'],
			function(task) {
				util.logConsole(3,task);
				res.send(task);
			});
	  });
  };
  
  exports.insertSponsor = function(req, res) {
	util.logConsole(0,'Setting/insertSponsor');
	util.logConsole(1,req.query);
	  session.verifyToken(req, res, function() {
		Setting.insertUpdateSponsor(
			req.query['usrId'],
			0,
			req.query['name'],
			req.query['email'],
			req.query['website'],
			req.query['mode'],
			req.query['avatar'],
			false, //edit mode
			function(task) {
				util.logConsole(3,task);
				if (task.code==0 && task.data && task.data[0].code == 0) {
					File.uploadImage('profile', req, req.query['usrId'], task.data[0].id, Setting.uploadImage, false, function(newFile) {
						if (newFile != undefined) task.data[0].image = newFile;
						res.send(task);
					});
				}
				else {
					res.send(task);
				};
		  	});
	  });
  };
  
  exports.updateSponsor = function(req, res) {
	util.logConsole(0,'Setting/updateSponsor');
	util.logConsole(1,req.query);
	  session.verifyToken(req, res, function() {
		Setting.insertUpdateSponsor(
			req.query['usrId'],
			req.query['spoId'],
			req.query['name'],
			req.query['email'],
			req.query['website'],
			req.query['mode'],
			req.query['avatar'],
			true, //edit mode
			function(task) {
				util.logConsole(3,task);
				if (task.code==0 && task.data && task.data[0].code == 0) {
					File.uploadImage('profile', req, req.query['usrId'], req.query['spoId'], Setting.uploadImage, false, function(newFile) {
						if (newFile != undefined) task.data[0].image = newFile;
						res.send(task);
					});
				}
				else {
					res.send(task);
				}
		  	});
	  	});
  };
  
  exports.removeSponsor = function(req, res) {
	util.logConsole(0,'Setting/removeSponsor');
	util.logConsole(1,req.query);
	  session.verifyToken(req, res, function() {
		Setting.removeSponsor(
		  	req.query['usrId'],
			req.query['spoId'],
			function(task) {
				util.logConsole(3,task);
				res.json(task);
			});
	  });
  };
  
  exports.activeSponsor = function(req, res) {
	util.logConsole(0,'Setting/activeSponsor');
	util.logConsole(1,req.query);
	  session.verifyToken(req, res, function() {
		Setting.activeSponsor(
			req.query['usrId'],
			req.query['spoId'],
			function(task) {
				util.logConsole(3,task);
				res.send(task);
			});
	  });
  };