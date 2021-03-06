// metrics
require('newrelic');

var express = module.exports.express = require('express'),
    app = module.exports.app = express();

require('./lib/log.js');
require('./lib/db.js');
require('./lib/config.js');
require('./lib/routes.js');
require('./lib/shame.js');

var http = require('http');
http.createServer(app).listen(app.get('port'), function() {
    require('winston').loggers.get('system').info('Express server listening on port ' + app.get('port'));
});