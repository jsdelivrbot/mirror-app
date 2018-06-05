/**
 * Created by user on 7/22/17.
 */

var news1 = document.getElementById("news1");
var news2 = document.getElementById("news2");
var news3 = document.getElementById("news3");
var news4 = document.getElementById("news4");
var news5 = document.getElementById("news5");
var news6 = document.getElementById("news6");
var news7 = document.getElementById("news7");
var news8 = document.getElementById("news8");

var news = new XMLHttpRequest();
news.open("GET","https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=6c1f268f2e3d4d6f89d9b826a8ddaf10");
news.send();
news.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var data = JSON.parse(this.responseText);
        news1.innerHTML = data.articles[1]["title"];
        news2.innerHTML = data.articles[2]["title"];
        news3.innerHTML = data.articles[3]["title"];
        news4.innerHTML = data.articles[4]["title"];
    }
}


var sports = new XMLHttpRequest();
sports.open("GET"," https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=6c1f268f2e3d4d6f89d9b826a8ddaf10");
sports.send();
sports.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var data = JSON.parse(this.responseText);
        news5.innerHTML = data.articles[1]["title"];
        news6.innerHTML = data.articles[2]["title"];
        news7.innerHTML = data.articles[3]["title"];
        news8.innerHTML = data.articles[4]["title"];

    }
}
