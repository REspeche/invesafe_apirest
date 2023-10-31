'use strict';
const config = require('../config');

module.exports = function(app) {
  var mailController = require('../controllers/mailController');

  //Common not secure
  app.route(config.app.base+'/v1/mail/verifyCaptcha')
    .post(mailController.verifyCaptcha);

  app.route(config.app.base+'/v1/mail/contactUs')
    .post(mailController.contactUs);

  app.route(config.app.base+'/v1/mail/iAmDeveloper')
    .post(mailController.iAmDeveloper);

  app.route(config.app.base+'/v1/mail/subscribeNewsletters')
    .post(mailController.subscribeNewsletters);

  app.route(config.app.base+'/v1/mail/testEmail')
    .post(mailController.testEmail);
};
