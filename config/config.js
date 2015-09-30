var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
	development: {
		mongodb: require('./mongodbDev'),
		root: rootPath
	},

	release: {
		mongodb: require('./mongodb'),
		root: rootPath
	},

	test: {},
	production: {}
};