'user strict';
const storage = require('node-persist');
const request = require('superagent');
const response = require('./_response');
const config = require('../config');
const mailTemplates = require('../mailTemplates');
var conn = require('../utils/db');
var util = require('../utils/util');
var mail = require('../utils/mail');

//Constructor
var Common = {
  getCountAlerts: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_COUNT_ALERTS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            if (row) {
              ret.data = {
                notifications: row.notifications, // quantity notifications
                cart: row.cart // items on cart
              }
            }
            else {
              ret.code = 200;
            };
            result(ret);
        }
    });
  },
  getListCountries: function(result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_LIST_COUNTRIES()";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
      if(err) {
          console.log("error: ", err);
          ret.code = 300;
          ret.message = err.message;
      }
      else{
        ret.data = JSON.parse(JSON.stringify(rows))[0];
      };
      result(ret);
    });
  },
  getListCountriesUsa: function(result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_LIST_COUNTRIES_USA()";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
      if(err) {
          console.log("error: ", err);
          ret.code = 300;
          ret.message = err.message;
      }
      else{
        ret.data = JSON.parse(JSON.stringify(rows))[0];
      };
      result(ret);
    });
  },
  getListCompanies: function(result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_LIST_COMPANIES()";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getListMentors: function(result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_LIST_MENTORS()";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getListAlerts: function(usrId, limit, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_LIST_ALERTS("+usrId+", "+limit+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  setViewedAlert: function(axuId, result) {
    var ret = new response;
    var strSQL = "UPDATE axu_alexusr SET axu_viewed = 1 WHERE axu_id = "+axuId;
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        };
        result(ret);
    });
  },
  getListStates: function(couId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_LIST_STATES(" + couId + ")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getListTypeQuery: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_LIST_TYPE_QUERY("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  insertQuery: function(usrId, subject, phone, comment, result) {
    var ret = new response;
    var strSQL = "CALL SP_INSERT_QUERY ("+
                  "'"+usrId+"',"+
                  "'"+subject+"',"+
                  "'"+phone+"',"+
                  "'"+comment+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getListCategories: function(result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_LIST_CATEGORIES()";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  getListCategoriesSite: async function(result) {
    var ret = new response;
    var retStorage = await storage.getItem('lstFavCategories');
    if (!retStorage) {
      var strSQL = "CALL SP_GET_LIST_FAV_CATEGORIES()";
      util.logConsole(2,strSQL);
      conn.query(strSQL, async function (err, rows) {
          if(err) {
              console.log("error: ", err);
              ret.code = 300;
              ret.message = err.message;
          }
          else{
              ret = util.response_result(JSON.parse(JSON.stringify(rows))[0]);
              await storage.setItem('lstFavCategories',ret, {ttl: 1000*60*60*24 /* 1 day */ });
              util.logConsole(3,ret);
          };
          result(ret);
      });
    }
    else {
      util.logConsole(5,'Return of Storage');
      result(retStorage);
    }
  },
  getSettings: async function(result) {
    var ret = new response;
    var retStorage = await storage.getItem('settings');
    if (!retStorage) {
      var strSQL = "CALL SP_GET_SETTINGS()";
      util.logConsole(2,strSQL);
      conn.query(strSQL, async function (err, rows) {
          if(err) {
              console.log("error: ", err);
              ret.code = 300;
              ret.message = err.message;
          }
          else{
              var row = JSON.parse(JSON.stringify(rows))[0][0];
              if (row) {
                ret.data = {
                  nameSite: row.nameSite,
                  welcomeText: row.welcomeText,
                  welcomeSubtitle: row.welcomeSubtitle,
                  keywords: row.keywords,
                  description: row.description,
                  emailNoReply: row.emailNoReply,
                  emailAdmin: row.emailAdmin,
                  autoApprove: row.autoApprove,
                  captcha: row.captcha,
                  emailVerification: row.emailVerification,
                  projectsShow: row.projectsShow,
                  fileSize: row.fileSize,
                  minProject: row.minProject,
                  maxProject: row.maxProject,
                  minDonation: row.minDonation,
                  maxDonation: row.maxDonation,
                  currencyCode: row.currencyCode,
                  paymentGateway: row.paymentGateway,
                  paypalAccount: row.paypalAccount,
                  paypalSandbox: row.paypalSandbox,
                  stripeSecret: row.stripeSecret,
                  stripePublishable: row.stripePublishable
                }
                await storage.setItem('settings',ret, {ttl: 1000*60*60*24 /* 1 day */ });
                util.logConsole(3,ret);
              }
              else {
                ret.code = 200;
              };
          };
          result(ret);
      });
    }
    else {
      util.logConsole(5,'Return of Storage');
      result(retStorage);
    }
  },
  getListMentorsSite: async function(result) {
    var ret = new response;
    var retStorage = await storage.getItem('lstMentorsSite');
    if (!retStorage) {
      var strSQL = "CALL SP_GET_LIST_MENTORS_SITE()";
      util.logConsole(2,strSQL);
      conn.query(strSQL, async function (err, rows) {
          if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
          }
          else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
            await storage.setItem('lstMentorsSite',ret, {ttl: 1000*60*60*24 /* 1 day */ });
            util.logConsole(3,ret);
          }
          result(ret);
      });
    }
    else {
      util.logConsole(5,'Return of Storage');
      result(retStorage);
    }
  },
  getListSponsorsSite: async function(result) {
    var ret = new response;
    var retStorage = await storage.getItem('lstSponsorsSite');
    if (!retStorage) {
      var strSQL = "CALL SP_GET_LIST_SPONSORS_SITE()";
      util.logConsole(2,strSQL);
      conn.query(strSQL, async function (err, rows) {
          if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
          }
          else{
            ret.data = JSON.parse(JSON.stringify(rows))[0];
            await storage.setItem('lstSponsorsSite',ret, {ttl: 1000*60*60*24 /* 1 day */ });
            util.logConsole(3,ret);
          }
          result(ret);
      });
    }
    else {
      util.logConsole(5,'Return of Storage');
      result(retStorage);
    }
  },
  getListTimeZones: function(couId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_LIST_TIMEZONES("+couId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  }
};

module.exports = Common;
