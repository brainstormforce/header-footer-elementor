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
    extensions: ['.js', '.jsx'],
    alias: {
			...defaultConfig.resolve.alias,
			'@Admin': path.resolve( __dirname, './src/' ),
			'@Utils': path.resolve( __dirname, './src/utils/' ),
			'@Fields': path.resolve(
				__dirname,
				'./src/fields/'
			),
			'@Skeleton': path.resolve(
				__dirname,
				'./src/common/skeleton/'
			),
			'@SettingsComponents': path.resolve(
				__dirname,
				'./src/common/settings-components/'
			),
			'@CTA': path.resolve(
				__dirname,
				'./src/common/cta/'
			),
			'@SlideOver': path.resolve(
				__dirname,
				'./src/flow-editor/slide-over/'
			),
			'@Alert': path.resolve(
				__dirname,
				'./src/common/confirm-popup/'
			),
			'@SettingsApp': path.resolve(
				__dirname,
				'./src/settings-app/'
			),
			'@Editor': path.resolve(
				__dirname,
				'./src/editor-app/'
			),
			'@FlowEditor': path.resolve(
				__dirname,
				'./src/flow-editor/'
			),
			'@Components': path.resolve(
				__dirname,
				'./src/edit-components/'
			),
			'@StepEditor': path.resolve(
				__dirname,
				'./src/step-editor/'
			),
			'@StepComponents': path.resolve(
				__dirname,
				'./src/edit-step-components/'
			),
			'@Images': path.resolve( __dirname, 'admin-core/assets/images/' ),
			'@Icons': path.resolve( __dirname, 'admin-core/assets/icons/' ),
		},
  },
};
