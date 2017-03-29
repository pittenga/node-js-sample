var express = require('express');
var request = require('request');
const co = require('co');
const generate = require('node-chartist');

var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  co(function * () {

  // options object
  const options = {width: 400, height: 200};
  const data = {
    labels: ['a','b','c','d','e'],
    series: [
      [1, 2, 3, 4, 5],
      [3, 4, 5, 6, 7]
    ]
  };
  const bar = yield generate('bar', options, data); //=> chart HTML


  // options function
  const options2 = (Chartist) => ({width: 400, height: 200, axisY: { type: Chartist.FixedScaleAxis } });
  const data2 = {
    labels: ['a','b','c','d','e'],
    series: [
      [1, 2, 3, 4, 5],
      [3, 4, 5, 6, 7]
    ]
  };
  const bar2 = yield generate('bar', options2, data2); //=> chart HTML
  response.send('<head><link rel="stylesheet" href="main.css"> Hello World!</head>' + '<div class="chartHtml">' + bar +  '</div>')
  });



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
          console.log("good response!")
      }else{
          console.log("bad response!")
      }
  });
}, 5000);
