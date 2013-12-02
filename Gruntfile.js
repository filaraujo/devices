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
                tests: [
                    // css
                    'cssanimations',    // css.animation
                    'backgroundsize',   // css.background.size
                    'bgrepeatround',    // css.background.repeatround   @TODO fix
                    'bgrepeatspace',    // css.background.repeatspace   @TODO fix
                    'bgsizecover',      // css.background.sizecover
                    'borderimage',      // css.border.image
                    'borderradius',     // css.border.radius
                    'boxshadow',        // css.box.shadow
                    'boxsizing',        // css.box.sizing
                    'csscalc',          // css.calc
                    'checked',          // css.checked
                    'flexwrap',         // css.flexbox.flexwrap
                    'cssfilters',       // css.filter
                    'cssgradients',     // css.gradient
                    'csshyphens',       // css.hyphen   @TODO fix
                    'csscolumns',       // css.layout.column
                    'display-runin',    // css.layout.displayrunin @TODO fix
                    'displaytable',     // css.layout.displaytable
                    'flexbox',          // css.layout.flexbox
                    'objectfit',        // css.layout.objectfit
                    'cssmask',          // css.mask
                    'mediaqueries',     // css.mediaqueries
                    'overflowscrolling',// css.overflow.scrolling
                    'csspointerevents',  // css.pointerevents
                    // javascript
                    'fullscreen',
                    'postmessage',
                    'blobworkers',
                    'dataworkers',
                    'sharedworkers',
                    'webworkers',
                    // html
                    'input',
                    'inputtypes'
                ]
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