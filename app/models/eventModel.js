'user strict';
const response = require('./_response');
const storage = require('node-persist');
const mailTemplates = require('../mailTemplates');
var conn = require('../utils/db');
var util = require('../utils/util');
var mail = require('../utils/mail');

//Constructor
var Event = {
  getEvents: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_EVENTS("+usrId+")";
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
  getEventsSite: function(result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_EVENTS_SITE(-1)";
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
  getEventsSiteHome: async function(result) {
    var ret = new response;
    var retStorage = await storage.getItem('lstEventsSiteHome');
    if (!retStorage) {
        var strSQL = "CALL SP_GET_EVENTS_SITE(3)";
        util.logConsole(2,strSQL);
        conn.query(strSQL, async function (err, rows) {
            if(err) {
                console.log("error: ", err);
                ret.code = 300;
                ret.message = err.message;
            }
            else{
                ret.data = JSON.parse(JSON.stringify(rows))[0];
                await storage.setItem('lstEventsSiteHome',ret, {ttl: 1000*60*10 /* 10 mins */ });
            };
            result(ret);
        });
    }
    else {
    util.logConsole(5,'Return of Storage');
    result(retStorage);
    }
  },
  getEventSite: function(slug, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_EVENT_SITE('"+slug+"')";
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
  getEvent: function(usrId, eveId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_EVENT("+usrId+", "+eveId+")";
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
  insertUpdateEvent: function(usrId, eveId, title, description, date, couId, staId, city, tmzId, website, email, active, image, editMode, result) {
    var ret = new response;
    var spName = (editMode)?"SP_UPDATE_EVENT":"SP_INSERT_EVENT";

    var strSQL = "CALL "+spName+"("+
                  ((editMode)?"'"+eveId+"',":"'"+usrId+"',")+
                  "'"+title+"',"+
                  "'"+description+"',"+
                  date+","+
                  couId+","+
                  staId+","+
                  "'"+city+"',"+
                  tmzId+","+
                  "'"+website+"',"+
                  "'"+email+"',"+
                  active+","+
                  "'"+((image==undefined)?'':image)+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('lstEventsSiteHome');
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.data = row;
            if (row && row.code==0 && !editMode) { //only new
                // Send mail to user with message new event
                mail.sendMail(
                    row.email,
                    mailTemplates.postEvent,
                    {
                        'name': row.name,
                        'eventName': row.eventName
                    }
                );
                // Send mail to invesafe with message new event
                mail.sendMail(
                    mailTemplates.newEvent.email,
                    mailTemplates.newEvent,
                    {
                        'eventName': row.eventName
                    }
                );
            };
        };
        result(ret);
    });
  },
  removeEvent: function(usrId, eveId, result) {
    var ret = new response;
    var strSQL = "CALL SP_REMOVE_EVENT("+usrId+","+eveId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('lstEventsSiteHome');
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  rejectEvent: function(usrId, eveId, result) {
    var ret = new response;
    var strSQL = "CALL SP_REJECT_EVENT("+usrId+","+eveId+")";
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
  uploadImage: function(usrId, eveId, fileName, fileSize, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPLOAD_IMAGE_EVENT ("+usrId+", "+eveId+", '"+fileName+"', '"+fileSize+"')";
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
  activeEvent: function(usrId, eveId, result) {
    var ret = new response;
    var strSQL = "CALL SP_ACTIVE_EVENT ("+usrId+", "+eveId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('lstEventsSiteHome');
            ret.data = JSON.parse(JSON.stringify(rows))[0][0];
        };
        result(ret);
    });
  },
  changeStatusEvent: function(usrId, eveId, result) {
    var ret = new response;
    var strSQL = "CALL SP_CHANGE_STATUS_EVENT ("+usrId+", "+eveId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('lstEventsSiteHome');
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.data = row;
            if (row && row.code==0 && row.status==2) { //only actived
                // Send mail to user with message new event
                mail.sendMail(
                    row.email,
                    mailTemplates.approvedEvent,
                    {
                        'name': row.name,
                        'eventName': row.eventName
                    }
                );
            };
        };
        result(ret);
    });
  },
  contactUsEvent: function(usrId, eveId, message, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_EVENT_CONTACT("+usrId+", "+eveId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            var row = JSON.parse(JSON.stringify(rows))[0][0];
            ret.data = row;
            if (row && row.code==0) {
                // Send mail with message contact us
                mail.sendMail(
                    row.email,
                    mailTemplates.contactUsEvent,
                    {
                        'name': row.name,
                        'fullname': row.fullname,
                        'emailContact': row.emailContact,
                        'eveId': row.eveId,
                        'eventName': row.eventName,
                        'date': row.date,
                        'message': message
                    }
                );
            };
        };
        result(ret);
    });
  }
};

module.exports = Event;
