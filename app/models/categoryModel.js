'user strict';
const response = require('./_response');
const storage = require('node-persist');
var conn = require('../utils/db');
var util = require('../utils/util');

//Constructor
var Category = {
  getCategories: function(usrId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_CATEGORIES("+usrId+")";
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
  getCategoriesSite: function(result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_CATEGORIES_SITE()";
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
  getCategoryBySlug: function(slug, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_CATEGORIES_BY_SLUG('"+slug+"')";
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
  getCategory: function(usrId, catId, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_CATEGORY("+usrId+", "+catId+")";
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
  insertUpdateCategory: function(usrId, catId, name, slug, mode, image, editMode, result) {
    var ret = new response;
    var spName = (editMode)?"SP_UPDATE_CATEGORY":"SP_INSERT_CATEGORY";

    var strSQL = "CALL "+spName+"("+
                  ((editMode)?"'"+catId+"',":"'"+usrId+"',")+
                  "'"+name+"',"+
                  "'"+slug+"',"+
                  mode+","+
                  "'"+((image==undefined)?'':image)+"')";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('lstFavCategories');
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  removeCategory: function(usrId, catId, result) {
    var ret = new response;
    var strSQL = "CALL SP_REMOVE_CATEGORY("+usrId+","+catId+")";
    util.logConsole(2,strSQL);
    conn.query(strSQL, function (err, rows) {
        if(err) {
            console.log("error: ", err);
            ret.code = 300;
            ret.message = err.message;
        }
        else{
            storage.removeItem('lstFavCategories');
            ret.data = JSON.parse(JSON.stringify(rows))[0];
        };
        result(ret);
    });
  },
  uploadImage: function(usrId, catId, fileName, fileSize, result) {
    var ret = new response;
    var strSQL = "CALL SP_UPLOAD_IMAGE_CATEGORY ("+usrId+", "+catId+", '"+fileName+"', '"+fileSize+"')";
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
  activeCategory: function(usrId, catId, result) {
    var ret = new response;
    var strSQL = "CALL SP_ACTIVE_CATEGORY ("+usrId+", "+catId+")";
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

module.exports = Category;
