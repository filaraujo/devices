module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        nodemon: {
            dev: {
                options: {
                    file: './app.js',
                    exec: 'node-theseus'
                }
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

    grunt.registerTask('default', ['nodemon']);
    grunt.registerTask('test', ['mochacov', 'watch:test']);
};