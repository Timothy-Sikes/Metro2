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

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bootstrap.serve);

bootstrap.init({
  minified: true
});

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
  try {
    var html = homeTemplate({ title: 'Test' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/test', function(req, res, next) {
  try {
    var html = stopTemplate({ "stop": { "id" : 3, "name" : "test" } });
      res.send(html)
  } catch (e) {
    next(e)
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

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
