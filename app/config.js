const config = {
 app: {
   port: 3000,
   base: '/api',
   server: 'http://localhost:8080',
   site: 'http://localhost'
 },
 db: {
   host     : '127.0.0.1',
   port     : '3306',
   user     : 'invesafe_user',
   password : '5sjaqEyhmwVZsCVf',
   database : 'invesafe_db'
 },
 session: {
   secret: 'finiTzM7xKi55n7y',
   tokenLife: 86400
 },
 smtp: {
   service: 'gmail',
   host: 'smtp.gmail.com',
   port: 465,
   user: 'invesafe.incloux@gmail.com',
   pass: 'Invesafe123$',
   from: {
     address: 'invesafe.incloux@gmail.com',
     name: 'invesafe'
   }
 },
 files: {
   project: {
     path: '/container/projects/',
     size: {
       large: [1280, 720],
       small: [640, 360],
     }
   },
   gallery: {
     path: '/container/gallery/',
     size: {
       large: [1024, 576],
       small: [426, 240],
     }
   },
   category: {
     path: '/container/categories/',
     size: {
       large: [800, 450],
       small: [400, 225],
     }
   },
   profile: {
     path: '/container/profiles/',
     size: {
       large: [400, 400],
       small: [200, 200],
     }
   },
   page: {
     path: '/container/pages/'
   },
   event: {
    path: '/container/events/',
    size: {
      large: [1280, 720],
      small: [640, 360],
    }
  }
 },
 mailchimp: {
   mailchimpInstance: 'us12',
   listUniqueId: '69f426ed70',
   mailchimpApiKey: 'da8ece109281184b1081e72a792efe17-us5'
 },
 recaptcha: {
   secretKey: '6LdlGIwUAAAAAADF83L7LOly98wRegBxGsWuxHlh'
 }
};

module.exports = config;
