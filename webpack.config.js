var path = require('path')
var webpack = require('webpack')
var mode = require('yargs').argv.mode
var uglifyPlugin = webpack.optimize.UglifyJsPlugin
var libraryName = 'sparrow'
var filename = ''
var plugins = []

if(mode === 'production'){
	plugins.push(new uglifyPlugin({minimize: true}))
	filename = libraryName + '.min.js'
} else {
	filename = libraryName + '.js'
}

console.log(mode)


var config = {
	entry: path.resolve(__dirname, './src/index.js'),
	output:{
		path: path.resolve(__dirname, './lib'),
		filename: filename,
		library: filename,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	devtool: 'cheap-source-map',
	resolve: {
		extension:['','.js','.css','.json'],
		root:path.resolve('./src')
	},
	module:{
		loaders : [
			{
				test : /\.js$/,
				loader: 'babel',
				exclude: 'node_modules'
			},
			{
				test : /\.js$/,
				loader: 'eslint',
				exclude: 'node_modules'
			}
		]
	},
	plugins: plugins
}
module.exports = config
