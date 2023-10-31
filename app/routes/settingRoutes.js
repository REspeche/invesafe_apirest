'use strict';
const config = require('../config');

module.exports = function(app) {
  var settingController = require('../controllers/settingController');

  //Home
  app.route(config.app.base+'/v1/secured/setting/getSettingsGeneral')
    .post(settingController.getSettingsGeneral);

  app.route(config.app.base+'/v1/secured/setting/updateSettingsGeneral')
    .post(settingController.updateSettingsGeneral);

  app.route(config.app.base+'/v1/secured/setting/getSettingsLimits')
    .post(settingController.getSettingsLimits);

  app.route(config.app.base+'/v1/secured/setting/updateSettingsLimits')
    .post(settingController.updateSettingsLimits);

  app.route(config.app.base+'/v1/secured/setting/getSettingsPayment')
    .post(settingController.getSettingsPayment);

  app.route(config.app.base+'/v1/secured/setting/updateSettingsPayment')
    .post(settingController.updateSettingsPayment);

  app.route(config.app.base+'/v1/secured/setting/getSettingsSocial')
    .post(settingController.getSettingsSocial);

  app.route(config.app.base+'/v1/secured/setting/updateSettingsSocial')
    .post(settingController.updateSettingsSocial);

  app.route(config.app.base+'/v1/secured/setting/getPages')
    .post(settingController.getPages);

  app.route(config.app.base+'/v1/secured/setting/getPage')
    .post(settingController.getPage);

  app.route(config.app.base+'/v1/secured/setting/updatePage')
    .post(settingController.updatePage);

  app.route(config.app.base+'/v1/secured/setting/removePage')
    .post(settingController.removePage);

  app.route(config.app.base+'/v1/secured/setting/getSponsors')
    .post(settingController.getSponsors);

  app.route(config.app.base+'/v1/secured/setting/getSponsor')
    .post(settingController.getSponsor);

  app.route(config.app.base+'/v1/secured/setting/insertSponsor')
    .post(settingController.insertSponsor);

  app.route(config.app.base+'/v1/secured/setting/updateSponsor')
    .post(settingController.updateSponsor);

  app.route(config.app.base+'/v1/secured/setting/removeSponsor')
    .post(settingController.removeSponsor);

  app.route(config.app.base+'/v1/secured/setting/activeSponsor')
    .post(settingController.activeSponsor);
};
