'user strict';
const response = require('./_response');
var conn = require('../utils/db');
var util = require('../utils/util');

//Constructor
var Checkout = {
  processPay: function(usrId, isGift, notes, modePay, cartItems, secureRandom, codeCoinbase, result) {
    var ret = new response;
    var strSQL = "CALL SP_CREATE_ORDER ("+usrId+", "+isGift+", '"+notes+"', "+modePay+", '["+cartItems+"]', '"+secureRandom+"', '"+codeCoinbase+"')";
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
  getOrder: function(usrId, ordId, hash, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_ORDER("+usrId+", "+ordId+", '"+hash+"')";
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
  getOrderItems: function(usrId, ordId, hash, result) {
    var ret = new response;
    var strSQL = "CALL SP_GET_ORDER_ITEMS("+usrId+", "+ordId+", '"+hash+"')";
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

module.exports = Checkout;
