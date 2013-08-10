module.exports = function(grunt) {
    grunt.initConfig({
        nodemon: {
            dev: {
                options: {
                    file: './app.js'
                }
            }
        },
        simplemocha: {
            options: {
                globals: ['should'],
                ui: 'bdd',
                reporter: 'dot'
            },

            all: {
                src: ['test/**/*.js']
            }
        },
        watch: {
            scripts: {
                files: ['app/helpers/**/*.js', 'app/models/**/*.js','test/**/*.js'],
                tasks: ['simplemocha']
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('default', ['nodemon']);
    grunt.registerTask('test', ['simplemocha', 'watch']);


    grunt.registerTask('server', 'Start web server', function() {
        require('./app.js').app.listen(1234).on('close', this.async());
    });
};
