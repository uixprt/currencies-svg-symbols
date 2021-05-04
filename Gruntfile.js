var cssBuildPath = 'builds/development/css/';

module.exports = function (grunt) {

    grunt.initConfig({

        svgo: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'components/svg',
                    src: '*.svg',
                    dest: 'builds/svg'
                }]
            }
        },

        stylus: {
            options: {
                compress: 0
            },
            compile: {
                files: [{
                    expand: true,
                    cwd: 'components/stylus/',
                    src: '*.styl',
                    dest: cssBuildPath,
                    ext: '.css'

                }]
            }
        }, //stylus

        postcss: {
            options: {
                processors: [
                    require('postcss-inline-svg'),
                    require('autoprefixer'),
                    require('cssnano')
                ]
            },
            dist: {
                expand: true,
                cwd: cssBuildPath,
                src: '*.css',
                dest: cssBuildPath
            }

        }, //postcss

        connect: {
            sever: {
                options: {
                    hostname: 'localhost',
                    port: 3333,
                    base: 'builds/development/',
                    livereload: true
                }
            }
        },

        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            scripts: {
                files: ['builds/development/**/*.html',
                    'components/scripts/**/*.js',
                    'components/svg/**/*.svg',
                    'components/stylus/**/*.styl'],
                tasks: ['stylus', 'postcss']
            }
        } //watch

    }); //initConfig

    grunt.loadNpmTasks('grunt-svgo');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['svgo', 'stylus', 'postcss', 'connect', 'watch']);

}; //wrapper function
