// metrics
require('newrelic');

var express = module.exports.express = require('express'),
    app = module.exports.app = express();

var logger = require('./lib/log.js')().loggers.get('system');
require('./lib/config.js');
require('./lib/db.js');
require('./lib/routes.js');

var http = require('http');
http.createServer(app).listen(app.get('port'), function() {
    logger.info('Express server listening on port ' + app.get('port'));
});