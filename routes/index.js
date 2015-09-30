var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Rrpodcasts = mongoose.model('Rrpodcasts');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.json({ message: 'hooray! welcome to our api!' });
});*/



router.get('/podcasts/all', function(req, res, next) {
  //res.json({ message: 'podcasts' });

  /*Rrpodcasts.paginate({}, {
    page: 2,
    limit: 10
  }, function (err, results, pageCount, itemCount) {
    console.log(results);
  });*/

  Rrpodcasts.list(req.query, function(err, items) {
    if (err) { return res.send(500); }
    res.json(items);
  });
  // get podcasts



  /*Rrpodcasts
    .find({})
    .sort({'created_at' : -1})
    .exec(function(err, posts) {
      if(err) {
        console.log(err);
        return;
      }
      res.json(posts);
    });*/

});

module.exports = router;