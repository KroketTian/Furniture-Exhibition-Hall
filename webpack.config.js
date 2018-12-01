const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const arg =  require('yargs').argv;
const devMode = arg.mode !== 'production';
const devServerMode = arg.ctype === 'webpackDevServer';

const webpackConfig = {
	optimization: {
		runtimeChunk: {
			name: 'manifest'
		},
		// minimizer: true,
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.(sc|sa|c)ss$/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	entry: {
        main: './src/app.jsx'
	},
	output: {
        path: path.resolve(__dirname, 'dist'),
        filename: devMode ? '[name].boundle.js' : '[hash].boundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						// 这部分的在.babelrc文件中
					}
				}
			},
			{
				test: /\.(sc|sa|c)ss$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]-[local]-[hash:base64:5]',
						}
					}
					// 'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: devMode ? 'img/[name].[ext]' : 'img/[hash].[ext]',
						// name: devMode ? '[path][name].[ext]' : '[path][name].[hash:7].[ext]',
						outputPath: 'assets/'
					}
				}]
			},
			// 字体图标的处理，这个暂时未解决，而且这个字体图标的svg类型跟图片的svg类型有冲突呀
			// {
			// 	test: /\.(eot|svg|ttf|woff)$/,
			// 	use: [{
			// 		loader: 'url-loader',
			// 		options: {
			// 			limit: 8192,
			// 			name: 'assets/iconfont/[name].[hash:7].[ext]'
			// 		}
			// 	}]
			// }
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		new HtmlWebpackPlugin({
			template: './src/404.html',
			filename: '404.html',
			chunks: ['404']
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? 'assets/css/[name].css' : 'assets/css/[name].[hash].css',
			chunkFilename: devMode ? 'assets/css/[id].css' : 'assets/css/[id].[hash].css'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 4000,
		overlay: true,
		compress: false,
		open: false,
		historyApiFallback: {
			rewrites: [
				{ from: /./, to: '/404.html' }
			]
		},
		inline: true
	}
};

!devServerMode ? webpackConfig.plugins.push(new CleanWebpackPlugin(['dist'])) : '';


module.exports = webpackConfig;