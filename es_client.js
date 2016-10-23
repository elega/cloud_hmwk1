var elasticsearch = require('elasticsearch');


var client 


exports.connect = function(){

client = require('elasticsearch').Client({
  hosts: 'search-twitt-map-db-w5h27iafbziaho2txcmqs6teei.us-east-1.es.amazonaws.com',
  connectionClass: require('http-aws-es'),
  amazonES: {
    region: 'us-east-1',
    accessKey: 'dummy',
    secretKey: 'dummy'//intentionally concealed
  } ,
  log :"trace"
}


);

var body = {
    tweet_debug:{
        properties:{
            location     : {"type" : "geo_point"}
        }
    }
}
//client.indices.putMapping({index:"twitter", type:"tweet_debug", body:body});
/*
  client = new elasticsearch.Client({
    host: 'localhost:9200',//,
    log : 'trace'
  });
  */
}

exports.insert_tweet = function(new_tweet){
     client.create(
       {
      index: 'twitter',
      type: 'tweet_debug',
      body: new_tweet
      });
}

exports.search_tweet = function(key_word,distance,lon,lat,ajax_respond){
  
  search = true;
  client.search({
    index: 'twitter',
    type: 'tweet_debug',
    size: 500,
    body: {"query": {
      "bool": {
        "must": {
          "bool": {
            "must": [
              {
                "geo_distance": {
                  "location": {
                    lat:lon,
                    lon:lat}
                  ,
                  "distance": distance.toString() + "km"
                }
              },
              {
                "match": {
                  "text": key_word 
                }
              }
            ]
          }
        }
      }
      }
      }

  }).then(function (resp) {
      hits = resp.hits.hits;
      console.log("hits: "+ hits.length);
//      console.log(ajax_respond.toString());

      var array = [];
      for (var i = 0; i < resp.hits.hits.length; i++) {
           array[i] = hits[i]._source;
      }      
//      ajax_respond.json(array);      
//      ajax_respond.json({foo:"bar"});      

      ajax_respond.end(JSON.stringify(array));
//      return hits.length.toString();

//      search=false;
      
  }, function (err) {
      console.trace(err.message);
  });  
//  while(search);
}
/*
var client = require('elasticsearch').Client({
  hosts: 'search-twittmap-wbujes5xymietbniu2rdpksuby.us-west-2.es.amazonaws.com',
  connectionClass: require('http-aws-es'),
  amazonES: {
    region: 'us-west-2',
    accessKey: 'dummy',
    secretKey: 'dummy'
  }
});
*/
/*
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: Infinity,

  // undocumented params are appended to the query string
  hello: "elasticsearch!"
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
*/

/*
client.create({
 index: 'myindex',
 type: 'twitter3',
 body: {
 name: 'a',
 age: 25
}
}, function (err, resp) {
 // ...
});
*/
/*
client.create({
 index: 'myindex',
 type: 'twitter2',
 body: {
 name: 'b',
 age: 44
}
}, function (err, resp) {
 // ...
});

client.create({
 index: 'myindex',
 type: 'twitter2',
 body: {
 name: 'c',
 age: 77
}
}, function (err, resp) {
 // ...
});

*/

// 搜索文档 
/*
client.delete(
{
      "query": 
      {
          "match_all": {}
      }
   }
);*/


/*
client.search({
 index: 'myindex',
 type: 'twitter2',
  "query": {
    "bool": {
      "must": { "match_all": {} },
      "filter": {
        "range": {
          "age": {
            "gte": 50,
            "lte": 30
          }
        }
      }
    }
  }
}

).then(function (resp) {
 var hits = resp.body.hits;
 console.log("found one");
});
*/
var tweets;


/*

client.search({
  index: 'twitter',
   type: 'tweet_debug',
   size: 500,
  body: {"query": {
		"bool": {
			"must": {
				"bool": {
					"must": [
						{
							"geo_distance": {
								"location": [
									100,
									0
								],
								"distance": "100000km"
							}
						},
						{
							"wildcard": {
								"text": "*the*"
							}
						}
					]
				}
			}
		}
    }
		}

}).then(function (resp) {
    var hits = resp.hits.hits;
    console.log("hits: "+ hits.length);
    
}, function (err) {
    console.trace(err.message);
});

/*
client.search({
  index: 'twitter',
   type: 'tweet_debug',
   size: 500,
  body: {
    "query" : {
    "bool" : {
        "must" : {
            "match_all" : {}
        },
        "filter" : {
            "geo_distance" : {
                "distance" : "50000km",
                "location" : {
                    "lat" : 40,
                    "lon" : -70
                }
            },
        }
    }
    }
		}

}).then(function (resp) {
    var hits = resp.hits.hits;
    console.log("hits: "+ hits.length);
    
}, function (err) {
    console.trace(err.message);
});
*/

/*
client.search({
  index: 'myindex2',
   type: 'twitter_debug2',
  body: {
	"query": {
		"bool": {
			"must": {
				"bool": {
					"must": [
						{
							"range": {
								"place.longitude": {
									"from": null,
									"to": 0,
									"include_lower": false,
									"include_upper": true
								}
							}
						},
						{
							"range": {
								"place.latitude": {
									"from": null,
									"to": 0,
									"include_lower": false,
									"include_upper": true
								}
							}
						}
					]
				}
			}
		}

    }
  }
}).then(function (resp) {
    var hits = resp.hits.hits;
    console.log("hits: "+ hits.length);
    
}, function (err) {
    console.trace(err.message);
});
*/
var a=1;