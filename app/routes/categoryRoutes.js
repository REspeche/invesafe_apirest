'use strict';
const config = require('../config');

module.exports = function(app) {
  var categoryController = require('../controllers/categoryController');

  //Home not secured
  app.route(config.app.base+'/v1/category/getCategoriesSite')
    .post(categoryController.getCategoriesSite);

  app.route(config.app.base+'/v1/category/getCategoryBySlug')
    .post(categoryController.getCategoryBySlug);

  //Home secured
  app.route(config.app.base+'/v1/secured/category/getCategories')
    .post(categoryController.getCategories);

  app.route(config.app.base+'/v1/secured/category/getCategory')
    .post(categoryController.getCategory);

  app.route(config.app.base+'/v1/secured/category/insertCategory')
    .post(categoryController.insertCategory);

  app.route(config.app.base+'/v1/secured/category/updateCategory')
    .post(categoryController.updateCategory);

  app.route(config.app.base+'/v1/secured/category/removeCategory')
    .post(categoryController.removeCategory);

  app.route(config.app.base+'/v1/secured/category/activeCategory')
    .post(categoryController.activeCategory);
};
