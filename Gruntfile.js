/*global module:false*/
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + 
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + 
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + 
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        uglify: {
            options: {
                banner: '<%= banner %>'
            },            
            dist: {
                src: 'jquery.slidey.js',
                dest: 'dist/jquery.slidey.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            dist: {
                src: ['jquery.slidey.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },            
            dist: {
                files: ['jquery.slidey.js'],
                tasks: ['jshint:dist', 'uglify:dist']
            },
            less: {
                files: 'jquery.slidey.less',
                tasks: ['less:dist','cssmin:dist']
            }
        },
        less: { // Task
            dist: { // Target
                options: { // Target options
                    style: 'compressed',
                    noCache: true,
                    sourcemap: 'none'
                },
                files: { // Dictionary of files
                    'dist/jquery.slidey.css': 'jquery.slidey.less', 
                }
            }            
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            dist: {
                files: {
                    'dist/jquery.slidey.min.css': 'dist/jquery.slidey.css',
                }
            }
        }
    });
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Default task.
    grunt.registerTask('default', ['less:dist', 'cssmin:dist', 'jshint:dist', 'uglify:dist']);
    
};