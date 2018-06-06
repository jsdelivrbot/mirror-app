const express = require('express')
const path = require('path')
const DarkSkyApi = require('dark-sky-api');
const Geolocation = require('geo-loc-utils');
const PORT = process.env.PORT || 5000
const socketIO = require('socket.io');

var myData;

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', { myData: myData }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))



const io = socketIO(app);

//weather
var temp;
var summary;
var icons = ["clear-day", "clear-night", "cloudy", "fog", "partly-cloudy-day", "partly-cloudy-night", "rain", "sleet", "snow", "wind"];
var icon;
var pos;
var weather = new Object();

// listen for incoming connections from client
io.sockets.on('connection', function (socket) {

  // start listening for coords
  socket.on('send:coords', function (data) {
    getLocation(data).then(result => DarkSkyApi.loadCurrent(result)
      .then(result => {
        console.log(result);
        weather.temp = parseInt(result["temperature"]) + "°";
        weather.summary = result["summary"];
        var d = new Date();
        var dayNight = d.getHours();
        weather.icon = result["icon"];
        DarkSkyApi.loadForecast(pos)
          .then(result => {
            console.log(result);
            weather.summary = result["daily"]["summary"];
            socket.emit('load:weather', weather);
          })

      })
    );
  });
});

const getLocation = (data) => {
  return new Promise((resolve, reject) => {
    var position = new Object();
    position.latitude = data.coords[0].lat;
    position.longitude = data.coords[0].lng;
    pos = position;
    resolve(position);
  });
};

DarkSkyApi.apiKey = 'fdf8b7da6f8cf6efb7825fbfe07dd66d';
DarkSkyApi.proxy = true;


