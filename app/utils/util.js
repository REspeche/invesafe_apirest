'user strict';
const response = require('../models/_response');

exports.logConsole = function(type, objText) {
  switch (type) {
    case 0: //Header
      console.log('-------------------------------------------------------------');
      console.log('API: '+objText);
      break;
    case 1: //Request
      console.log('1.Request: ');
      console.dir(objText,{depth:null});
      break;
    case 2: //Sql
      console.log('2.SQL call: '+objText);
      break;
    case 3: //Response
      if (objText.code!=0) console.log('3.Response (error): ');
      else console.log('3.Response (ok): ');
      console.dir(objText,{depth:null});
      break;
    case 4: //Send Notifications
      console.log('--> Send notifications: '+objText);
      break;
    default:
      console.log(objText);
      break;
  }
};

var formatRegExp = /%[sdj]/g;
exports.format = function(f) {
  if (typeof f !== 'string') {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var str = String(f).replace(formatRegExp, function(x) {
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j': return JSON.stringify(args[i++]);
      default:
        return x;
    }
  });
  for (var len = args.length, x = args[i]; i < len; x = args[++i]) {
    if (x === null || typeof x !== 'object') {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
}

exports.mysql_real_escape_string = function (str) {
    if (typeof str != 'string')
        return str;

    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

exports.format_phone = function (phone) {
  if (phone.indexOf("+")!=0) phone = "+" + phone;
  if (phone.indexOf("+54")!=0) phone = phone.replace("+","+54");
  if (phone.indexOf("+549")!=0) phone = phone.replace("+54","+549");
  return phone;
}

exports.response_result = function (row) {
  var ret = new response;
  ret.code = (row.code)?row.code:0;
  ret.message = (row.message)?row.message:'';
  ret.data = (!row.code || row.code==0)?row:{};
  return ret;
}
