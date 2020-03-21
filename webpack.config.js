const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const root = path.resolve(process.cwd()) + '/';
const minifyOptions = {
	removeComments: true,
	collapseWhitespace: true,
	minifyJS: true,
	minifyCSS: true,
	removeAttributeQuotes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	removeRedundantAttributes: true,
	useShortDoctype: true
};

let mode = process.env.NODE_ENV || 'development';
let publicPath = mode !== 'production' ? '/' : '/app/';
let appName = 'main';
let plugins = [
	new webpack.ProgressPlugin(),
	new VueLoaderPlugin(),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
		__APP_NAME__: JSON.stringify(appName)
	}),
	new MiniCssExtractPlugin({
		filename: 'assets/css/[name].css?v=[hash:8]'
	})
];

plugins.push(new HtmlWebpackPlugin({
	template: path.resolve(root, 'src/index.html'),
	inject: true,
	minify: minifyOptions
}));
plugins.push(new HtmlWebpackPlugin({
	template: path.resolve(root, 'src/50x.html'),
	filename: '50x.html',
	inject: false,
	minify: minifyOptions
}));
plugins.push(new CopyWebpackPlugin([{
	from: './src/assets',
	to: 'assets'
}]));

let config = {
	name: appName,
	mode,
	devServer: {
		/*https: true,
		key: fs.readFileSync('/path/to/server.key'),
		cert: fs.readFileSync('/path/to/server.crt'),
		ca: fs.readFileSync('/path/to/ca.pem'),*/
		historyApiFallback: true,
		hot: true,
		host: '0.0.0.0',
		port: 10000
	},
	entry: {
		[appName]: ['babel-polyfill', path.resolve(root, 'src/main.js'), path.resolve(root, 'src/style/index.scss')]
	},
	output: {
		publicPath,
		path: path.resolve(root, 'dist'),
		filename: 'assets/js/[name].min.js?v=[hash:8]'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: mode !== 'production'
						}
					},
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							prependData: '$baseUrl: "' + (mode === 'development' ? '/' : '/app/') + '";'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.vue', '.json', '.tsx', '.ts']
	},
	performance: {
		hints: false
	},
	plugins,
	devtool: 'cheap-module-source-map'
};

if (mode === 'production') {
	config.devtool = false;
	config.plugins.push(new CompressionPlugin());
	config.plugins.unshift(new CleanWebpackPlugin());
	config.plugins.push(new webpack.HashedModuleIdsPlugin());
	config.optimization = {
		minimize: true,
		minimizer: [new UglifyJsPlugin({
			parallel: true,
			sourceMap: true,
			extractComments: {
				condition(node, comment) {
					if (/@license|@preserve|@cc_on/i.test(comment.value)) {
						return true;
					}

					return comment.value.toLowerCase().includes('license') && /^\**!/i.test(comment.value);
				},
				filename(file) {
					return file.split('?')[0] + '.LICENSE';
				}
			},
			uglifyOptions: {
				warnings: false,
				compress: {
					drop_console: true
				}
			}
		})]
	};
}
else {
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;