const express = require('express')
const path = require('path')
const DarkSkyApi = require('dark-sky-api');
const Geolocation = require('geo-loc-utils');
const PORT = process.env.PORT || 5000

var myData;

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', { myData: myData }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))


var io = require('socket.io').listen(app);
io.configure(function () {  
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});


//weather
var temp;
var summary;
var icons = ["clear-day", "clear-night", "cloudy", "fog", "partly-cloudy-day", "partly-cloudy-night", "rain", "sleet", "snow", "wind"];
var icon;


// listen for incoming connections from client
io.sockets.on('connection', function (socket) {

  // start listening for coords
  socket.on('send:coords', function (data) {
    getWeather(data).then(result => DarkSkyApi.loadCurrent(result)
      .then(result => {
        var weather = new Object();
        weather.temp = parseInt(result["temperature"]) + "°";
        weather.summary = result["summary"];
        var d = new Date();
        var dayNight = d.getHours();
        weather.icon = result["icon"];
        socket.emit('load:weather', weather);
      })
    );
  });
});

const getWeather = (data) => {
  return new Promise((resolve, reject) => {
    var position = new Object();
    position.latitude = data.coords[0].lat;
    position.longitude = data.coords[0].lng;
    resolve(position);
  });
};

DarkSkyApi.apiKey = 'fdf8b7da6f8cf6efb7825fbfe07dd66d';
DarkSkyApi.proxy = true;


