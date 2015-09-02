//dark skies api key : dfca3c0aef158e73d2cc5951a910b3d6
//https://api.forecast.io/forecast/dfca3c0aef158e73d2cc5951a910b3d6/LATITUDE,LONGITUDE

//google geolocator api key:
var api_key = "AIzaSyCwz9UmMiTedyaMLToME_GZfAO-KQcFico";

var date = new Date().getHours();



//generate the compliment
//compliments are stored in compliments.js
function giveCompliment(){
	var x = Math.floor(Math.random() * compliments.length + 1);
	var chosenCompliment = compliments[x].compliment;
	document.getElementById('complimentMe').innerHTML = chosenCompliment;
}//end giveCompliment




//generate the background
//background imgs also stored in compliments.js
function changeBackground(){
	var x = Math.floor(Math.random() * img_url.length);
	document.body.setAttribute("style", "background-image: url('img/" + img_url[x] + "');");
}//end change background




//determines whether to display morning or afternoon
function checkTime(){
	var timeOfDay = document.getElementById('timeOfDay');
	if (date < 11)
		timeOfDay.innerHTML = "Good freakin' morning!";
	else
		timeOfDay.innerHTML = "Good freakin' afternoon!";
}//end checkTime







//
var x = document.getElementById("weather");
function displayWeather() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(accessDarkSkies);
	} else {
		x.innerHTML = "well, guess I can't creep";
	}
}

function showPosition(position){
	x.innerHTML = "latitude: " + position.coords.latitude + "<br>Longitute: " + position.coords.longitute;
}



function accessDarkSkies(position){
	var uri = "https://api.forecast.io/forecast/dfca3c0aef158e73d2cc5951a910b3d6/"+ position.coords.latitude + "," + position.coords.longitude;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
			if (xhr.readyState === 4 && xhr.status === 200){
			var j = JSON.parse(xhr.responseText);
			x.innerHTML = j.currently.apparentTemperature;
		}
	};

	xhr.open("GET", uri);
	xhr.send();
}





document.addEventListener('DOMContentLoaded', function() {
	changeBackground();
	checkTime();
	giveCompliment();
	displayWeather();
});