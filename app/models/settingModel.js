'user strict';
const response = require('./_response');
const storage = require('node-persist');
var conn = require('../utils/db');
var util = require('../utils/util');

//Constructor
var Setting = {
  getSettingsGeneral: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_SETTING_GENERAL("+usrId+")";
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
  updateSettingsGeneral: function(usrId, emailNoReply, emailAdmin, autoApprove, captcha, emailVerification, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPDATE_SETTING_GENERAL ("+
                  "'"+usrId+"',"+
                  "'"+emailNoReply+"',"+
                  "'"+emailAdmin+"',"+
                  "'"+autoApprove+"',"+
                  "'"+captcha+"',"+
                  "'"+emailVerification+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('settings');
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.code = row.code;
            ret.message = row.message;
        };
        result(ret);
    });
  },
  getSettingsLimits: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_SETTING_LIMITS("+usrId+")";
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
  updateSettingsLimits: function(usrId, projectsShow, fileSize, minProject, maxProject, minDonation, maxDonation, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPDATE_SETTING_LIMITS ("+
                  "'"+usrId+"',"+
                  "'"+projectsShow+"',"+
                  "'"+fileSize+"',"+
                  "'"+minProject+"',"+
                  "'"+maxProject+"',"+
                  "'"+minDonation+"',"+
                  "'"+maxDonation+"'"+
                  ")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('settings');
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.code = row.code;
            ret.message = row.message;
        };
        result(ret);
    });
  },
  getSettingsPayment: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_SETTING_PAYMENT("+usrId+")";
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
  updateSettingsPayment: function(usrId, currencyCode, paymentGateway, paypalAccount, paypalSandbox, stripeSecret, stripePublishable, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPDATE_SETTING_PAYMENT ("+
                  "'"+usrId+"',"+
                  "'"+currencyCode+"',"+
                  "'"+paymentGateway+"',"+
                  "'"+paypalAccount+"',"+
                  "'"+paypalSandbox+"',"+
                  "'"+stripeSecret+"',"+
                  "'"+stripePublishable+"'"+
                  ")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('settings');
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.code = row.code;
            ret.message = row.message;
        };
        result(ret);
    });
  },
  getSettingsSocial: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_SETTING_SOCIAL("+usrId+")";
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
  updateSettingsSocial: function(usrId, facebook, twitter, linkedin, instagram, youtube, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPDATE_SETTING_SOCIAL ("+
                  "'"+usrId+"',"+
                  "'"+facebook+"',"+
                  "'"+twitter+"',"+
                  "'"+linkedin+"',"+
                  "'"+instagram+"',"+
                  "'"+youtube+"'"+
                  ")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('settings');
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.code = row.code;
            ret.message = row.message;
        };
        result(ret);
    });
  },
  getPages: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PAGES("+usrId+")";
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
  getPage: function(usrId, pagId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PAGE("+usrId+", "+pagId+")";
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
  updatePage: function(usrId, pagId, title, editMode, result) {
    var ret = new response;

    var strSQL = "CALL SP_UPDATE_PAGE("+
                  ((editMode)?"'"+pagId+"',":"'"+usrId+"',")+
                  "'"+title+"'"+
                  ")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  removePage: function(usrId, pagId, result) {
    var ret = new response;
    var strSQL = "CALL SP_REMOVE_PAGE("+usrId+","+pagId+")";
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
  getSponsors: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_SPONSORS("+usrId+")";
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
  getSponsor: function(usrId, spoId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_SPONSOR("+usrId+", "+spoId+")";
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
  insertUpdateSponsor: function(usrId, spoId, name, email, website, mode, avatar, editMode, result) {
    var ret = new response;
    var spName = (editMode)?"SP_UPDATE_SPONSOR":"SP_INSERT_SPONSOR";

    var strSQL = "CALL "+spName+"("+
                  ((editMode)?"'"+spoId+"',":"'"+usrId+"',")+
                  "'"+name+"',"+
                  "'"+email+"',"+
                  "'"+website+"',"+
                  mode+","+
                  "'"+((avatar==undefined)?'':avatar)+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('lstMentorsSite');
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  removeSponsor: function(usrId, spoId, result) {
    var ret = new response;
    var strSQL = "CALL SP_REMOVE_SPONSOR("+usrId+","+spoId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('lstMentorsSite');
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  uploadImage: function(usrId, spoId, fileName, fileSize, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPLOAD_IMAGE_SPONSOR ("+usrId+", "+spoId+", '"+fileName+"', '"+fileSize+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  activeSponsor: function(usrId, spoId, result) {
    var ret = new response;
    var strSQL = "CALL SP_ACTIVE_SPONSOR ("+usrId+", "+spoId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('lstMentorsSite');
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  }
};

module.exports = Setting;
