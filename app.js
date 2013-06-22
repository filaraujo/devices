// metrics
require('newrelic');

var express = module.exports.express = require('express'),
    app = module.exports.app = express();

require('./lib/config.js');
require('./lib/db.js');
require('./lib/routes.js');

var http = require('http');
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});