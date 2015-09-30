var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var test = require('mongoose-paginate');
//var mongooseUtil = require('../utils/mongoose-util');
//var async = require('async');


// RSS JSON
  /*
  {
    "_id": "54f0375cacaddf03003c844d",
    "filename": "1425027532806.mp3",
    "date": "2015-02-27T09:22:36.631Z",
    "media": {
      "id": 1571556,
      "thumbnail": "http://d3ac2fc8l4ni8x.cloudfront.net/1425027894694.jpg",
      "filesize": 70186560,
      "title": "Korporaatio 27.2.2015 - Lusikassa",
      "description": "Lomalle lomps!\nRadio Rockin HeikelÃ¤ Korporaation Harri Moisio  kÃ¤vi lÃ¤pi omat lomatraumansa ennen lomalle lÃ¤htÃ¶Ã¤Ã¤n. LisÃ¤ksi esillÃ¤ olivat Carl Danhammer, Cheek, Falunin MM-hiihdot, gaalat ja vapaaottelustakin puhuttiin."
    }
  }
  */

var rrpodcastsSchema = new Schema({
  id: { type: String },
  filename: { type: String },
  date: { type: String },
  media: {
    id: { type: Number },
    thumbnail: { type: String },
    filesize: { type: Number },
    title: { type: String },
    description: { type: String }
  }
});

rrpodcastsSchema.plugin(test);


/**
 * Methods
 */

rrpodcastsSchema.methods = {

};

/**
 * Statics
 */

rrpodcastsSchema.statics = {
  list: function (query, cb) {
        
    /*this.paginate({}, {
      page: 1, limit: 10
    }, cb);*/

    console.log("sdfasdf");

    console.log(this.paginate);

    
    /*this
    .find({})
    .sort({'created_at' : -1})
    .exec(cb);*/

  }
};


var Rrpodcasts = mongoose.model('Rrpodcasts', rrpodcastsSchema);