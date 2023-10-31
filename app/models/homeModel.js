'user strict';
const response = require('./_response');
const storage = require('node-persist');
var conn = require('../utils/db');
var util = require('../utils/util');

//Constructor
var Home = {
  getCounters: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_COUNTERS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
          util.logConsole(3,ret);
          ret.data = JSON.parse(JSON.stringify(rows))[0][0];
      };
      result(ret);
    });
  },
  getLastMembers: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_LAST_MEMBERS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
      if(err) {
          console.log("error: ", err);
          ret.code = 300;
          ret.message = err.message;
      }
      else{
          ret.data = JSON.parse(JSON.stringify(rows))[0];
          util.logConsole(3,ret);
      };
      result(ret);
    });
  },
  getRecentProjects : function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_RECENT_PROJECTS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
      if(err) {
          console.log("error: ", err);
          ret.code = 300;
          ret.message = err.message;
      }
      else{
          ret.data = JSON.parse(JSON.stringify(rows))[0];
          util.logConsole(3,ret);
      };
      result(ret);
    });
  },
  getAllInfo: async function(usrId, result) {
    var ret = new response;
    Home.getCounters(usrId, function(taskRet) {
      ret.data.lstCounters = taskRet.data;
      Home.getLastMembers(usrId, function(taskRet) {
        ret.data.lstLastMembers = taskRet.data;
        Home.getRecentProjects(usrId, function(taskRet) {
          ret.data.lstRecentProjects = taskRet.data;
          result(ret);
        });
      });
    });
  },
  getLast30Deals: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_LAS_30_DEALS("+usrId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            ret = util.response_result(JSON.parse(JSON.stringify(rows))[0]);
            util.logConsole(3,ret);
            result(ret);
        }
    });
  },
};

module.exports = Home;
