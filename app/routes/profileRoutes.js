'use strict';
const config = require('../config');

module.exports = function(app) {
  var profileController = require('../controllers/profileController');

  app.route(config.app.base+'/v1/secured/profile/getProfile')
    .post(profileController.getProfile);

  app.route(config.app.base+'/v1/secured/profile/getProfileCheckout')
    .post(profileController.getProfileCheckout);

  app.route(config.app.base+'/v1/secured/profile/updateProfile')
    .post(profileController.updateProfile);

  app.route(config.app.base+'/v1/secured/profile/getMembers')
    .post(profileController.getMembers);

  app.route(config.app.base+'/v1/secured/profile/updateMember')
    .post(profileController.updateMember);

  app.route(config.app.base+'/v1/secured/profile/getMember')
    .post(profileController.getMember);

  app.route(config.app.base+'/v1/secured/profile/removeMember')
    .post(profileController.removeMember);

};
