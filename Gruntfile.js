module.exports = function(grunt) {

	grunt.initConfig({
		stylus: {
			compile: {
				options: {
					paths: ['styl'],
					import: ['_vars']
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
						toplevel: true
					},
					squeeze: {
						dead_code: false
					},
					codegen: {
						quote_keys: true
					},
					sourceMap: false,
					sourceMapName: 'public/build/min.js.map'
				},
				files: {
					'public/build/min.js': ['dev/js/**/*.js']
				}
			},
			bundle: {
				files: {
					'public/build/scripts/bundle.js': [
						'dev/js/base/fastdom.min.js',
						'dev/js/base/Handlebars.4.0.5.js',
						'dev/js/base/findAndReplaceDOMText.js',
						'dev/js/base/Base.js',
						'dev/js/components/Ajax.js',
						'dev/js/components/Binder.js',
						'dev/js/components/Requester.js',
						'dev/js/components/Requirer.js',
						'dev/js/components/Templater.js',
						'dev/js/components/TemplaterList.js',
						'dev/js/bundle.js'
					]
				}
			},
			dist: {
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
					sourceMap: false
				},
				files: grunt.file.expandMapping([
					'dev/js/**/*.js',
					'!dev/js/base/fasdom.min.js',
					'!dev/js/base/Handlebars.4.0.5.js',
					'!dev/js/base/findAndReplaceDOMText.js',
					'!dev/js/base/Base.js',
					'!dev/js/components/Ajax.js',
					'!dev/js/components/Binder.js',
					'!dev/js/components/Requester.js',
					'!dev/js/components/Requirer.js',
					'!dev/js/components/Templater.js',
					'!dev/js/components/TemplaterList.js',
					'!dev/js/bundle.js'
				], 'public/build/scripts/', {
					rename: function(destBase, destPath) {

						var filename = destPath.split('/');
						filename = filename[filename.length - 1];

						return destBase + filename;
					}
				})
			},
			prod: {
				options: {
					mangle: {
						toplevel: false
					},
					squeeze: {
						dead_code: true
					},
					codegen: {
						quote_keys: false
					},
					sourceMap: false
				},
				files: {
					'dist/templater.min.js' :'dist/templater.js'
				}
			}
		},
		copy: {
		  main: {
		    files: [
		      {expand: true, flatten : true , src: [
					'dev/js/**/*.js',
					'!dev/js/base/fastdom.min.js',
					'!dev/js/base/Handlebars.4.0.5.js',
					'!dev/js/base/findAndReplaceDOMText.js',
					'!dev/js/base/Base.js',
					'!dev/js/components/Ajax.js',
					'!dev/js/components/Binder.js',
					'!dev/js/components/Requester.js',
					'!dev/js/components/Requirer.js',
					'!dev/js/components/Templater.js',
					'!dev/js/components/TemplaterList.js',
					'dev/js/bundle.js' ], dest: 'public/build/scripts/', filter: 'isFile'}
		    ],
		  },
		},
		compress: {
			main: {
				options: {
					mode: 'gzip'
				},
				files: grunt.file.expandMapping([
					'public/build/scripts/bundle.js',
					'public/build/scripts/**/*js'
				], 'public/build/gzip/', {
					rename: function(destBase, destPath) {

						var filename = destPath.split('/');
						filename = filename[filename.length - 1];

						return destBase + filename;
					}
				})
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dev: {
				src: [
					'dev/js/base/fastdom.min.js',
					'dev/js/base/Handlebars.4.0.5.js',
					'dev/js/base/findAndReplaceDOMText.js',
					'dev/js/base/Base.js',
					'dev/js/components/Ajax.js',
					'dev/js/components/Binder.js',
					'dev/js/components/Requester.js',
					'dev/js/components/Requirer.js',
					'dev/js/components/Templater.js',
					'dev/js/components/TemplaterList.js',
					'dev/js/bundle.js'
				],
				dest: 'public/build/bundle.js',
			},
			prod: {
				src: [
					'dev/js/base/Handlebars.4.0.5.js',
					'dev/js/base/findAndReplaceDOMText.js',
					'dev/js/base/Base.js',
					'dev/js/components/Ajax.js',
					'dev/js/components/Binder.js',
					'dev/js/components/Requester.js',
					'dev/js/components/Requirer.js',
					'dev/js/components/Templater.js',
					'dev/js/components/TemplaterList.js'
				],
				dest: 'dist/templater.js',
			}
		},
		watch: {
			bundle : {
				files : ['dev/js/base/fastdom.min.js',
						'dev/js/base/Handlebars.4.0.5.js',
						'dev/js/base/findAndReplaceDOMText.js',
						'dev/js/base/Base.js',
						'dev/js/components/Ajax.js',
						'dev/js/components/Binder.js',
						'dev/js/components/Requester.js',
						'dev/js/components/Requirer.js',
						'dev/js/components/Templater.js',
						'dev/js/components/TemplaterList.js',
						'dev/js/bundle.js'],
				tasks : ['concat:dev'],
				options: {
					spawn: false,
				}
			},
			scripts: {
				files : [
					'dev/js/**/*.js',
					'!dev/js/base/fastdom.min.js',
					'!dev/js/base/Handlebars.4.0.5.js',
					'!dev/js/base/findAndReplaceDOMText.js',
					'!dev/js/base/Base.js',
					'!dev/js/components/Ajax.js',
					'!dev/js/components/Binder.js',
					'!dev/js/components/Requester.js',
					'!dev/js/components/Requirer.js',
					'!dev/js/components/Templater.js',
					'!dev/js/components/TemplaterList.js',
					'!dev/js/bundle.js'],
				tasks: ['copy:main'],
				options: {
					spawn: false,
				}
			},
			compress : {
				files : [
					'public/build/scripts/bundle.js',
					'public/build/scripts/**/*js'
				],
				tasks: ['compress:main'],
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

	grunt.registerTask('default', ['stylus', 'cssmin', 'uglify:bundle', 'uglify:dist', 'compress']);
	grunt.registerTask('dev', ['stylus', 'cssmin', 'concat:dev','copy:main','compress:main']);
	grunt.registerTask('wdev', ['watch']);
	grunt.registerTask('prod', ['concat:prod','uglify:prod']);
};