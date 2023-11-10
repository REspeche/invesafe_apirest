'use strict';
var session = require('../utils/session');
var util = require('../utils/util');
var querystring = require("querystring");
var formidable = require('formidable');
var Project = require('../models/projectModel');
var File = require('../models/fileModel');
const escape = require('sqlutils/mysql/escape');

exports.getProjects = function(req, res) {
  util.logConsole(0,'Project/getProjects');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.getProjects(
			req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getProject = function(req, res) {
  util.logConsole(0,'Project/getProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.getProject(
			req.query['usrId'],
      req.query['proId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.insertProject = function(req, res) {
  insertUpdateProject(req, res, true);
};

exports.updateProject = function(req, res) {
  insertUpdateProject(req, res, false);
};

var insertUpdateProject = function(req, res, isNew) {
  util.logConsole(0,'Project/'+ ((isNew)?'insertProject':'updateProject'));
	session.verifyToken(req, res, function() {
    var vFields = {};
    var vFiles = [];
    new formidable.IncomingForm()
      .parse(req)
      .on('field', function(name, value) {
          vFields[name] = value;
      })
      .on('file', function(name, file) {
        vFiles.push(file);
      })
      .once('end', function() {
        util.logConsole(1,vFields);
        Project.insertUpdateProject(
          vFields.usrId,
          (isNew)?0:vFields.proId,
          vFields.title,
          vFields.catId,
          vFields.couId,
          vFields.staId,
          vFields.excerpt,
          escape(querystring.unescape(vFields.description)),
          vFields.status,
          vFields.progress,
          vFields.lookingInvestor,
          vFields.estimatedAvailability,
          (vFields.image==undefined || vFields.image=='undefined')?'':vFields.image,
          vFields.arrDeals,
          vFields.arrMentors,
          vFields.changeStatus,
          vFields.addressNbr,
          vFields.addressStreet,
          vFields.addressCity,
          vFields.addressZip,
          vFields.etherscanAddress,
          vFields.maxTokenPurchase,
          (isNew)?false:true, //edit mode
        function(task) {
          if (vFiles.length > 0 && task.code==0 && task.data && task.data.code == 0) {
            task.data.image = [];
            var vCount = 0;
            vFiles.forEach(function (itemFile) {
              File.saveImageOnDisk('project', itemFile, vFields.usrId, task.data.proId, Project.uploadImage, ((isNew)?true:false), function(newFile) {
                if (newFile != undefined) task.data.image.push(newFile);
                vCount+=1;
                if (vCount==vFiles.length) {
                  util.logConsole(3,task);
                  res.send(task);
                }
              });
            });
          }
          else {
            res.send(task);
          }
        });
      });
	});
};

exports.updateProjectActive = function(req, res) {
  util.logConsole(0,'Project/updateProjectActive');
	session.verifyToken(req, res, function() {
    var vFields = {};
    var vFiles = [];
    new formidable.IncomingForm()
      .parse(req)
      .on('field', function(name, value) {
          vFields[name] = value;
      })
      .on('file', function(name, file) {
          vFiles.push(file);
      })
      .on('end', function() {
        Project.updateProjectActive(
          vFields.usrId,
          vFields.proId,
          escape(querystring.unescape(vFields.description)),
          (vFields.image==undefined || vFields.image=='undefined')?'':vFields.image,
          vFields.progress,
          vFields.lookingInvestor,
          vFields.estimatedAvailability,
          vFields.arrDeals,
          vFields.arrMentors,
        function(task) {
          if (vFiles.length > 0 && task.code==0 && task.data && task.data.code == 0) {
            task.data.image = [];
            var vCount = 0;
            vFiles.forEach(function (itemFile) {
              File.saveImageOnDisk('project', itemFile, vFields.usrId, task.data.updId, Project.uploadImageUpdate, true, function(newFile) {
                if (newFile != undefined) task.data.image.push(newFile);
                vCount+=1;
                if (vCount==vFiles.length) {
                  util.logConsole(3,task);
                  res.send(task);
                }
              });
            });
          }
          else {
            res.send(task);
          }
        });

      });
  });
};

exports.updateGallery = function(req, res) {
  util.logConsole(0,'Project/updateGallery');
	session.verifyToken(req, res, function() {
    var vFields = {};
    var vFiles = [];
    new formidable.IncomingForm()
      .parse(req)
      .on('field', function(name, value) {
          vFields[name] = value;
      })
      .on('file', function(name, file) {
          vFiles.push(file);
      })
      .once('end', function() {
        Project.updateGallery(
          vFields.usrId,
          vFields.proId,
          vFields.updId,
          vFields.arrItemGallery,
        function(task) {
          util.logConsole(3,task);
          var arrItems = JSON.parse(vFields.arrItemGallery);
          if (arrItems.length > 0 && task.code==0 && task.data && task.data.code == 0) {
            task.data.image = [];
            var vCount = 0;
            var vCountAdd = 0;
            arrItems.forEach(function (itemGal) {
              if (itemGal.action==1) {
                File.saveImageOnDisk('gallery', vFiles[vCountAdd], vFields.usrId, vFields.proId, Project.uploadGallery, true, function(newFile) {
                  if (newFile != undefined) task.data.image.push(newFile);
                  vCount+=1;
                  if (vCount==arrItems.length) res.send(task);
                });
                vCountAdd+=1;
              }
              else {
                vCount+=1;
                if (vCount==arrItems.length) res.send(task);
              }
            });
          }
          else {
            res.send(task);
          }
        });

      });
  });
};

exports.removeProject = function(req, res) {
  util.logConsole(0,'Project/removeProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.removeProject(
			req.query['usrId'],
      req.query['proId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.changeStatusProject = function(req, res) {
  util.logConsole(0,'Project/changeStatusProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
    Project.changeStatusProject(
			req.query['usrId'],
      req.query['proId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.removeFavoriteProject = function(req, res) {
  util.logConsole(0,'Project/removeFavoriteProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.removeFavoriteProject(
			req.query['usrId'],
      req.query['prfId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.setFavoriteProject = function(req, res) {
  util.logConsole(0,'Project/setFavoriteProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.setFavoriteProject(
			req.query['usrId'],
      req.query['proId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.setLikeProject = function(req, res) {
  util.logConsole(0,'Project/setLikeProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.setLikeProject(
			req.query['usrId'],
      req.query['proId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getFavoriteProjects = function(req, res) {
  util.logConsole(0,'Project/getFavoriteProjects');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.getFavoriteProjects(
			req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getDealProjects = function(req, res) {
  util.logConsole(0,'Project/getDealProjects');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.getDealProjects(
			req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getDeals = function(req, res) {
  util.logConsole(0,'Project/getDeals');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.getDeals(
			req.query['usrId'],
      req.query['proId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getPurchaseProjects = function(req, res) {
  util.logConsole(0,'Project/getPurchaseProjects');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.getPurchaseProjects(
			req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getReportedProjects = function(req, res) {
  util.logConsole(0,'Project/getReportedProjects');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.getReportedProjects(
			req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.removeReportedProject = function(req, res) {
  util.logConsole(0,'Project/removeReportedProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.removeReportedProject(
			req.query['usrId'],
      req.query['prrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.rejectReportedProject = function(req, res) {
  util.logConsole(0,'Project/rejectReportedProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.rejectReportedProject(
			req.query['usrId'],
      req.query['prrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getQuestionsProjects = function(req, res) {
  util.logConsole(0,'Project/getQuestionsProjects');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.getQuestionsProjects(
			req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getStoryByProject = function(req, res) {
  util.logConsole(0,'Project/getStoryByProject');
  util.logConsole(1,req.query);
  Project.getStoryByProject(
    req.query['proId'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.getStoryUpdate = function(req, res) {
  util.logConsole(0,'Project/getStoryUpdate');
  util.logConsole(1,req.query);
  Project.getStoryUpdate(
    req.query['updId'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.getQuestionsByProject = function(req, res) {
  util.logConsole(0,'Project/getQuestionsByProject');
  util.logConsole(1,req.query);
  Project.getQuestionsByProject(
    req.query['proId'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.getUpdatesByProject = function(req, res) {
  util.logConsole(0,'Project/getUpdatesByProject');
  util.logConsole(1,req.query);
  Project.getUpdatesByProject(
    req.query['proId'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.removeQuestionsProject = function(req, res) {
  util.logConsole(0,'Project/removeQuestionsProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.removeQuestionsProject(
			req.query['usrId'],
      req.query['prqId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.updateAnswerProject = function(req, res) {
  util.logConsole(0,'Project/updateAnswerProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.updateAnswerProject(
			req.query['usrId'],
      req.query['prqId'],
      req.query['answer'],
      function(task) {
        res.send(task);
      });
	});
};

exports.getPartners = function(req, res) {
  util.logConsole(0,'Project/getPartners');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.getPartners(
			req.query['usrId'],
      req.query['proId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getSponsorProjects = function(req, res) {
  util.logConsole(0,'Project/getSponsorProjects');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.getSponsorProjects(
			req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.toSponsorProject = function(req, res) {
  util.logConsole(0,'Project/toSponsorProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
    Project.toSponsorProject(
			req.query['usrId'],
      req.query['prpId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getProjectsHomeSite = function(req, res) {
  util.logConsole(0,'Project/getProjectsHomeSite');
  util.logConsole(1,req.query);
  Project.getProjectsHomeSite(
    function(task) {
      res.send(task);
    });
};

exports.getProjectsByCat = function(req, res) {
  util.logConsole(0,'Project/getProjectsByCat');
  util.logConsole(1,req.query);
  Project.getProjectsByCat(
    req.query['catId'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.getProjectSite = function(req, res) {
  var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);

  util.logConsole(0,'Project/getProjectSite');
  util.logConsole(1,req.query);
  Project.getProjectSite(
    (req.query['usrId']==undefined)?0:req.query['usrId'],
    req.query['proId'],
    ip,
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.askOwnerProject = function(req, res) {
  util.logConsole(0,'Project/askOwnerProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.askOwnerProject(
			req.query['usrId'],
      req.query['proId'],
      req.query['question'],
      function(task) {
        res.send(task);
      });
	});
};

exports.contactUsProject = function(req, res) {
  util.logConsole(0,'Project/contactUsProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.contactUsProject(
			req.query['usrId'],
      req.query['proId'],
      req.query['message'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.buyDealProject = function(req, res) {
  util.logConsole(0,'Project/buyDealProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.buyDealProject(
			req.query['usrId'],
      req.query['prdId'],
      function(task) {
        res.send(task);
      });
	});
};

exports.reportProject = function(req, res) {
  util.logConsole(0,'Project/reportProject');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.reportProject(
			req.query['usrId'],
      req.query['proId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.changeActiveQuestion = function(req, res) {
  util.logConsole(0,'Project/changeActiveQuestion');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
    Project.changeActiveQuestion(
			req.query['usrId'],
      req.query['prqId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.changeExecutedDeal = function(req, res) {
  util.logConsole(0,'Project/changeExecutedDeal');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
    Project.changeExecutedDeal(
			req.query['usrId'],
      req.query['depId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.sendMailPartnerAgain = function(req, res) {
  util.logConsole(0,'Project/sendMailPartnerAgain');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
    Project.sendMailPartnerAgain(
			req.query['prpId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getProjectsSite = function(req, res) {
  util.logConsole(0,'Project/getProjectsSite');
  util.logConsole(1,req.query);
  Project.getProjectsSite(
    (req.query['usrId'])?req.query['usrId']:0,
    (req.query['search'])?req.query['search']:'',
    10,
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.getProjectsSiteHome = function(req, res) {
  util.logConsole(0,'Project/getProjectsSiteHome');
  util.logConsole(1,req.query);
  Project.getProjectsSite(
    (req.query['usrId'])?req.query['usrId']:0,
    '',
    2,
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.getInvestedProjects = function(req, res) {
  util.logConsole(0,'Project/getInvestedProjects');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.getInvestedProjects(
			req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.addCartToken = function(req, res) {
  util.logConsole(0,'Project/addCartToken');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Project.addCartToken(
			req.query['usrId'],
      req.query['proId'],
      req.query['quantityToken'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.saveMetaProperties = function(req, res) {
  util.logConsole(0,'Project/saveMetaProperties');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
    var objHighlights = JSON.parse(req.query['highlights']);
    var objFinancials = JSON.parse(req.query['financials']);
    Project.saveMetaProperties(
      req.query['usrId'],
      req.query['proId'],
      objHighlights.id,
      objHighlights.needRemodelation,
      objHighlights.assetAnnualReturn,
      objHighlights.assetRenovationTargetYield,
      objHighlights.assetRentStartDate,
      objHighlights.setupFee,
      objHighlights.assetTicketPrice,
      objHighlights.assetTotalTokens,
      objHighlights.assetPropertyType,
      objHighlights.assetConstructionYear,
      objHighlights.assetNeighborhood,
      objHighlights.assetSquareFeet,
      objHighlights.assetLandSquareFeet,
      objHighlights.assetTotalUnits,
      objHighlights.assetBedroomBath,
      objHighlights.assetHasTenants,
      objHighlights.assetSection8,
      objHighlights.gpsLatitude,
      objHighlights.gpsLongitude,
      objFinancials.id,
      objFinancials.grossRentAnual,
      objFinancials.grossRent,
      objFinancials.lotClossingCost,
      objFinancials.brokerComission,
      objFinancials.clossingCost,
      objFinancials.successFee,
      objFinancials.propertyTaxes,
      objFinancials.propertyInsurance,
      objFinancials.propertyUtilities,
      objFinancials.salePrice,
      objFinancials.netProfit,
      objFinancials.assetPrice,
      objFinancials.underlyingAssetPrice,
      objFinancials.platformListingFee,
      objFinancials.accountantFees,
      objFinancials.saleClossingCost,
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getMetaProperties = function(req, res) {
  util.logConsole(0,'Project/getMetaProperties');
  util.logConsole(1,req.query);
  Project.getMetaProperties(
    req.query['usrId'],
    req.query['proId'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};
