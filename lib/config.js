var app = module.parent.exports.app,
    express = module.parent.exports.express,
    path = require('path'),
    stylus = require('stylus'),
    nib = require('nib');

var rootDir = __dirname + '/../';

function compile(str, path) {
    return stylus(str)
        .include(nib.path)
        .set('filename', path)
        .set('compress', true);
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', rootDir + '/app/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use('/api/v1', require('mers')({ mongoose: require('mongoose') }).rest());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('secret'));
app.use(express.methodOverride());
app.use(app.router);
app.use(stylus.middleware({ src: rootDir + '/app/assets', compile: compile }));
app.use(express.compress());
app.use(express.static(path.join(rootDir + '/app/assets')));

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

app.configure('development', function () {
    app.locals.pretty = true;
});



