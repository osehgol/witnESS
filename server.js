//HTTP portion
var http = require('https');
var fs = require('fs');
var url = require('url');
var twitter = require('twitter');



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

var twitter_client = new Twitter({

	consumer_key: Keys.consumer_key,
	consumer_secret: Keys.consumer_secret,
	access_token: Keys.access_token_key,
	access_token_secret: Keys.access_token_secret

});



