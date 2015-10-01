var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Rrpodcasts = mongoose.model('Rrpodcasts');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index');
});

router.get('/podcasts/all', function(req, res, next) {
  //res.json({ message: 'podcasts' });

  Rrpodcasts.list(req.query, function(err, items) {
    if (err) { return res.sendStatus(500); }
    res.json(items);
  });

});

module.exports = router;