<?php
/**
 * 
 * This file contains the implementation of the add function.
 *
 * @package header-footer-elementor
 */

return [
	'packages' => [
		'wordpress' => [
			'source' => 'https://github.com/WordPress/WordPress.git',
			'tags'   => [ 'v6.4.3' ],
			'output' => __DIR__ . '/stubs/wordpress',
		],
	],
];
