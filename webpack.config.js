const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const autoprefixer = require('autoprefixer');
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

let appName = 'main';
let plugins = [
	new webpack.ProgressPlugin(),
	new VueLoaderPlugin(),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
		__APP_NAME__: JSON.stringify(appName)
	}),
	new MiniCssExtractPlugin({
		filename: 'css/[name].css'
	})
];

plugins.push(new HtmlWebpackPlugin({
	template: path.resolve(root, 'src/client/index.html'),
	inject: true,
	minify: minifyOptions
}));
plugins.push(new HtmlWebpackPlugin({
	template: path.resolve(root, 'src/client/50x.html'),
	filename: '50x.html',
	inject: false,
	minify: minifyOptions
}));
plugins.push(new CopyWebpackPlugin([{
	from: './src/client/assets',
	to: 'assets'
}]));

plugins.push(new CompressionPlugin());

let config = {
	name: appName,
	mode: 'development',
	devServer: {
		/*https: true,
		key: fs.readFileSync('/path/to/server.key'),
		cert: fs.readFileSync('/path/to/server.crt'),
		ca: fs.readFileSync('/path/to/ca.pem'),*/
		hot: true,
		host: '0.0.0.0',
		port: 10000
	},
	entry: {
		[appName]: ['babel-polyfill', path.resolve(root, 'src/client/main.js'), path.resolve(root, 'src/client/style/index.scss')]
	},
	output: {
		publicPath: '/',
		path: path.resolve(root, 'dist/client'),
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
							hmr: process.env.NODE_ENV === 'development'
						}
					},
					'css-loader',
					'sass-loader'
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

if (process.env.NODE_ENV === 'production') {
	config.devtool = false;
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
	config.entry[appName].unshift('webpack-hot-middleware/client?reload=true');
}

module.exports = config;