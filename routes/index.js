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
	


	var markup = React.renderToString (
      ReactAppTest({
        testData: {name:"testi"}
      })
    );   


	// render index page 
	res.render('index', {
		title: 'TEST',
		markup: markup
	});

});

module.exports = router;