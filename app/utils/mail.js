const config = require('../config');
var nodemailer = require('nodemailer');
var ejs = require('ejs');
var fs = require('fs');

exports.sendMail = function(pTo, pMailOptions, pParams) {
  var template = fs.readFileSync('./mail/general.html',{encoding:'utf-8'});
  var subject = ejs.render(pMailOptions.subject, pParams);
  var links = pMailOptions.links;

  //Add params
  if (!pParams.server) pParams.server = config.app.server;
  if (links) {
    for (var f=0;f < links.length;f++) {
      var nameLink = 'link' + (f + 1);
      pParams[nameLink] = ejs.render(links[f], pParams);
    }
  }

  //Parse TXT & HTML version
  var textFormated = ejs.render(pMailOptions.text, pParams);
  var htmlFormated = ejs.render(template, {'textHtml': ejs.render(pMailOptions.html, pParams)});

  var mailOptions = {
    from: config.smtp.from.name + ' <' + config.smtp.from.address + '>',
    to: pTo,
    subject: subject,
    text: textFormated,
    html: htmlFormated
  };

  var transporter = nodemailer.createTransport({
    service: config.smtp.service,
    host: config.smtp.host,
    port: config.smtp.port,
    secure: true,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  });

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
