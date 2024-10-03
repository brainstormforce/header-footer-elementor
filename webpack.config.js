const path = require('path');

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
  entry: {
		// index: './assets/src/index.js',
		// "main-settings": path.resolve(__dirname, "./src/MainSettings.js"),
		'settings-app': path.resolve(
			__dirname,
			'./src/SettingsApp.js'
		)
	},
  output: {
    path: path.resolve(__dirname, 'dist'),  // Ensure this is correct
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
		...defaultConfig.resolve,
    extensions: ['.js', '.jsx'],
    alias: {
			'@SettingsApp': path.resolve( __dirname, './src/settings-app/' ),
			'@components': path.resolve( __dirname, './src/Components/' ), // Custom alias for components
		},
  },
};
