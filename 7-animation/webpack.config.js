
const path = require('path');

module.exports = {
	entry: [
		'./src/sample.jsx',
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	devtool: "inline-source-map",
	resolve: {
		extensions: [
			".js",
			".jsx"
		],
		modules: [
			path.resolve('./src'),
			path.resolve('./node_modules')
		]
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				use:{
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						],
						plugins: [
							[
								"@babel/plugin-transform-react-jsx",
								{
									"pragma": "m"
								}
							]
						]
					}
				}
			}
		]
	}
}
