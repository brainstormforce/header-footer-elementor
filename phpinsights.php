<?php
/**
 * This file is part of the Header Footer Elementor plugin.
 * 
 * @package HeaderFooterElementor
 * @file /phpinsights.php
 */

declare(strict_types=1); // phpcs:ignore

return [

	/*
	|--------------------------------------------------------------------------
	| Default Preset
	|--------------------------------------------------------------------------
	|
	| This option controls the default preset that will be used by PHP Insights
	| to make your code reliable, simple, and clean. However, you can always
	| adjust the `Metrics` and `Insights` below in this configuration file.
	|
	| Supported: "default", "laravel", "symfony", "magento2", "drupal", "wordpress"
	|
	*/

	'preset'       => 'wordpress',

	/*
	|--------------------------------------------------------------------------
	| IDE
	|--------------------------------------------------------------------------
	|
	| This options allow to add hyperlinks in your terminal to quickly open
	| files in your favorite IDE while browsing your PhpInsights report.
	|
	| Supported: "textmate", "macvim", "emacs", "sublime", "phpstorm",
	| "atom", "vscode".
	|
	| If you have another IDE that is not in this list but which provide an
	| url-handler, you could fill this config with a pattern like this:
	|
	| myide://open?url=file://%f&line=%l
	|
	*/

	'ide'          => 'vscode',

	/*
	|--------------------------------------------------------------------------
	| Configuration
	|--------------------------------------------------------------------------
	|
	| Here you may adjust all the various `Insights` that will be used by PHP
	| Insights. You can either add, remove or configure `Insights`. Keep in
	| mind, that all added `Insights` must belong to a specific `Metric`.
	|
	*/

	'exclude'      => [
		'assets/*',
		'phpinsights.php',
	],

	'add'          => [
		// You can add custom insights here if needed.
	],

	'remove'       => [
		/**
		 * Globals accesses detected
		 * ToDo: Remove this rule after fixing the issue
		 */
		'NunoMaduro\PhpInsights\Domain\Insights\ForbiddenGlobals',

		/**
		 * Global keyword
		 * ToDo: Remove this rule after fixing the issue
		 */
		'PHP_CodeSniffer\Standards\Squiz\Sniffs\PHP\GlobalKeywordSniff',

		/**
		 * Defining global helpers is prohibited
		 * ToDo: Remove this rule after fixing the issue
		 */
		'NunoMaduro\PhpInsights\Domain\Insights\ForbiddenDefineFunctions',

		/**
		 * Return, Property, Parameter type hint
		 */
		'SlevomatCodingStandard\Sniffs\TypeHints\ReturnTypeHintSniff',
		'SlevomatCodingStandard\Sniffs\TypeHints\PropertyTypeHintSniff',
		'SlevomatCodingStandard\Sniffs\TypeHints\ParameterTypeHintSniff',

		/**
		 * Disallow mixed type hint
		 */
		'SlevomatCodingStandard\Sniffs\TypeHints\DisallowMixedTypeHintSniff',

		/**
		 * Disallow empty
		 */
		'SlevomatCodingStandard\Sniffs\ControlStructures\DisallowEmptySniff',

		/**
		 * Forbidden public property
		 */
		'SlevomatCodingStandard\Sniffs\Classes\ForbiddenPublicPropertySniff',

		/**
		 * Having `classes` with more than 5 cyclomatic complexity is prohibited - Consider refactoring.
		 */
		'NunoMaduro\PhpInsights\Domain\Insights\CyclomaticComplexityIsHigh',

		/**
		 * Function length
		 */
		'SlevomatCodingStandard\Sniffs\Functions\FunctionLengthSniff',

		/**
		 * Valid class name, not in PascalCase format.
		 */
		'PHP_CodeSniffer\Standards\Squiz\Sniffs\Classes\ValidClassNameSniff',

		/**
		 * No spaces around offset.
		 */
		'PhpCsFixer\Fixer\Whitespace\NoSpacesAroundOffsetFixer',

		/**
		 * Side effects.
		 */
		'PHP_CodeSniffer\Standards\PSR1\Sniffs\Files\SideEffectsSniff',

		/**
		 * Arbitrary parentheses spacing
		 */
		'PHP_CodeSniffer\Standards\Generic\Sniffs\WhiteSpace\ArbitraryParenthesesSpacingSniff',

		/**
		 * Character before PHP opening tag
		 */
		'PHP_CodeSniffer\Standards\Generic\Sniffs\PHP\CharacterBeforePHPOpeningTagSniff',

		/**
		 * Disallow tab indent
		 */
		'PHP_CodeSniffer\Standards\Generic\Sniffs\WhiteSpace\DisallowTabIndentSniff',

		/**
		 * Line length
		 */
		'PHP_CodeSniffer\Standards\Generic\Sniffs\Files\LineLengthSniff',

		/**
		 * Binary operator spaces.
		 */
		'PhpCsFixer\Fixer\Operator\BinaryOperatorSpacesFixer',

		/**
		 * No spaces inside parenthesis
		 */
		'PhpCsFixer\Fixer\Whitespace\NoSpacesInsideParenthesisFixer',

		/**
		 * No spaces after function name
		 */
		'PhpCsFixer\Fixer\FunctionNotation\FunctionDeclarationFixer',

		/**
		 * Class definition
		 */
		'PhpCsFixer\Fixer\ClassNotation\ClassDefinitionFixer',

		/**
		 * Method argument space
		 */
		'PhpCsFixer\Fixer\FunctionNotation\MethodArgumentSpaceFixer',

		/**
		 * Braces fixer
		 */
		'PhpCsFixer\Fixer\Basic\BracesFixer',

		/**
		 * Declare strict types.
		 */
		'SlevomatCodingStandard\Sniffs\TypeHints\DeclareStrictTypesSniff',

		/**
		 * DOC comment spacing
		 */
		'SlevomatCodingStandard\Sniffs\Commenting\DocCommentSpacingSniff',

		/**
		 * Camel caps method name
		 */
		'PHP_CodeSniffer\Standards\PSR1\Sniffs\Methods\CamelCapsMethodNameSniff',

		/**
		 * Normal classes are forbidden. Classes must be final or abstract
		 * Todo: Remove this rule after fixing the issue
		 */
		'NunoMaduro\PhpInsights\Domain\Insights\ForbiddenNormalClasses',

		/**
		 * Magic class constant not available in PHP 5.4 or earlier
		 */
		'PHPCompatibility\Sniffs\Constants\NewMagicClassConstantSniff',

		/**
		 * Strict_types directive not available in PHP 5.6 or earlier
		 */
		'PHPCompatibility\Sniffs\ControlStructures\NewExecutionDirectivesSniff',
		
		/**
		 * Disallow Yoda conditions
		 */
		'PHP_CodeSniffer\Standards\Generic\Sniffs\ControlStructures\DisallowYodaConditionsSniff',
		
	],

	'config'       => [],

	/*
	|--------------------------------------------------------------------------
	| Requirements
	|--------------------------------------------------------------------------
	|
	| Here you may define a level you want to reach per `Insights` category.
	| When a score is lower than the minimum level defined, then an error
	| code will be returned. This is optional and individually defined.
	|
	*/

	'requirements' => [
		'min-quality'            => 95,
		'min-complexity'         => 0,
		'min-architecture'       => 84,
		'min-style'              => 98,
		'disable-security-check' => false,
	],

	/*
	|--------------------------------------------------------------------------
	| Threads
	|--------------------------------------------------------------------------
	|
	| Here you may adjust how many threads (core) PHPInsights can use to perform
	| the analysis. This is optional, don't provide it and the tool will guess
	| the max core number available. It accepts null value or integer > 0.
	|
	*/

	'threads'      => null,

	/*
	|--------------------------------------------------------------------------
	| Timeout
	|--------------------------------------------------------------------------
	| Here you may adjust the timeout (in seconds) for PHPInsights to run before
	| a ProcessTimedOutException is thrown.
	| This accepts an int > 0. Default is 60 seconds, which is the default value
	| of Symfony's setTimeout function.
	|
	*/

	'timeout'      => 60,
];
