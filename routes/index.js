var es_client = require('../es_client.js')
var Twit = require('twit')
var config = require('../oauth.js')
var es_client = require('../es_client.js')
var steam_start=true;

//Twitter
var T = new Twit({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token: config.twitter.accessToken,
  access_token_secret: config.twitter.accessTokenSecret
})

var worldwide = [ '-180', '-90', '180', '90' ]

var stream = T.stream('statuses/filter',
 {track:["2016","Trump","Hillary","Job","NBA","News","Jobs","LOL","USA"],location:worldwide });

stream.on('tweet', function(tweet) {
//   console.log(tweet.text);       
      
   if (tweet.place!=null)
     {
//       console.log(tweet.text);       
        var new_tweet = 
        {
            id : tweet.id, 
            user: {
              id: tweet.user.id,
              name: tweet.user.name
            },
            text: tweet.text,
            country : tweet.place.country_code,
            location: {
              lat: tweet.place.bounding_box.coordinates[0][0][1],
              lon: tweet.place.bounding_box.coordinates[0][0][0]
            }

        }
        es_client.insert_tweet(new_tweet);
 
     }
    
   });
   stream.on('limit', function (limitMessage) {
  console.log("exceed limit");
   });



/*
 * GET home page.
 */

exports.index = function(req, res) {

//  res.sendfile(path.join(__dirname+'/index.html'));
  res.render('index', { title: 'twittmap' });
};

exports.fight = function(req, res) {
  res.render('fight', { title: 'Express' });
};

exports.ajax = function(req, res) {

      var keyword =  req.query.keyword
      var dist = parseFloat(req.query.dist)
      var lon = parseFloat(req.query.log)
      var lat = parseFloat(req.query.lat)

/*
      console.log(keyword);
      console.log(dist);
      console.log(log);
      console.log(lat);
*/
//      res.json({foo:"bar"});      

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(200, {"Content-Type": "text/plain"});
//       res.end(result);  
      es_client.search_tweet(keyword,dist,lon,lat,res);
    
};


exports.openstream = function(req,res){
      if (!steam_start){
      console.log("open stream");
      stream.start();
      }
      res.end("Stream On");
      steam_start=true;
}

exports.closestream = function(req,res){
      if (steam_start){
      stream.stop();
      console.log("close stream");
      }
      res.end("Stream Close");
      steam_start=false;
}