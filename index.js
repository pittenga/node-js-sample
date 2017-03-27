var express = require('express');
var request = require('request');
//var swal = require('sweetalert2');
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

var requestLoop = setInterval(function(){
  request({
      url: "http://www.google.com",
      method: "GET",
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
  },function(error, response, body){
      if(!error && response.statusCode == 200){
          //window.swal('Good response!');
          console.log("good response!")
      }else{
          //window.swal('bad response :( !');
          console.log("bad response!")
      }
  });
}, 5000);
