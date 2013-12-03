var features = require('./app/assets/vendor/modernizr/modernizr-features.json').features;

module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        nodemon: {
            dev: {
                options: {
                    file: './app.js'//,
                    // exec: 'node-theseus'
                }
            }
        },

        modernizr: {
            dist : {
                devFile : "app/assets/vendor/modernizr/modernizr-custom.js",
                dest : "app/assets/vendor/modernizr/modernizr-custom.js",
                crawl : false,
                uglify: false,
                tests: features.map(function(feature){
                    return feature.module;
                }),
                // tests: [
                //     // javascript
                //     'fullscreen',
                //     'postmessage',
                //     'blobworkers',
                //     'dataworkers',
                //     'sharedworkers',
                //     'webworkers',
                //     // html
                //     'input',
                //     'inputtypes'
                // ]
            }
        },
        mochacov: {
            options: {
                reporter: 'spec'
            },
            src: ['test/config.js', 'test/**/*.js']
        },
        watch: {
            test: {
                files: ['app/controllers/**/*.js', 'app/helpers/**/*.js', 'app/models/**/*.js', 'test/**/*.js'],
                tasks: ['mochacov']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mocha-cov');
    grunt.loadNpmTasks("grunt-modernizr");

    grunt.registerTask('default', ['nodemon']);
    grunt.registerTask('test', ['mochacov', 'watch:test']);
};