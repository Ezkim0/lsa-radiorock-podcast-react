var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Rrpodcasts = mongoose.model('Rrpodcasts');

var JSX = require('node-jsx').install({
	extension: '.jsx'
});
var React = require('react');
var ReactAppTest = React.createFactory(require('../client/js/ReactAppTest.jsx'));


/* GET home page. */
router.get('/', function(req, res, next) {
	//res.render('index');

	// get data
	Rrpodcasts.list(req.query, function(err, items) {
		if (err) {
			return res.sendStatus(500);
		}

		var markup = React.renderToString(
			ReactAppTest({
				name: "testi",
				items: items
			})
		);

		// render index page 
		res.render('index', {
			title: 'RR-podcasts',
			markup: markup
		});

	});



});

module.exports = router;