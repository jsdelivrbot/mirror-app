var d = new Date();
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


var date = document.getElementById("date");
var time = document.getElementById("time");
var day = document.getElementById("day");

function getDate() {
    date.innerHTML = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function timer() {
    setTimeout(timer, 1000);
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var strTime = [hours,
            (minutes < 10 ? "0" + minutes : minutes)
        ].join(':');
    time.innerHTML = strTime;
    setTimeout(timer, 1000);
}

function getDay(){
    var d = new Date();
    day.innerHTML = dayNames[d.getDay()];
}

getDate();
getDay();
timer();