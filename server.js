//HTTP portion
var http = require('https');
var fs = require('fs');
var url = require('url');
var Twitter = require('twitter');
var Keys = require('./keys.js');


var options = {

};

var httpServer = http.createServer(options, requestHandler);
httpServer.listen(8080, function(){
	console.log("listening on 8080");
});

function requestHandler(req, res){
	
		var parsedURL = url.parse(req.url);
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

//Twitter portion

//Twitter configuration
var twitter_client = new Twitter({

	consumer_key: Keys.consumer_key,
	consumer_secret: Keys.consumer_secret,
	access_token: Keys.access_token_key,
	access_token_secret: Keys.access_token_secret

});

// scraping tweets for #'tags'
twitter_client.get('search/tweets', {q:"#witness"}, function(error, tweets, response){
	
	console.log(tweets);

	//pick a tweet at random
	var tweet = tweets.statuses[Math.floor(Math.random()*tweets.statuses.length)];


	//post a reply to 
	client.post('statuses/update', {status: "@"+tweet.user.screen_name+" we're broadcasting you now", in_reply_to_status_id: tweet.in_reply_to_status_id				
									}, function(error, tweet, response) {
										if (!error) {
											console.log(tweet);
										} else {
											console.log(error);
										}
									});


});









