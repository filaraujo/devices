module.exports = function(grunt) {
    grunt.initConfig({
        nodemon: {
            dev: {
                options: {
                    file: './app.js'
                }
            }
        },
        mochacov: {
            options: {
                output: 'test.html',
                reporter: 'html-cov'
            },
            src: ['test/config.js', 'test/**/*.js']
        },
        watch: {
            test: {
                files: ['app/controllers/**/*.js', 'app/helpers/**/*.js', 'app/models/**/*.js', 'test/**/*.js'],
                tasks: ['mochacov']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mocha-cov');

    grunt.registerTask('default', ['nodemon']);
    grunt.registerTask('test', ['mochacov', 'watch:test']);
};