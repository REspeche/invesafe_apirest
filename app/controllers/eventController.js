'use strict';
var session = require('../utils/session');
var util = require('../utils/util');
var Event = require('../models/eventModel');
var File = require('../models/fileModel');

exports.getEvents = function(req, res) {
  util.logConsole(0,'Event/getEvents');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Event.getEvents(
      req.query['usrId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.getEventsSite = function(req, res) {
  util.logConsole(0,'Event/getEventsSite');
  util.logConsole(1,req.query);
  Event.getEventsSite(
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.getEventsSiteHome = function(req, res) {
  util.logConsole(0,'Event/getEventsSiteHome');
  util.logConsole(1,req.query);
  Event.getEventsSiteHome(
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.getEventSite = function(req, res) {
  util.logConsole(0,'Event/getEventSite');
  util.logConsole(1,req.query);
  Event.getEventSite(
    req.query['slug'],
    function(task) {
      util.logConsole(3,task);
      res.send(task);
    });
};

exports.getEvent = function(req, res) {
  util.logConsole(0,'Event/getEvent');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Event.getEvent(
      req.query['usrId'],
      req.query['eveId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.insertEvent = function(req, res) {
  util.logConsole(0,'Event/insertEvent');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Event.insertUpdateEvent(
      req.query['usrId'],
      0,
      req.query['title'],
      req.query['description'],
      req.query['dateEvent'],
      req.query['couId'],
      req.query['staId'],
      req.query['city'],
      req.query['tmzId'],
      req.query['webSite'],
      req.query['email'],
      req.query['active'],
      req.query['image'],
      false, //edit mode
      function(task) {
        util.logConsole(3,task);
        if (task.code==0 && task.data && task.data.code == 0) {
          File.uploadImage('event', req, req.query['usrId'], task.data.id, Event.uploadImage, false, function(newFile) {
              if (newFile != undefined) task.data.image = newFile;
              res.send(task);
          });
        }
        else {
          res.send(task);
        }
      });
	});
};

exports.updateEvent = function(req, res) {
  util.logConsole(0,'Event/updateEvent');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Event.insertUpdateEvent(
      req.query['usrId'],
      req.query['eveId'],
      req.query['title'],
      req.query['description'],
      req.query['dateEvent'],
      req.query['couId'],
      req.query['staId'],
      req.query['city'],
      req.query['tmzId'],
      req.query['webSite'],
      req.query['email'],
      req.query['active'],
      req.query['image'],
      true, //edit mode
      function(task) {
        util.logConsole(3,task);
        if (task.code==0 && task.data && task.data.code == 0) {
          File.uploadImage('event', req, req.query['usrId'], req.query['eveId'], Event.uploadImage, false, function(newFile) {
              if (newFile != undefined) task.data.image = newFile;
              res.send(task);
          });
        }
        else {
          res.send(task);
        }
      });
	});
};

exports.removeEvent = function(req, res) {
  util.logConsole(0,'Event/removeEvent');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Event.removeEvent(
      req.query['usrId'],
      req.query['eveId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.rejectEvent = function(req, res) {
  util.logConsole(0,'Event/rejectEvent');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Event.rejectEvent(
      req.query['usrId'],
      req.query['eveId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.activeEvent = function(req, res) {
  util.logConsole(0,'Event/activeEvent');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
    Event.activeEvent(
      req.query['usrId'],
      req.query['eveId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.changeStatusEvent = function(req, res) {
  util.logConsole(0,'Event/changeStatusEvent');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
    Event.changeStatusEvent(
      req.query['usrId'],
      req.query['eveId'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};

exports.contactUsEvent = function(req, res) {
  util.logConsole(0,'Event/contactUsEvent');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Event.contactUsEvent(
			req.query['usrId'],
      req.query['eveId'],
      req.query['message'],
      function(task) {
        util.logConsole(3,task);
        res.send(task);
      });
	});
};
