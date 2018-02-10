module.exports = function(grunt) {

	grunt.registerMultiTask(
		"fingerPrintWebapp", 
		"Generate a fingerprint to webapp update", 
		function() {
		    grunt.file.write('fingerprint.txt', this.data);
		}
	);

	grunt.initConfig({
		fingerPrintWebapp: {
			key: +new Date
		},
		stylus: {
			compile: {
				options: {
					paths: ['styl'],
					import: [__dirname + '/dev/styl/_vars']
				},
				files: {
					'public/build/build/styl.css': ['dev/**/*.styl']
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
					'public/build/webapp.css': ['dev/**/fontello/css/*.css', 'public/build/build/styl.css']
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
					sourceMapName: 'public/build/webapp.js.map'
				},
				files: {
					'public/build/webapp.js': ['public/build/webapp.js']
				}
			},
			dist: {
				options: {
					mangle: {
						toplevel: false
					},
					squeeze: {
						dead_code: true
					},
					codegen: {
						quote_keys: true
					},
					sourceMap: true,
					sourceMapName: 'public/build/webapp.js.map'
				},
				files: {
					'public/build/webapp.js': ['public/build/webapp.js']
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
					'dev/js/base/Flatpickr.js',
					'dev/js/components/Ajax.js',
					'dev/js/components/RequesterAjax.js',
					'dev/js/components/RequesterFecth.js',
					'dev/js/components/Binder.js',
					'dev/js/components/Requester.js',
					'dev/js/components/Requirer.js',
					'dev/js/components/Router.js',
					'dev/js/components/StorageManager.js',
					'dev/js/components/RepositoryManager.js',
					'dev/js/components/Templater.js',
					'dev/js/components/TemplaterList.js',
					'dev/js/components/TemplaterWatcher.js',
					'dev/js/components/PubSub.js',
					'dev/js/components/Tracker.js',
					'dev/js/components/MessengerWindowManager.js',
					'dev/js/components/InputDate.js',
					'dev/js/components/GlobalContext.js',
					'dev/js/components/ServiceBaseManager.js',
					'dev/js/components/ServiceBaseAuth.js',
					'dev/js/components/ServiceBase.js',
					'dev/js/screens/_base/**/*.js',
					'dev/js/screens/_shared/**/*.js',
					'dev/js/screens/components/**/*.js',
					'dev/js/screens/**/*.js',
					'dev/js/bundle.js'
				],
				dest: 'public/build/webapp.js',
			}
		},
		watch: {
			bundle : {
				files : [
					'dev/js/base/Handlebars.4.0.5.js',
					'dev/js/base/findAndReplaceDOMText.js',
					'dev/js/base/Base.js',
					'dev/js/base/Flatpickr.js',
					'dev/js/components/Ajax.js',
					'dev/js/components/RequesterAjax.js',
					'dev/js/components/RequesterFecth.js',
					'dev/js/components/Binder.js',
					'dev/js/components/Requester.js',
					'dev/js/components/Requirer.js',
					'dev/js/components/Router.js',
					'dev/js/components/StorageManager.js',
					'dev/js/components/RepositoryManager.js',
					'dev/js/components/Templater.js',
					'dev/js/components/TemplaterList.js',
					'dev/js/components/TemplaterWatcher.js',
					'dev/js/components/PubSub.js',
					'dev/js/components/Tracker.js',
					'dev/js/components/MessengerWindowManager.js',
					'dev/js/components/InputDate.js',
					'dev/js/components/GlobalContext.js',
					'dev/js/components/ServiceBaseManager.js',
					'dev/js/components/ServiceBaseAuth.js',
					'dev/js/components/ServiceBase.js',
					'dev/js/screens/_base/**/*.js',
					'dev/js/screens/_shared/**/*.js',
					'dev/js/screens/components/**/*.js',
					'dev/js/screens/**/*.js',
					'dev/js/bundle.js'
				],
				tasks : ['concat:dev','fingerPrintWebapp'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['dev/**/*.styl'],
				tasks: ['stylus', 'cssmin','fingerPrintWebapp'],
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

	grunt.registerTask('default', ['stylus','cssmin','concat:dev','uglify:dist','fingerPrintWebapp']);
	grunt.registerTask('dev', ['stylus','cssmin','concat:dev','fingerPrintWebapp']);
	grunt.registerTask('wdev', ['watch']);
};
