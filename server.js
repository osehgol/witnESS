//HTTP portion
// var express = require('express');
// var app = express();
var http = require('https');
var fs = require('fs');
var url = require('url');
var Twitter = require('twitter');
//var Keys = require('./keys.js');
var oauth = require('oauth');
var tagSearch = null;


var options = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

var httpServer = http.createServer(options, requestHandler);
httpServer.listen(8080, function(){
	console.log("listening on 8080");
});

function requestHandler(req, res){

		var parsedUrl = url.parse(req.url);
				console.log("The request is: "+parsedUrl.pathname);
		
		fs.readFile(__dirname + parsedUrl.pathname, function(err, data) {
					//if there is an error
					if (err) {
							res.writeHead(500);
							return res.end('Error loading' + parsedUrl.pathname);
					}
					
					res.writeHead(200);
					res.end(data);

		}

)};





//socket portion
var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function(socket){

	socket.on('hash-tag-search', function(data){
	console.log(data.text);

	//Twitter portion

		//Twitter configuration
		var twitter_client = new Twitter({

			consumer_key: 'ZWdQIOm2KCxKuaoV1foqkA4Yn',
			consumer_secret: 'iOVj78uN3GY63k181ZxjOCQf1gWy5cw2oEsHGt2Gn9PJ4RwzIq',
			access_token_key: '102290558-Wb0q9Hm4Jvp9LtLigSFF8RDXWJeA6qG6KrHKRhZ8',
			access_token_secret: 'JtZzfuWC3OAGkUxvLzG57C0YSA7J8oITjLLIEcSTuxmkW'

		});

		// scraping tweets for #'tags'
		twitter_client.get('search/tweets', {q: data.text}, function(error, tweets, response){
			
			console.log(tweets);

			// pick a tweet at random
			var tweet = tweets.statuses[Math.floor(Math.random()*tweets.statuses.length)];


			// post a reply to 
			twitter_client.post('statuses/update', {status: "@"+tweet.user.screen_name+" we're broadcasting you now", in_reply_to_status_id: tweet.in_reply_to_status_id				
											}, function(error, tweet, response) {
												if (!error) {
													console.log(tweet);
												} else {
													console.log(error);
												}
											});


		 });








	});


});


