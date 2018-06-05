$(function() {
	// generate unique user id
	var userId = Math.random().toString(16).substring(2,15);
	var socket = io.connect("https://secret-ocean-69014.herokuapp.com:5000");

	var temp = document.getElementById("temp");
	var summary = document.getElementById("weatherSummary");
	var icon = document.getElementById("icon");

	var icons = ["clear-day","clear-night","cloudy","fog","partly-cloudy-day","partly-cloudy-night","rain","sleet","snow","wind"];

	var doc = $(document);

	var sentData = {}

	var connects = {};
	var markers = {};
	var active = false;

	socket.on("load:weather",function(data){
		temp.innerHTML = data["temp"];
		summary.innerHTML = data["summary"];
		icon.src = icon.src = "images/weather/"+data["icon"]+".png";

		console.log(data);

	});

	socket.on("load:coords", function(data) {
		// remember users id to show marker only once
		if (!(data.id in connects)) {
			
		}

		connects[data.id] = data;
		connects[data.id].updated = $.now(); // shorthand for (new Date).getTime()
	});

	// check whether browser supports geolocation api
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { enableHighAccuracy: true });
	} else {
		$(".map").text("Your browser is out of fashion, there\'s no geolocation!");
	}

	function positionSuccess(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var acr = position.coords.accuracy;
        
		sentData = {
			id: userId,
			active: active,
			coords: [{
				lat: lat,
				lng: lng,
				acr: acr
			}]
		}
		socket.emit("send:coords", sentData);
		
	}

	doc.bind("mouseup mouseleave", function() {
		active = false;
	});

	

	// handle geolocation api errors
	function positionError(error) {
		var errors = {
			1: "Authorization fails", // permission denied
			2: "Can\'t detect your location", //position unavailable
			3: "Connection timeout" // timeout
		};
		showError("Error:" + errors[error.code]);
	}

	function showError(msg) {
		info.addClass("error").text(msg);
	}

	// delete inactive users every 15 sec
	setInterval(function() {
		for (ident in connects){
			if ($.now() - connects[ident].updated > 15000) {
				delete connects[ident];
				map.removeLayer(markers[ident]);
			}
        }
    }, 15000);
});