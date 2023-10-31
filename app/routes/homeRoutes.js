'use strict';
const config = require('../config');

module.exports = function(app) {
  var homeController = require('../controllers/homeController');

  //Home secured
  app.route(config.app.base+'/v1/secured/home/getCounters')
    .post(homeController.getCounters);

  app.route(config.app.base+'/v1/secured/home/getLastMembers')
    .post(homeController.getLastMembers);

  app.route(config.app.base+'/v1/secured/home/getRecentProjects')
    .post(homeController.getRecentProjects);

  app.route(config.app.base+'/v1/secured/home/getAllInfo')
    .post(homeController.getAllInfo);

  app.route(config.app.base+'/v1/secured/home/getLast30Deals')
    .post(homeController.getLast30Deals);
};
