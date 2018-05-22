
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");


var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});




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



var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
  
        console.log("* Title: " + JSON.parse(body).Title);
        console.log("* Year: " + JSON.parse(body).Year);
        console.log("* IMDB: " + JSON.parse(body).imdbRating);
        console.log("* Country: " + JSON.parse(body).Country);
        console.log("* Language: " + JSON.parse(body).Language);
        console.log("* Plot: " + JSON.parse(body).Plot);
        console.log("* Actors: " + JSON.parse(body).Actors);
    }
});
}


var myTweets = function() {


	var client = new Twitter({
		consumer_key: twitterCredentials.consumer_key,
		consumer_secret: twitterCredentials.consumer_secret,
		access_token_key: twitterCredentials.access_token_key,
		access_token_secret: twitterCredentials.access_token_secret
	});

	var params = {
		screen_name: 'jonathanlaner',
		count: 20
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(error) { 
			console.log('Error: ' + error);
		} else { 
	  	console.log("My 20 Most Recent Tweets");
	  	console.log("");

	  	for(var i = 0; i < tweets.length; i++) {
	  		console.log("( #" + (i + 1) + " )  " + tweets[i].text);
	  		console.log("Created:  " + tweets[i].created_at);
	  		console.log("");
	  	}
	  }
	});
}




