// modules (consts)
const config = require('./app/config'),
  express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  storage = require('node-persist'),
  packageJson = require('./package.json');

// variables
var app = express(),
  port = process.env.PORT || config.app.port;

// use it before all route definitions
app.use(cors({origin: '*'}));

// default route
app.get('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('API is working correctly... \n');
});
app.get(config.app.base+'/v1', function (req, res) {
    return res.send(
      {
        version: packageJson.version
      }
    );
});

// start server
app.listen(port, async function () {
    //first call storage.init
    await storage.init({
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: 'utf8',
        ttl: true, //1hr
        expiredInterval: 24 * 60 * 60 * 1000 //24hs
    });
    //clear if exist
    await storage.clear();

    console.log('APIRest server started on: '+port);
});

app.use(bodyParser.urlencoded({limit: '6mb', extended: true}));
app.use(bodyParser.json({limit: '2mb', extended: false}));

require('./app/routes/authRoutes')(app); //auth routes
require('./app/routes/commonRoutes')(app); //common routes
require('./app/routes/homeRoutes')(app); //home routes
require('./app/routes/profileRoutes')(app); //profile routes
require('./app/routes/projectRoutes')(app); //project routes
require('./app/routes/categoryRoutes')(app); //category routes
require('./app/routes/settingRoutes')(app); //setting routes
require('./app/routes/eventRoutes')(app); //event routes
require('./app/routes/checkoutRoutes')(app); //checkout routes
require('./app/routes/mailRoutes')(app); //mail routes

module.exports = app;
