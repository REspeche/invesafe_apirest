'use strict';
const config = require('../config');

module.exports = function(app) {
  var projectController = require('../controllers/projectController');

  //Home not secure
  app.route(config.app.base+'/v1/project/getProjectsHomeSite')
    .post(projectController.getProjectsHomeSite);

  app.route(config.app.base+'/v1/project/getProjectsByCat')
    .post(projectController.getProjectsByCat);

  app.route(config.app.base+'/v1/project/getProjectSite')
    .post(projectController.getProjectSite);

  app.route(config.app.base+'/v1/project/getQuestionsByProject')
    .post(projectController.getQuestionsByProject);

  app.route(config.app.base+'/v1/project/getStoryByProject')
    .post(projectController.getStoryByProject);

  app.route(config.app.base+'/v1/project/getUpdatesByProject')
    .post(projectController.getUpdatesByProject);

  app.route(config.app.base+'/v1/project/getStoryUpdate')
    .post(projectController.getStoryUpdate);

  app.route(config.app.base+'/v1/project/getProjectsSite')
    .post(projectController.getProjectsSite);

  app.route(config.app.base+'/v1/project/getProjectsSiteHome')
    .post(projectController.getProjectsSiteHome);

  //Home secure
  app.route(config.app.base+'/v1/secured/project/getProjects')
    .post(projectController.getProjects);

  app.route(config.app.base+'/v1/secured/project/getProject')
    .post(projectController.getProject);

  app.route(config.app.base+'/v1/secured/project/insertProject')
    .post(projectController.insertProject);

  app.route(config.app.base+'/v1/secured/project/updateProject')
    .post(projectController.updateProject);

  app.route(config.app.base+'/v1/secured/project/updateProjectActive')
    .post(projectController.updateProjectActive);

  app.route(config.app.base+'/v1/secured/project/updateGallery')
    .post(projectController.updateGallery);

  app.route(config.app.base+'/v1/secured/project/removeProject')
    .post(projectController.removeProject);

  app.route(config.app.base+'/v1/secured/project/changeStatusProject')
    .post(projectController.changeStatusProject);

  app.route(config.app.base+'/v1/secured/project/getFavoriteProjects')
    .post(projectController.getFavoriteProjects);

  app.route(config.app.base+'/v1/secured/project/getDealProjects')
    .post(projectController.getDealProjects);

  app.route(config.app.base+'/v1/secured/project/removeFavoriteProject')
    .post(projectController.removeFavoriteProject);

  app.route(config.app.base+'/v1/secured/project/setFavoriteProject')
    .post(projectController.setFavoriteProject);

  app.route(config.app.base+'/v1/secured/project/setLikeProject')
    .post(projectController.setLikeProject);

  app.route(config.app.base+'/v1/secured/project/getDeals')
    .post(projectController.getDeals);

  app.route(config.app.base+'/v1/secured/project/getPurchaseProjects')
    .post(projectController.getPurchaseProjects);

  app.route(config.app.base+'/v1/secured/project/getReportedProjects')
    .post(projectController.getReportedProjects);

  app.route(config.app.base+'/v1/secured/project/removeReportedProject')
    .post(projectController.removeReportedProject);

  app.route(config.app.base+'/v1/secured/project/rejectReportedProject')
    .post(projectController.rejectReportedProject);

  app.route(config.app.base+'/v1/secured/project/getQuestionsProjects')
    .post(projectController.getQuestionsProjects);

  app.route(config.app.base+'/v1/secured/project/removeQuestionsProject')
    .post(projectController.removeQuestionsProject);

  app.route(config.app.base+'/v1/secured/project/updateAnswerProject')
    .post(projectController.updateAnswerProject);

  app.route(config.app.base+'/v1/secured/project/getPartners')
    .post(projectController.getPartners);

  app.route(config.app.base+'/v1/secured/project/getSponsorProjects')
    .post(projectController.getSponsorProjects);

  app.route(config.app.base+'/v1/secured/project/toSponsorProject')
    .post(projectController.toSponsorProject);

  app.route(config.app.base+'/v1/secured/project/askOwnerProject')
    .post(projectController.askOwnerProject);

  app.route(config.app.base+'/v1/secured/project/contactUsProject')
    .post(projectController.contactUsProject);

  app.route(config.app.base+'/v1/secured/project/buyDealProject')
    .post(projectController.buyDealProject);

  app.route(config.app.base+'/v1/secured/project/reportProject')
    .post(projectController.reportProject);

  app.route(config.app.base+'/v1/secured/project/changeActiveQuestion')
    .post(projectController.changeActiveQuestion);

  app.route(config.app.base+'/v1/secured/project/changeExecutedDeal')
    .post(projectController.changeExecutedDeal);

  app.route(config.app.base+'/v1/secured/project/sendMailPartnerAgain')
    .post(projectController.sendMailPartnerAgain);

  app.route(config.app.base+'/v1/secured/project/getInvestedProjects')
    .post(projectController.getInvestedProjects);

  app.route(config.app.base+'/v1/secured/project/addCartToken')
    .post(projectController.addCartToken);

  // Project Meta data
  app.route(config.app.base+'/v1/secured/project/saveMetaProperties')
    .post(projectController.saveMetaProperties);

  app.route(config.app.base+'/v1/secured/project/getMetaProperties')
    .post(projectController.getMetaProperties);
};
