module.exports = function(grunt) {

	grunt.initConfig({
		stylus: {
			compile: {
				options: {
					paths: ['styl'],
					import: [__dirname + '/dev/styl/_vars']
				},
				files: {
					'dev/grunt/styl.css': ['dev/styl/**/*.styl']
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'public/build/min.css': ['dev/styl/fontello/css/*.css', 'dev/grunt/styl.css']
				}
			}
		},
		uglify: {
			dev: {
				options: {
					mangle: {
						toplevel: false
					},
					squeeze: {
						dead_code: false
					},
					codegen: {
						quote_keys: false
					},
					sourceMap: false,
					sourceMapName: 'public/build/min.js.map'
				},
				files: {
					'public/build/min.js': ['public/build/bundle.js']
				}
			},
		},
		concat: {
			options: {
				separator: ';',
			},
			dev: {
				src: [
					'dev/js/base/Handlebars.4.0.5.js',
					'dev/js/base/findAndReplaceDOMText.js',
					'dev/js/base/Base.js',
					'dev/js/components/Ajax.js',
					'dev/js/components/Binder.js',
					'dev/js/components/Requester.js',
					'dev/js/components/Requirer.js',
					'dev/js/components/Router.js',
					'dev/js/components/Templater.js',
					'dev/js/components/TemplaterList.js',
					'dev/js/components/TemplaterWatcher.js'
				],
				dest: 'public/build/bundle.js',
			}
		},
		watch: {
			bundle : {
				files : [
					'dev/js/base/Handlebars.4.0.5.js',
					'dev/js/base/findAndReplaceDOMText.js',
					'dev/js/base/Base.js',
					'dev/js/components/Ajax.js',
					'dev/js/components/Binder.js',
					'dev/js/components/Requester.js',
					'dev/js/components/Requirer.js',
					'dev/js/components/Router.js',
					'dev/js/components/Templater.js',
					'dev/js/components/TemplaterList.js',
					'dev/js/components/TemplaterWatcher.js',
					'dev/js/screens/comps/*.js',
					'dev/js/screens/**/*.js',
					'dev/js/bundle.js'
				],
				tasks : ['concat:dev'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['dev/styl/**/*.styl'],
				tasks: ['stylus', 'cssmin'],
				options: {
					spawn: false,
				},
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-gzip');

	grunt.registerTask('default', ['stylus', 'cssmin', 'uglify:dist', 'compress']);
	grunt.registerTask('dev', ['stylus', 'cssmin', 'concat:dev', 'uglify:dev']);
	grunt.registerTask('wdev', ['watch']);
};
