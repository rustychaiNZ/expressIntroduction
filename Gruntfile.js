module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Uglify js
		uglify: {
			build: {
				src: 'public/js/script.js',
				dest: 'public/js/script.min.js'
			}
		},
		// Ugly css min
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'public/css/',
					src: ['*.css', '!*.min.css'],
					dest: 'public/css/',
					ext: '.min.css'
				}]
			}
		},
		// Watch
		watch: {
			all: {
				files: ['public/sass/stylesheet.scss', 'public/css/stylesheet.css', 'public/js/script.js'],
				tasks: ['sass', 'csslint', 'jshint', 'cssmin', 'uglify']
			}
		},
		// Sass
		sass: {                              // Task
    		dist: {                            // Target
    			options: {                       // Target options
    				style: 'expanded'
    			},
    			files: {                         // Dictionary of files
    				'public/css/stylesheet.css' : 'public/sass/stylesheet.scss'    // 'destination' : 'source'
    			}
    		}
    	},
		// Controls css lint 
		csslint: {
			lax: {
			  	options: {
			  		import: false,
			  		'order-alphabetical' : false
			  	},
			  	src: ['public/css/*.css', '!*.min.css']
			},
		},
		// Js Hint
		jshint: {
			files: ['!Gruntfile.js', 'public/js/script.js', '!script.min.js'],
			options: {
            // options here to override JSHint defaults
            	globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
            	},
			laxcomma: true,
			esversion : 6
			}	
		}
	// Html Validator
	});

	// Loading grunt tasks
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-html-validation');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	

	// Register grunt tasks
	grunt.registerTask('ugly', ['uglify']);
	// grunt.registerTask('default', ['validation']);
	grunt.registerTask('default', ['watch']);
};