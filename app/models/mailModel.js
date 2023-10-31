'user strict';
const request = require('superagent');
const fetch = require('isomorphic-fetch');
const response = require('./_response');
const config = require('../config');
const mailTemplates = require('../mailTemplates');
var util = require('../utils/util');
var mail = require('../utils/mail');

//Constructor
var Mail = {
  verifyCaptcha: async function(token, result) {
    const url = 'https://www.google.com/recaptcha/api/siteverify?secret='+config.recaptcha.secretKey+'&response='+token;
    var ret = new response;

    fetch(url, {
      method: 'post'
    })
    .then(response => response.json())
    .then(function(google_response) {
      ret.data = google_response;
      ret.data.code = 0;
      result(ret);
    })
    .catch(function (error) {
      ret.data.code = 300;
      result(ret);
    });
  },
  iAmDeveloper: async function(name, email, phone, message, result) {
    var ret = new response;
    // Send mail with message contact us from developer
    mail.sendMail(
        mailTemplates.contactUsDeveloper.email,
        mailTemplates.contactUsDeveloper,
        {'name': name, 'email': email, 'phone': phone, 'message': message}
    );
    ret.data = {
      code: 0
    };
    result(ret);
  },
  contactUs: async function(name, email, subject, message, result) {
    var ret = new response;
    // Send mail with message contact us
    mail.sendMail(
        mailTemplates.contactUsSite.email,
        mailTemplates.contactUsSite,
        {'name': name, 'email': email, 'subject': subject, 'message': message}
    );
    ret.data = {
      code: 0
    };
    result(ret);
  },
  subscribeNewsletters: async function(email, result) {
    var ret = new response;
    request
      .post('https://' + config.mailchimp.mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + config.mailchimp.listUniqueId + '/members/')
      .set('Content-Type', 'application/json;charset=utf-8')
      .set('Authorization', 'Basic ' + new Buffer.from('any:' + config.mailchimp.mailchimpApiKey ).toString('base64'))
      .send({
        'email_address': email,
        'status': 'subscribed'
      })
      .end(function(err, response) {
        if (response.status < 300) {
          // Send mail your project is approved
          mail.sendMail(
            email,
            mailTemplates.thanksSuscribe,
            {}
          );
          ret.data.code = 0;
        }
        else if (response.status === 400 && response.body.title === "Member Exists") {
          ret.code = 106;
        }
        else {
          ret.code = 314;
          ret.message = err.response.body.detail;
        }
        util.logConsole(3,ret);
        result(ret);
      });
  },
  testEmail: async function(email, result) {
    var ret = new response;
    try {
      // Send test mail
      mail.sendMail(
        email,
        mailTemplates.testEmail,
        {}
      );
      ret.code = 0;
    }
    catch (e) {
      ret.code = -1;
      ret.message = e;
    }
    result(ret);
  }
};

module.exports = Mail;
