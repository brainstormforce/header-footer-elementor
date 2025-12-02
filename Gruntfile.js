module.exports = function( grunt ) {
	'use strict';
	const banner = '/**\n * <%= pkg.homepage %>\n * Copyright (c) <%= grunt.template.today("yyyy") %>\n * This file is generated automatically. Do not edit.\n */\n';
	// Project configuration
	grunt.initConfig( {

		pkg: grunt.file.readJSON( 'package.json' ),

		copy: {
			main: {
				options: {
					mode: true,
				},
				src: [
					'**',
					'!node_modules/**',
					'!.git/**',
					'!*.sh',
					'!*.zip',
					'!eslintrc.json',
					'!README.md',
					'!Gruntfile.js',
					'!package.json',
					'!package-lock.json',
					'!.gitignore',
					'!*.zip',
					'!Optimization.txt',
					'!composer.json',
					'!composer.lock',
					'!phpcs.xml.dist',
					'!vendor/**',
					'!src/**',
					'!scripts/**',
					'!config/**',
					'!admin/bsf-analytics/package.json', //Exclude BSF Analytics package.json and package-lock.json
					'!admin/bsf-analytics/package-lock.json',
					'!admin/bsf-analytics/composer.json',
					'!admin/bsf-analytics/composer.lock',
					'!webpack.config.js',
					'!tailwind.config.js',
					'!postcss.config.js',
					'!jsconfig.json',
					'!tests/**',
					'!bin/**',
					'!phpstan.neon',
					'!phpstan-baseline.neon',
					'!phpunit.xml.dist',
					'!phpunit.xml.dist',
					'!stubs-generator.php',
				],
				dest: 'header-footer-elementor/',
			},
		},

		compress: {
			main: {
				options: {
					archive: 'header-footer-elementor-<%= pkg.version %>.zip',
					mode: 'zip',
				},
				files: [
					{
						src: [
							'./header-footer-elementor/**',
						],

					},
				],
			},
		},

		clean: {
			main: [ 'header-footer-elementor' ],
			zip: [ '*.zip' ],
		},

		addtextdomain: {
			options: {
				textdomain: 'header-footer-elementor',
			},
			target: {
				files: {
					src: [ '*.php', '**/*.php', '!node_modules/**', '!php-tests/**', '!bin/**' ],
				},
			},
		},

		wp_readme_to_markdown: {
			your_target: {
				files: {
					'README.md': 'readme.txt',
				},
			},
		},

		makepot: {
			target: {
				options: {
					domainPath: '/languages',
					mainFile: 'header-footer-elementor.php',
					potFilename: 'header-footer-elementor.pot',
					potHeaders: {
						poedit: true,
						'x-poedit-keywordslist': true,
					},
					type: 'wp-plugin',
					updateTimestamp: true,
				},
			},
		},

		bumpup: {
			options: {
				updateProps: {
					pkg: 'package.json',
				},
			},
			file: 'package.json',
		},

		replace: {
			plugin_readme: {
				src: [ 'readme.txt' ],
				overwrite: true,
				replacements: [
					{
						from: /Stable tag:\ ((?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*)(?:\.(?:[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*))*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?)/g,
						to: 'Stable tag: <%= pkg.version %>',
					},
				],
			},

			plugin_main: {
				src: [ 'header-footer-elementor.php' ],
				overwrite: true,
				replacements: [
					{
						from: /Version:[\t\s]+((?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*)(?:\.(?:[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*))*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?)/g,
						to: 'Version: <%= pkg.version %>',
					},
				],
			},

			plugin_const: {
				src: [ 'header-footer-elementor.php' ],
				overwrite: true,
				replacements: [
					{
						from: /HFE_VER', '.*?'/g,
						to: 'HFE_VER\', \'<%= pkg.version %>\'',
					},
				],
			},

			plugin_function_comment: {
				src: [
					'*.php',
					'**/*.php',
					'!node_modules/**',
					'!php-tests/**',
					'!bin/**',
					'!admin/bsf-core/**',
				],
				overwrite: true,
				replacements: [
					{
						from: 'x.x.x',
						to: '<%=pkg.version %>',
					},
				],
			},
		},

	} );

	grunt.loadNpmTasks( 'grunt-wp-i18n' );
	grunt.loadNpmTasks( 'grunt-wp-readme-to-markdown' );
	grunt.loadNpmTasks( 'grunt-bumpup' );
	grunt.loadNpmTasks( 'grunt-text-replace' );

	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );

	grunt.registerTask( 'i18n', [ 'addtextdomain', 'makepot' ] );
	grunt.registerTask( 'readme', [ 'wp_readme_to_markdown' ] );
	grunt.registerTask( 'release', [ 'clean:zip', 'copy', 'compress', 'clean:main' ] );

	grunt.registerTask( 'default', [ 'clean:zip', 'copy', 'compress', 'clean:main' ] );

	// Bump Version - `grunt version-bump --ver=<version-number>`
	grunt.registerTask( 'version-bump', function( ver ) {
		let newVersion = grunt.option( 'ver' );

		if ( newVersion ) {
			newVersion = newVersion ? newVersion : 'patch';

			grunt.task.run( 'bumpup:' + newVersion );
			grunt.task.run( 'replace' );
		}
	} );

	grunt.util.linefeed = '\n';
};
