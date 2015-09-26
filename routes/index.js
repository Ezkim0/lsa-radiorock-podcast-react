var express = require('express'),
mongoose = require('mongoose');

var router = express.Router();


/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.json({ message: 'hooray! welcome to our api!' });
});*/

router.get('/podcasts', function(req, res, next) {
  res.json({ message: 'podcasts' });
  // get podcasts

});    

module.exports = router;