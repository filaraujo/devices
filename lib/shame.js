/**
 * @todo un-hackify this filter
 */

var jade = require('jade'),
    fs = require('fs'),
    stylus = require('stylus');

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

};