'use strict';
var session = require('../utils/session');
var util = require('../utils/util');
var Category = require('../models/categoryModel');
var File = require('../models/fileModel');

exports.getCategories = function(req, res) {
  util.logConsole(0,'Category/getCategories');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Category.getCategories(
			req.query['usrId'],
		function(task) {
			util.logConsole(3,task);
      res.send(task);
		});
	});
};

exports.getCategoriesSite = function(req, res) {
  util.logConsole(0,'Category/getCategoriesSite');
  util.logConsole(1,req.query);
  Category.getCategoriesSite(
  function(task) {
    util.logConsole(3,task);
    res.send(task);
  });
};

exports.getCategoryBySlug = function(req, res) {
  util.logConsole(0,'Category/getCategoryBySlug');
  util.logConsole(1,req.query);
  Category.getCategoryBySlug(
    req.query['slug'],
  function(task) {
    util.logConsole(3,task);
    res.send(task);
  });
};

exports.getCategory = function(req, res) {
  util.logConsole(0,'Category/getCategory');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Category.getCategory(
			req.query['usrId'],
      req.query['catId'],
		function(task) {
			util.logConsole(3,task);
      res.send(task);
		});
	});
};

exports.insertCategory = function(req, res) {
  util.logConsole(0,'Category/insertCategory');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Category.insertUpdateCategory(
			req.query['usrId'],
      0,
      req.query['name'],
      req.query['slug'],
      req.query['mode'],
      req.query['image'],
      false, //edit mode
		function(task) {
      util.logConsole(3,task);
      if (task.code==0 && task.data && task.data[0].code == 0) {
        File.uploadImage('category', req, req.query['usrId'], task.data[0].id, Category.uploadImage, false, function(newFile) {
          if (newFile != undefined) task.data[0].image = newFile;
          res.send(task);
        });
      }
      else {
        res.send(task);
      };
		});
	});
};

exports.updateCategory = function(req, res) {
  util.logConsole(0,'Category/updateCategory');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Category.insertUpdateCategory(
			req.query['usrId'],
      req.query['catId'],
      req.query['name'],
      req.query['slug'],
      req.query['mode'],
      req.query['image'],
      true, //edit mode
		function(task) {
			util.logConsole(3,task);
      if (task.code==0 && task.data && task.data[0].code == 0) {
        File.uploadImage('category', req, req.query['usrId'], req.query['catId'], Category.uploadImage, false, function(newFile) {
          if (newFile != undefined) task.data[0].image = newFile;
          res.send(task);
        });
      }
      else {
        res.send(task);
      }
		});
	});
};

exports.removeCategory = function(req, res) {
  util.logConsole(0,'Category/removeCategory');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
	  Category.removeCategory(
			req.query['usrId'],
      req.query['catId'],
		function(task) {
			util.logConsole(3,task);
      res.send(task);
		});
	});
};

exports.activeCategory = function(req, res) {
  util.logConsole(0,'Category/activeCategory');
  util.logConsole(1,req.query);
	session.verifyToken(req, res, function() {
    Category.activeCategory(
			req.query['usrId'],
      req.query['catId'],
		function(task) {
			util.logConsole(3,task);
      res.send(task);
		});
	});
};
