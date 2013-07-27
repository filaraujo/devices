var app = module.parent.exports.app,
    express = module.parent.exports.express,
    path = require('path'),
    stylus = require('stylus');

var rootDir = __dirname + '/../';

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', rootDir + '/app/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(rootDir + '/app/assets'));
app.use(express.static(path.join(rootDir + '/app/assets')));

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

app.configure('development', function () {
    app.locals.pretty = true;
});



/**
 * @todo un-hackify this filter
 */

var jade = require('jade'),
    fs = require('fs');

jade.filters.injectJS = function(str){
    var file = __dirname+'/../app/assets/javascripts/'+str,
        string;

    string = fs.readFileSync(file, 'utf8');
    string += '\n\n';
    return string;
};