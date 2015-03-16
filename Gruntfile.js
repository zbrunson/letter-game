'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: {
				src: [
					'app/scripts/**/*.js'
				]
			}
		},

		connect: {
			options: {
				port: 9000
			},
			server: {
				options: {
					middleware: function(connect) {
						return [
							connect().use('/bower_components', connect.static('bower_components')),
							connect.static('app')
						];
					}
				}
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'connect:server:keepalive']);
};

