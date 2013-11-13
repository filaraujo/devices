var app = module.parent.exports.app,
    express = module.parent.exports.express,
    path = require('path'),
    stylus = require('stylus'),
    nib = require('nib');

var rootDir = __dirname + '/../';

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', rootDir + '/app/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('ressdrivenwebponents'));
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware({
    src: rootDir + '/app/assets',
    compile: compile
}));
app.use(express.static(path.join(rootDir + '/app/assets')));

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

app.configure('development', function () {
    app.locals.pretty = true;
});

function compile(str, path) {
    return stylus(str)
        .include(require('nib').path)
        .set('filename', path)
        .set('compress', true);
}


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

jade.filters.injectCSS = function(str){
    var file = __dirname+'/../app/assets/stylus/'+str.trim(),
        string;

    string = fs.readFileSync(file, 'utf8');

    string = stylus(string, { compress: false })
        .use(require('nib')())
        .import('nib')
        .render();

    return '<style type="style/css">'+string+'</style>';

}