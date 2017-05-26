var path = require('path');

var root = path.resolve(__dirname);
var source = path.resolve(root, 'src');
var dist = path.resolve(root, 'dist');

var webpack = require('webpack');
var webpackAotPlugin = require('@ngtools/webpack');
var webpackExtractPlugin = require('extract-text-webpack-plugin');
var webpackHtmlPlugin = require('html-webpack-plugin');

var extractSass = new webpackExtractPlugin({
	filename: 'app.css'
});

var sassLoader = {
	loader: 'sass-loader',
	options: {
		includePaths: [
			path.resolve(source, 'sass')
		]
	}
};

module.exports = function (webpackEnvironment) {
	const isProduction = (!!webpackEnvironment && webpackEnvironment.production);

	var entryConfig = {
		'css': path.resolve(source, 'sass', '_app.scss'),
		'polyfills': path.resolve(source, 'main.polyfills.ts')
	};

	const moduleConfig = {
		exprContextCritical: false,

		loaders: [
			{
				test: /\.html$/gmi,
				loader: 'html-loader'
			},

			{
				test: /\.(css|scss)$/gmi,
				use: extractSass.extract({
					use: [
						'css-loader',
						sassLoader
					],

					fallback: 'style-loader'
				})
			}
		]
	}

	const pluginsConfig = [
		extractSass,

		new webpack.optimize.CommonsChunkPlugin({
			name: [
				'app',
				'vendor',
				'polyfills'
			]
		}),

		new webpackHtmlPlugin({
			hash: true,

			template: path.resolve(source, 'index.html')
		})
	];

	if (isProduction) {
		entryConfig.vendor = path.resolve(source, 'main.aot.vendor.ts');
		entryConfig.app = path.resolve(source, 'main.aot.ts');

		moduleConfig.loaders.push({
			test: /\.ts$/,
			loader: '@ngtools/webpack'
		});

		pluginsConfig.push(new webpackAotPlugin.AotPlugin({
			tsConfigPath: path.resolve(source, 'tsconfig.json'),
			entryModule: path.resolve(source, 'app', 'app.module#AppModule')
		}));

		pluginsConfig.push(new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			compress: {
				screw_ie8: true,
				warnings: false
			},
			mangle: {
				keep_fnames: true,
				screw_i8: true
			}
		}));
	} else {
		entryConfig.vendor = path.resolve(source, 'main.jit.vendor.ts');
		entryConfig.app = path.resolve(source, 'main.jit.ts');

		moduleConfig.loaders.push({
			test: /\.ts$/,
			loaders: [
				'ts-loader',
				'angular2-template-loader'
			]
		});
	}

	return {
		entry: entryConfig,
		module: moduleConfig,
		plugins: pluginsConfig,

		output: {
			filename: '[name].js',
			chunkFilename: '[id].chunk.js',
			path: dist
		},

		resolve: {
			extensions: [
				'.js',
				'.ts',
				'.scss'
			],

			modules: [
				source,
				'../node_modules'
			]
		},

		watchOptions: {
			ignored: /node_modules/
		}
	}
};
