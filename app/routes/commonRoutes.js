'use strict';
const config = require('../config');

module.exports = function(app) {
  var commonController = require('../controllers/commonController');

  //Common not secure
  app.route(config.app.base+'/v1/common/getListCountries')
    .post(commonController.getListCountries);

    app.route(config.app.base+'/v1/common/getListCountriesUsa')
      .post(commonController.getListCountriesUsa);

  app.route(config.app.base+'/v1/common/getListCompanies')
    .post(commonController.getListCompanies);

  app.route(config.app.base+'/v1/common/getListMentors')
    .post(commonController.getListMentors);

  app.route(config.app.base+'/v1/common/viewFile')
    .get(commonController.viewFile);

  app.route(config.app.base+'/v1/common/getSettings')
    .post(commonController.getSettings);

  app.route(config.app.base+'/v1/common/getListCategoriesSite')
    .post(commonController.getListCategoriesSite);

  app.route(config.app.base+'/v1/common/getListMentorsSite')
    .post(commonController.getListMentorsSite);

  app.route(config.app.base+'/v1/common/getListSponsorsSite')
    .post(commonController.getListSponsorsSite);

  //Common secured
  app.route(config.app.base+'/v1/secured/common/getCountAlerts')
    .post(commonController.getCountAlerts);

  app.route(config.app.base+'/v1/secured/common/getlistalerts')
    .post(commonController.getListAlerts);

  app.route(config.app.base+'/v1/secured/common/setviewedalert')
    .post(commonController.setViewedAlert);

  app.route(config.app.base+'/v1/secured/common/getListStates')
    .post(commonController.getListStates);

  app.route(config.app.base+'/v1/secured/common/getListTypeQuery')
    .post(commonController.getListTypeQuery);

  app.route(config.app.base+'/v1/secured/common/insertQuery')
    .post(commonController.insertQuery);

  app.route(config.app.base+'/v1/secured/common/getListCategories')
    .post(commonController.getListCategories);

  app.route(config.app.base+'/v1/secured/common/getListTimeZones')
    .post(commonController.getListTimeZones);
};
