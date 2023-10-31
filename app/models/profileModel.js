'user strict';
const response = require('./_response');
var conn = require('../utils/db');
var util = require('../utils/util');

//Constructor
var Profile = {
  getProfile: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PROFILE("+usrId+")";
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
  getProfileCheckout: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_PROFILE_CHECKOUT("+usrId+")";
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
  updateProfile: function(
    usrId,
    name,
    firstName,
    lastName,
    company,
    typeInvestor,
    typeEntrepreneur,
    couId,
    staId,
    city,
    address,
    zip,
    tmzId,
    phone,
    webSite,
    linkedinProfile,
    instagramProfile,
    facebookProfile,
    twitterProfile,
    youtubeProfile,
    position,
    avatar,
    firstNameBilling,
    lastNameBilling,
    couIdBilling,
    staIdBilling,
    cityBilling,
    addressBilling,
    zipBilling,
    phoneBilling,
    sameBilling,
    result) {
    var ret = new response;
    var strSQL = "CALL SP_UPDATE_PROFILE("+usrId+",'"+
                                          name+"',"+
                                          "'"+firstName+"',"+
                                          "'"+lastName+"',"+
                                          "'"+company+"',"+
                                          typeInvestor+","+
                                          typeEntrepreneur+","+
                                          couId+","+
                                          staId+","+
                                          "'"+city+"',"+
                                          "'"+address+"',"+
                                          "'"+zip+"',"+
                                          "'"+tmzId+"',"+
                                          "'"+phone+"',"+
                                          "'"+webSite+"',"+
                                          "'"+linkedinProfile+"',"+
                                          "'"+instagramProfile+"',"+
                                          "'"+facebookProfile+"',"+
                                          "'"+twitterProfile+"',"+
                                          "'"+youtubeProfile+"',"+
                                          "'"+position+"',"+
                                          "'"+avatar+"',"+
                                          "'"+firstNameBilling+"',"+
                                          "'"+lastNameBilling+"',"+
                                          couIdBilling+","+
                                          staIdBilling+","+
                                          "'"+cityBilling+"',"+
                                          "'"+addressBilling+"',"+
                                          "'"+zipBilling+"',"+
                                          "'"+phoneBilling+"',"+
                                          sameBilling+""+
                                          ")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.code = row.code;
            ret.message = row.message;
            ret.data = {
              id: row.id,
              name: row.name,
              code: row.code,
              avatar: row.avatar
            };
        };
        result(ret);
    });
  },
  getMembers: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_MEMBERS("+usrId+")";
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
  updateMember: function(usrId, memId, name, role, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPDATE_MEMBER("+usrId+","+memId+",'"+name+"','"+role+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.code = row.code;
            ret.message = row.message;
            ret.data = {
              id: row.id
            };
        };
        result(ret);
    });
  },
  getMember: function(usrId, memId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_MEMBER("+usrId+", "+memId+")";
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
  uploadImage: function(usrId, usrImgId, fileName, fileSize, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPLOAD_IMAGE_PROFILE ("+usrImgId+", '"+fileName+"', '"+fileSize+"')";
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
  removeMember: function(usrId, memId, result) {
    var ret = new response;
    var strSQL = "CALL SP_REMOVE_MEMBER("+usrId+", "+memId+")";
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
  updateProfileBilling: function(
    usrId,
    firstNameBilling,
    lastNameBilling,
    couIdBilling,
    staIdBilling,
    cityBilling,
    addressBilling,
    zipBilling,
    phoneBilling,
    sameBilling,
    result) {
    var ret = new response;
    var strSQL = "CALL SP_UPDATE_PROFILE_BILLING ("+usrId+","+
                                          "'"+firstNameBilling+"',"+
                                          "'"+lastNameBilling+"',"+
                                          couIdBilling+","+
                                          staIdBilling+","+
                                          "'"+cityBilling+"',"+
                                          "'"+addressBilling+"',"+
                                          "'"+zipBilling+"',"+
                                          "'"+phoneBilling+"',"+
                                          sameBilling+""+
                                          ")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.code = row.code;
            ret.message = row.message;
            ret.data = {
              id: row.id,
              code: row.code
            };
        };
        result(ret);
    });
  },
  updateTwoFactor: function(usrId, value) {
    var ret = new response;
    var strSQL = "CALL SP_UPDATE_TWO_FACTOR("+usrId+","+value+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL);
  }
};

module.exports = Profile;
