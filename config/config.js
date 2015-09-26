var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
	development: {
		mongodb: require('./mongodb'),
		root: rootPath,
		secret: '658383Y371P5e34',
		uploadDir: path.join(rootPath, 'uploads')
	},

	test: {},
	production: {}
};