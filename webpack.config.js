// Load the default @wordpress/scripts config object
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	// Spread the default WordPress Webpack config and extend it
	...defaultConfig,

	// Define your custom entry point
	entry: './src/index.js',

	// Customize the output
	output: {
		...defaultConfig.output,
		filename: 'main.js', // Output the JS file
		path: path.resolve(__dirname, 'build'),
		publicPath: '/', // Set for dev server
	},

	// Add or extend module rules
	module: {
		...defaultConfig.module,
		rules: [
			// Ensure CSS is processed correctly
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, // Extract CSS into separate file
					'css-loader', // Process CSS files
					'postcss-loader', // Use PostCSS (e.g., for Tailwind or Autoprefixer)
				],
			},
			{
				test: /\.(js|jsx)$/, // Transpile JS and JSX files
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', // Use Babel for JS/JSX transpilation
				},
			},
		],
	},

	// Path alias configuration for cleaner imports
	resolve: {
		...defaultConfig.resolve,
		extensions: ['.js', '.jsx'],
		alias: {
			'@components': path.resolve(__dirname, 'src/Components/'), // Custom alias for components
			'@screens': path.resolve(__dirname, 'src/Screens/'), // Custom alias for screens
			'@utils': path.resolve(__dirname, 'src/Utils/'), // Custom alias for utilities
			'@routes': path.resolve(__dirname, 'src/Routes/'), // Custom alias for utilities
			'@context': path.resolve(__dirname, 'src/Context/'),
		},
	},

	// Add plugins like MiniCssExtractPlugin for extracting CSS into separate files
	plugins: [
		...defaultConfig.plugins,
		new MiniCssExtractPlugin({
			filename: '[name].css', // Output CSS file
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(
				process.env.NODE_ENV || 'development'
			),
		}),
	],

	// Add devtool for easier debugging in development mode
	devtool:
		process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',

	// Add optimization for production mode
	optimization: {
		minimize: process.env.NODE_ENV === 'production', // Minimize JS in production mode
	},
};
