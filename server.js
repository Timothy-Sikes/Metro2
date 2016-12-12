var express = require('express')
  ,http = require('http')
  ,path = require('path')
  ,logger = require('morgan')
  ,app = express()
  ,fs = require('fs')
  ,bootstrap = require('express-bootstrap-service')
  ,homeTemplate = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  ,stopTemplate = require('jade').compileFile(__dirname + '/source/templates/stop.jade')
  ,stopsTemplate = require('jade').compileFile(__dirname + '/source/templates/stops.jade')
  ,mainTemplate = require('jade').compileFile(__dirname + '/source/templates/main.jade')
  ,travelTemplate = require('jade').compileFile(__dirname + '/source/templates/travel.jade')
  
var metro_client = require(__dirname + '/source/controllers/metro_client.js');
var routeId = 704;

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bootstrap.serve);

bootstrap.init({
  minified: true
});

app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
  try {
     var departure;
     var arrival;
    function callback1(data)
    {
      departure = JSON.parse(data.body);
      console.log(departure);
      var html = mainTemplate(departure);
      res.send(html);
    }
    metro_client.getStops(callback1, routeId);
  } catch (e) {
    next(e);
  }
});

app.get('/test', function(req, res, next) {
  try {
    var html = stopTemplate({ "stop": { "id" : 3, "name" : "test" } });
      res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/main', function(req, res, next) {
  try {
     var departure;
     var arrival;
    function callback1(data)
    {
      departure = JSON.parse(data.body);
      console.log(departure);
      var html = mainTemplate(departure);
      res.send(html);
    }
    metro_client.getStops(callback1, routeId);
  } catch (e) {
    next(e);
  }
})

app.get('/stops', function(req, res, next) {
  try {
    var html = stopsTemplate(
      {
        "stops" : 
          [ 
            { "id" : 3, "name" : "test" },
            { "id" : 4, "name" : "other"}
          ]
      });
      res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/travel', function(req, res, next){
  try{
    var departure;
    var arrival;
    var prediction;
    function callback1(data)
    {
      console.log(data);
      departure = data.body;
      metro_client.getStop(callback2, req.param('arrival'));
    }
    function callback2(data)
    {
      console.log(data);
      arrival = data.body;
      console.log({"departure" : JSON.parse(departure), "arrival" : JSON.parse(arrival) });
      metro_client.getPrediction(callback3, routeId, req.param('departure'));
    }
    function callback3(data)
    {
      console.log(data);
      prediction = JSON.parse(data.body);
      console.log(prediction);
      var travelInfo = metro_client.getTravelInfo();
      console.log("before new JSON");
      console.log(travelInfo['message']);
      console.log(travelInfo['duration']);
      console.log(prediction["items"][0]);
      console.log('length + ' + prediction['items'].length);
      console.log(prediction['items'].slice(1, 3));
      console.log({
          "travel_model" : {
            "departure" : JSON.parse(departure),
            "arrival" : JSON.parse(arrival),
            "message" : travelInfo['message'],
            "duration" : travelInfo['duration'],
            'next_bus' : { "seconds" : prediction['items'][0]['seconds'], "minutes" : prediction['items'][0]['minutes'] },
            'other_buses' : prediction['items'].slice(1, prediction['items'].length)
          }
          }
          );
      var html = travelTemplate(
        {
          "travel_model" : {
            "departure" : JSON.parse(departure),
            "arrival" : JSON.parse(arrival),
            "message" : travelInfo['message'],
            "duration" : travelInfo['duration'],
            'next_bus' : { "seconds" : prediction['items'][0]['seconds'], "minutes" : prediction['items'][0]['minutes'] },
            'other_buses' : prediction['items'].slice(1, prediction['items'].length)
          }
          });
      res.send(html);
    }
    
    metro_client.getStop(callback1, req.param('departure'));
    
    //var html = travelTemplate({ "arrival" : {"display_name" : "test", "id" : req.param('departure') }, "departure" : {  "display_name" : "tesing", "id" : "4" } })
    //  res.send(html);
  }
  catch(e) {
    next(e)
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})

function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      }
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}
