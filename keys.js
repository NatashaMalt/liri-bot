
	var fs = require("fs"); 
	var request = require("request");
	var keys = require("./keys.js");
	var twitter = require("twitter");
	var spotify = require ("spotify");
	var liriArgument = process.argv[2];

	switch(liriArgument) {
		case "my-tweets": myTweets(); break;
		case "spotify-this-song": spotifyThisSong(); break;
		case "movie-this": movieThis(); break;
		case "do-what-it-says": doWhatItSays(); break;

		default: console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
			"1. my-tweets 'any twitter name' " +"\r\n"+
			"2. spotify-this-song 'any song name' "+"\r\n"+
			"3. movie-this 'any movie name' "+"\r\n"+
			"4. do-what-it-says."+"\r\n"+
			"Be sure to put the movie or song name in quotation marks if it's more than one word.");
	};

	function movieThis(){
		var movie = process.argv[3];
		if(!movie){
			movie = "bambi";
		}
		params = movie
		request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
			if (!error response.statusCode == 200) {
				var movieObject = JSON.parse(body);
				
				var movieResults =
				"------------------------------ begin ------------------------------" + "\r\n"
				"Title: " + movieObject.Title+"\r\n"+
				"Year: " + movieObject.Year+"\r\n"+
				"Imdb Rating: " + movieObject.imdbRating+"\r\n"+
				"Country: " + movieObject.Country+"\r\n"+
				"Language: " + movieObject.Language+"\r\n"+
				"Plot: " + movieObject.Plot+"\r\n"+
				"Actors: " + movieObject.Actors+"\r\n"+
				"Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
				"Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" + 
				"------------------------------ fin ------------------------------" + "\r\n";
				console.log(movieResults);
				log(movieResults); 
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
	};
	
	function myTweets() {
		var client = new twitter({
			consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret: keys.twitterKeys.consumer_secret,
			access_token_key: keys.twitterKeys.access_token_key,
			access_token_secret: keys.twitterKeys.access_token_secret, 
		});
		var twitterUsername = process.argv[3];
		if(twitterUsername){
			twitterUsername = "Natasha V.E.L Malt";
		}
		params = {screen_name: twitterUsername};
		client.get("status/user_timeline/", params, function(error, data, response){
			if (!error) {
				for(var i = 0; i < data.length; i++) {
					
					var twitterResults = 
					"@" + data[i].user.screen_name + ": " + 
					data[i].text + "\r\n" + 
					data[i].created_at + "\r\n" + 
					"------------------------------ " + i + " ------------------------------" + "\r\n";
					console.log(twitterResults);
					log(twitterResults); 
				}
			}  else {
				console.log("Error :"+ error);
				return;
			}
		});
	}
	
	function spotifyThisSong(songName) {
		var songName = process.argv[3];
		if(!songName){
			songName = "Bendik og Årolilja";
		}
		params = songName;
		spotify.search({ type: "track", query: params }, function(err, data) {
			if(!err){
				var songInfo = data.tracks.items;
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults =
						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
						"Song: " + songInfo[i].name + "\r\n" +
						"Album the song is from: " + songInfo[i].album.name + "\r\n" +
						"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
						"------------------------------ " + i + " ------------------------------" + "\r\n";
						console.log(spotifyResults);
						log(spotifyResults); 
					}
				}
			}	else {
				console.log("Error :"+ err);
				return;
			}
		});
	};
	
	}