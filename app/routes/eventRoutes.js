'use strict';
const config = require('../config');

module.exports = function(app) {
  var eventController = require('../controllers/eventController');

  //Home not secured
  app.route(config.app.base+'/v1/event/getEventsSite')
    .post(eventController.getEventsSite);

  app.route(config.app.base+'/v1/event/getEventsSiteHome')
    .post(eventController.getEventsSiteHome);

  app.route(config.app.base+'/v1/event/getEventSite')
    .post(eventController.getEventSite);

  //Home secured
  app.route(config.app.base+'/v1/secured/event/getEvents')
    .post(eventController.getEvents);

  app.route(config.app.base+'/v1/secured/event/getEvent')
    .post(eventController.getEvent);

  app.route(config.app.base+'/v1/secured/event/insertEvent')
    .post(eventController.insertEvent);

  app.route(config.app.base+'/v1/secured/event/updateEvent')
    .post(eventController.updateEvent);

  app.route(config.app.base+'/v1/secured/event/removeEvent')
    .post(eventController.removeEvent);

  app.route(config.app.base+'/v1/secured/event/rejectEvent')
    .post(eventController.rejectEvent);

  app.route(config.app.base+'/v1/secured/event/activeEvent')
    .post(eventController.activeEvent);

  app.route(config.app.base+'/v1/secured/event/changeStatusEvent')
    .post(eventController.changeStatusEvent);

  app.route(config.app.base+'/v1/secured/event/contactUsEvent')
    .post(eventController.contactUsEvent);
};
