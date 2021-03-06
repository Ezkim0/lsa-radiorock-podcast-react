/*!
 * Module dependencies.
 */
var fs = require('fs');
var http = require('http');
var mongoose = require('mongoose');
var Rrpodcasts;

/*!
 * Vars
 */
//var file = '/home/matti/public_html/projects/korporaatio/data.json';
//var outputFilename = '/home/matti/public_html/projects/korporaatio/data.json';

var posts = null;
var localData = null;

function Rrpodcastsfetch() {

}

Rrpodcastsfetch.prototype.start = function() {
  console.log("Start getting data!");
  setInterval(getData, 300000);
  //setInterval(getData, 3000);
  getData();
};

function getData() {
  console.log("================================");
  console.log("Checking new data from server...");
  getNewPosts();
}

function getNewPosts() {

  var options = {
    host: 'www.radiorock.fi',
    path: '/api/content?tagCategory=ohjelma&tagName=Korporaatio&page=0',
    json: true
  };

  var request = http.request(options, function(res) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      /*
      console.log("\n");
      console.log(" ##########################");
      console.log(" ## Remote data fetched! ##");
      console.log(" ##########################");
      */
      data = JSON.parse(data);

      if (!data) {
        return;
      }

      // Server posts
      if (data.hasOwnProperty('posts')) {
        posts = data.posts;
      } else {
        console.log("Data has no posts!");
      }

      getLocalPosts();
    });
  });

  request.on('error', function(e) {
    console.log("\n");
    console.log(" ############");
    console.log(e.message);
    console.log(" ############");
  });
  request.end();
}

function getLocalPosts() {

  // Check posts from mongodb
  Rrpodcasts = mongoose.model('Rrpodcasts');

  Rrpodcasts
    .find()
    .sort({
      _id: -1
    })
    .limit(5)
    .exec(function(err, posts) {
      if (err) {
        console.log(err);
        return;
      }
      checkPossibleNewPosts(posts);
    });
}

function checkPossibleNewPosts(data) {
  var databasePodcasts = data;

  var newPosts = [];
  var isNewPost = true;
  var possibleNewPost;
  var addedNewPost = false;
  for (var j = 0; j <= posts.length - 1; j++) {
    possibleNewPost = posts[j];
    isNewPost = true;

    for (var i = 0; i <= databasePodcasts.length - 1; i++) {
      var savedPost = databasePodcasts[i];
      if (savedPost.id === possibleNewPost._id) {
        isNewPost = false;
      }
    }

    //isNewPost = true;
    if (isNewPost) {
      //Save item
      if (possibleNewPost.hasOwnProperty('files')) {
        var fileName = possibleNewPost.files[0];
        if (fileName) {
          var extension = fileName.split('.').pop();
          if (extension === 'mp3') {
            addedNewPost = true;
            saveContent(fileName, possibleNewPost);
          }
        }
      }
    }
  }

  if (!addedNewPost) {
    console.log("No new data added!");
    console.log("================================\n");
  }
  
}

function saveContent(fileName, possibleNewPost) {

  var podcast = new Rrpodcasts({
    id: possibleNewPost._id,
    filename: fileName,
    date: possibleNewPost.created_at,
    media: {
      id: possibleNewPost.media.id,
      thumbnail: possibleNewPost.media.thumbnail,
      filesize: possibleNewPost.media.filesize,
      title: possibleNewPost.media.title,
      description: possibleNewPost.media.description
    }
  });

  podcast.save(function(err, podcast) {
    if (err) return console.error(err);
    console.log("=====================");
    console.log("ID: " + podcast.id);
    console.log("Title: " + podcast.media.title);
    console.log("Description: " + podcast.media.description);
    console.log("New data saved!");
  });
}

var rrpodcastsfetch = module.exports = new Rrpodcastsfetch();