'user strict';
const config = require('../config');
const mailTemplates = require('../mailTemplates');
const response = require('./_response');
var conn = require('../utils/db');
var session = require('../utils/session');
var util = require('../utils/util');
var mail = require('../utils/mail');

const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
var Profile = require('../models/profileModel');

module.exports = {
  login: function (email, password, result) {
      var ret = new response;
      if (email && password) {
          var strSQL = "CALL SP_LOGIN_USER('"+email+"','"+password+"')";
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
                    if (row.blockAccount==1) {
                      ret.code = 311;
                    }
                    else if (row.status==1) {
                      ret.code = 209;
                      ret.data = {
                        code: 209
                      };
                    }
                    else {
                      ret.code = row.code;
                      ret.data = {
                        code: row.code,
                        id: row.id,
                        email: email,
                        token: (row.code==0)?session.createToken(row.id,false):'',
                        name: row.name,
                        type: row.type,
                        forceProfile: row.forceProfile,
                        role: row.role,
                        avatar: row.avatar
                      };
                    }
                  }
                  else {
                    ret.code = 200;
                  };
              };
              result(ret);
          });
      }
      else {
          ret.code = 100;
          result(ret);
      }
  },
  logout: function (result) {
      var ret = new response;
      result(ret);
  },
  signup: function (type, firstName, lastName, email, phone, countryCode, password, usaCitizen, result) {
      var ret = new response;
      if (email && password) {
        var strSQL = "CALL SP_SIGN_UP("+type+",'"+firstName+"','"+lastName+"','"+email+"','"+phone+"','"+countryCode+"','"+password+"',"+usaCitizen+")";
        util.logConsole(2,strSQL);
        conn.query(strSQL,function(err, rows){
          if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
          }
          else{
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            if (row) {
              if (row.code == 0) {
                // Send mail with hash to active account
                mail.sendMail(
                    email,
                    mailTemplates.activate,
                    {
                      'firstname': row.firstname,
                      'email': email,
                      'hash': row.hash
                    }
                );
                ret.data = {
                  'code': 0,
                  'message': ''
                };
              }
              else {
                ret.data = {
                  'code': row.code,
                  'message': row.message
                };
              }
            }
            else {
              ret.code = 300;
            };
          };
          result(ret);
        });
      }
      else {
          ret.code = 101;
          result(ret);
      };
  },
  signUpSite: function (type, firstName, lastName, email, phone, countryCode, password, usaCitizen, result) {
      var ret = new response;
      if (email && password) {
        var strSQL = "CALL SP_SIGN_UP_SITE("+type+",'"+firstName+"','"+lastName+"','"+email+"','"+phone+"', '"+countryCode+"','"+password+"',"+usaCitizen+")";
        util.logConsole(2,strSQL);
        conn.query(strSQL,function(err, rows){
          if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
          }
          else{
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            if (row) {
              if (row.code == 0) {
                // Send mail with hash to active account
                mail.sendMail(
                    email,
                    mailTemplates.activate,
                    {
                      'firstname': row.firstname,
                      'email': email,
                      'hash': row.hash,
                      'server': config.app.site
                    }
                );
              }
              else {
                ret.code = row.code;
                ret.message = row.message;
              }
            }
            else {
              ret.code = 300;
            };
          };
          result(ret);
        });
      }
      else {
          ret.code = 101;
          result(ret);
      }
  },
  forgot: function (email, result) {
        var ret = new response;
        if (email) {
            var strSQL = "CALL SP_FORGOT_PASS('"+email+"')";
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
                      if (row.code == 0) {
                        // Send mail with hash to change password
                        mail.sendMail(
                            email,
                            mailTemplates.forgotPass,
                            {'name': row.name, 'email': email, 'hash': row.hash}
                        );
                        ret.data = {
                          hash: row.hash,
                          name: row.name
                        };
                      }
                      else {
                        ret.code = row.code;
                        ret.message = row.message;
                      }
                    }
                    else {
                      ret.code = 200;
                    };
                };
                result(ret);
            });
        }
        else {
            ret.code = 101;
            result(ret);
        }
    },
    forgotsite: function (email, result) {
        var ret = new response;
        if (email) {
            var strSQL = "CALL SP_FORGOT_PASS('"+email+"')";
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
                      if (row.code == 0) {
                        // Send mail with hash to change password
                        mail.sendMail(
                            email,
                            mailTemplates.forgotPass,
                            {
                              'name': row.name,
                              'email': email,
                              'hash': row.hash,
                              'server': config.app.site
                            }
                        );
                        ret.data = {
                          hash: row.hash,
                          name: row.name
                        };
                      }
                      else {
                        ret.code = row.code;
                        ret.message = row.message;
                      }
                    }
                    else {
                      ret.code = 200;
                    };
                };
                result(ret);
            });
        }
        else {
            ret.code = 101;
            result(ret);
        };
    },
    changepass: function (email, hash, password, result) {
        var ret = new response;
        if (email) {
            var strSQL = "CALL SP_CHANGE_PASS('"+email+"', '"+hash+"', '"+password+"')";
            util.logConsole(2,strSQL);
            conn.query(strSQL, function (err, rows) {
                if(err) {
                    console.log("error: ", err);
                    ret.code = 300;
                    ret.message = err.message;
                }
                else{
                    var row = JSON.parse(JSON.stringify(rows))[0][0];
                    console.dir(row,{depth:null});
                    if (row) {
                      if (row.code == 0) {
                        var token = session.createToken(row.id,false);
                				ret.data = {
                				  id: row.id,
                          type: row.type,
                				  email: email,
                				  token: token,
                          name: row.name,
                          type: row.type,
                          forceProfile: row.forceProfile,
                          role: row.role,
                          avatar: row.avatar
                				};
                      }
                      else {
                        ret.code = row.code;
                        ret.message = row.message;
                      }
                    }
                    else {
                      ret.code = 200;
                    };
                };
                result(ret);
            });
        }
        else {
            ret.code = 101;
            result(ret);
        };
    },
    activeaccount: function (email, hash, isSite, result) {
        var ret = new response;
        if (email) {
            var strSQL = "CALL SP_ACTIVE_ACCOUNT('"+email+"', '"+hash+"')";
            util.logConsole(2,strSQL);
            conn.query(strSQL, function (err, rows) {
                if(err) {
                    console.log("error: ", err);
                    ret.code = 300;
                    ret.message = err.message;
                }
                else{
                    var row = JSON.parse(JSON.stringify(rows))[0][0];
                      console.dir(row,{depth:null});
                    if (row) {
                      if (row.code == 0) {
                        var token = session.createToken(row.id,false);
                        ret.data = {
                          id: row.id,
                          type: row.type,
                          email: email,
                          token: token,
                          name: row.name,
                          type: row.type,
                          forceProfile: row.forceProfile,
                          role: row.role,
                          avatar: row.avatar
                        };
                        mail.sendMail(
                          email,
                          (isSite==1)?mailTemplates.welcomeSite:mailTemplates.welcome,
                          {
                            'firstname': row.firstname,
                            'server': (isSite==1)?config.app.site:config.app.server
                          }
                        );
                      }
                      else {
                        ret.code = row.code;
                        ret.message = row.message;
                      }
                    }
                    else {
                      ret.code = 310;
                    };
                };
                result(ret);
            });
        }
        else {
            ret.code = 101;
            result(ret);
        };
    },
    validateagain: function (email, password, isSite, result) {
        var ret = new response;
        if (email && password) {
            var strSQL = "CALL SP_LOGIN_USER('"+email+"','"+password+"')";
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
                      mail.sendMail(
                        email,
                        mailTemplates.activate,
                        {
                          'firstname': row.firstname,
                          'email': email,
                          'hash': row.hash,
                          'server': (isSite==1)?config.app.site:config.app.server
                        }
                      );
                    }
                    else {
                      ret.code = 200;
                    };
                };
                result(ret);
            });
        }
        else {
            ret.code = 100;
            result(ret);
        };
    },
    getAccount: function(usrId, result) {
      var ret = new response;
      var strSQL = "CALL SP_GET_ACCOUNT("+usrId+")";
      util.logConsole(2,strSQL);
      conn.query(strSQL, function (err, rows) {
          if(err) {
              console.log("error: ", err);
              ret.code = 300;
              ret.message = err.message;
          }
          else{
              ret.code = 0;
              ret.data = JSON.parse(JSON.stringify(rows))[0];
          }
          result(ret);
      });
    },
    updateAccount: function(usrId, email, pass, passN, passR, result) {
      var ret = new response;
      var strSQL = "CALL SP_UPDATE_ACCOUNT("+usrId+",'"+email+"','"+pass+"','"+passN+"','"+passR+"')";
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
    welcomeUnderstand: function(usrId, result) {
      var ret = new response;
      var strSQL = "CALL SP_UPDATE_WELCOME_UNDERSTAND("+usrId+")";
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
          };
          result(ret);
      });
    },
    getSecurityOptions: function(usrId, result) {
      var ret = new response;
      var strSQL = "CALL SP_GET_SECURITY_OPTIONS("+usrId+")";
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
    }
};
