var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'twitter_map'
});


function connect(){
    connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
    });    
}

//console.log(result[i].content);
function findall(){
    var sql = "select * from twitter";
    connection.query(sql,function(err,result){

    });    
}

function insertone(parameters){
    var sql = "INSERT INTO twitter VALUES(?,?,?,?,?)";
    var id = parameters.id;
    var content = parameters.content;
    var country = parameters.country;
    var longitude = parameters.longitude;
    var latitude = parameters.latitude;
    var inserts = [id,content,country,longitude,latitude];
    sql = mysql.format(sql, inserts);
    connection.query(sql,function(err,result){
        for (i=0;i<result.length;++i)
            console.log(result[i].content);
    });
}

