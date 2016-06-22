module.exports = function(grunt){
	
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
		      'public/build/min.css': ['dev/styl/fontello/css/*.css','dev/grunt/styl.css']
		    }
		  }
		},
		uglify: {
			my_target: {
				options: {
					mangle: {toplevel: true},
					squeeze: {dead_code: false},
					codegen: {quote_keys: true},
					sourceMap: false,
					sourceMapName: 'public/build/min.js.map'
				},
				files: {
					'public/build/min.js': ['dev/js/**/*.js']
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['dev/js/**/*.js'],
				dest: 'public/build/concat.js',
			},
		},		
	});

	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['stylus','cssmin','uglify']);	
	grunt.registerTask('dev', ['stylus','cssmin','concat']);	
};