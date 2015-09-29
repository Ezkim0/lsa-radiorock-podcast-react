var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();


/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.json({ message: 'hooray! welcome to our api!' });
});*/

router.get('/podcasts/all', function(req, res, next) {
  //res.json({ message: 'podcasts' });
 
  // get podcasts
  var Rrpodcasts = mongoose.model('Rrpodcasts');
  Rrpodcasts
    .find({})
    .sort({'created_at' : -1})
    .exec(function(err, posts) {
      if(err) {
        console.log(err);
        return;
      }
      res.json(posts);
    });

});    

module.exports = router;