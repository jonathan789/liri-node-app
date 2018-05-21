
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
// var Twitter = require('twitter');
var request = require("request");


var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});



// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);


var command = process.argv[2];
var value = process.argv[3];


switch(command){
  case "my-tweets":
  tweets(query);
  break;
  case "sts":
  spots();
  break;
  case "mt":
  movies();
  break;
  case "do-what-it-says":
  // myTweets(query);
  break;  
}


function spots() {

  if(process.argv[3]){

    spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
        
  
    console.log("The artist is: " + data.tracks.items[0].artists[0].name);
    console.log("The song name is: " + data.tracks.items[0].name); 
    console.log("The song name is: " + data.tracks.items[0].external_urls.spotify); 
    console.log("The album name is: " + data.tracks.items[0].album.name); 
    });  

  } else {

  spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
      

  console.log("The artist is: " + data.tracks.items[11].artists[0].name);
  console.log("The song name is: " + data.tracks.items[11].name); 
  console.log("The song name is: " + data.tracks.items[11].external_urls.spotify); 
  console.log("The album name is: " + data.tracks.items[11].album.name); 
   
  });
  }

}

var movieName ="";

function movies (){
  for (var i = 3; i < process.argv.length; i++) {
    if (i > 3 && i < process.argv.length) {
        movieName = movieName + "+" + process.argv[i];
    } else {
        movieName += process.argv[i];


    }
}
console.log(movieName);
}









