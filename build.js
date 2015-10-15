/**
 * Build
 * =====
 *
 *
 */

var path = require('path')
var fs = require('fs')

var webpack = require('webpack')

var env = {
	ROOT_DIRECTORY: path.resolve(__dirname),
	SOURCE_DIRECTORY: path.resolve(__dirname, 'src'),
	NODE_MODULES_DIRECTORY: path.resolve(__dirname, 'node_modules'),
	isProduction: (process.env.NODE_ENV === 'production') || process.argv.length > 2
}

var config = {
	target: 'node',
	devtool: 'inline-source-map', // 'eval'
	debug: true,
	entry: env.SOURCE_DIRECTORY + '/server.js',
  resolve: {
    extensions: ['', '.js', '.json']
  },
  output: {
		path: env.ROOT_DIRECTORY,
		filename: 'index.js'
  },
	node: {
		__dirname: true,
		__filename: true
	},
	// exclude node_modules
  externals: fs.readdirSync(env.NODE_MODULES_DIRECTORY).reduce(function (modules, mod) {
    if (['.bin'].indexOf(mod) === -1) { // non-binary module
      modules[mod] = 'commonjs ' + mod
    }
    return modules
  }, Object.create(null)),
	plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
		// add sourcemap support for nodejs
		new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })
	],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: env.SOURCE_DIRECTORY,
        loader: 'babel',
        query: {
					optional: ['runtime'],
					stage: 0
        }
      },
			{
        test: /\.json$/,
				include: env.SOURCE_DIRECTORY,
        loader: 'json'
      }
    ]
  }
}

if (!env.isProduction) {
  webpack(config).watch(100, notify)
} else {
  webpack(config).run(notify)
}

function notify (err, stats) {
  if (err) {
    return console.error(err)
  }
  console.log(new Date().toISOString(), ' - [sonarvio-server]', stats.toString())
}
