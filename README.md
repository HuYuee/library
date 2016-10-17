#webpack示例

**webpack+babel转换es6语法等webpack基本用法**

主要文件是webpack.config.js , 如下

```
var path = require('path')

var webpack = require('webpack')
//webpack自带的js压缩插件
var uglifyPlugin = webpack.optimize.UglifyJsPlugin

//用来区别开发模式和生产模式
var mode = require('yargs').argv.mode

var libraryName = 'sparrow'
var filename = ''
var plugins = []

//如果是生产模式的话，就进行压缩并且修改文件名称
if(mode === 'production'){
 	plugins.push(new uglifyPlugin({minimize: true}))
	filename = libraryName + '.min.js'
} else {
	filename = libraryName + '.js'
}
//webpack最核心配置
 var config = {
	//入口文件位置
	entry: path.resolve(__dirname, './src/index.js'),
	//出口文件位置
	output:{
		path: path.resolve(__dirname, './lib'),
		filename: filename,
		//配置umd文件
		library: filename,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	//产出map文件
	devtool: 'cheap-source-map',
	//配置忽视后缀名和简便路径
	resolve: {
		extension:['','.js','.css','.json'],
		root:path.resolve('./src')
	},
	module:{
		//加载器
		loaders : [
			//babel加载器
			{
				test : /\.js$/,
				loader: 'babel',
				exclude: 'node_modules'
			},
			//js代码检测
			{
				test : /\.js$/,
				loader: 'eslint',
				exclude: 'node_modules'
			}
		]
	},
	//配置插件
	plugins: plugins
}
module.exports = config
```
