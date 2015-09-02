//Determine the time of day and the date. Will update every second.
function updateClock(){
	var date = new Date().getHours();
	var minutes = ('0' + new Date().getMinutes()).slice(-2);
	var x = new Date().getMonth();
	var month = month_name[x];
	var day = new Date().getDate();
	var year = new Date().getFullYear();

	function getHour() {
		var hour;
		if (date > 12){
			return date - 12 + ":" + minutes +  'pm';
		} else {
			return date + ":" + minutes + 'am';
		}
	}

	var todays_date = getHour() + '<br>' + month + ' ' + day + ", " + year;
	document.getElementById('current_time'). innerHTML = todays_date;
	checkTime(date);
	setTimeout(updateClock, 1000);
}//end updateClock

//determines whether to display morning or afternoon
function checkTime(date){
	var timeOfDay = document.getElementById('timeOfDay');
	if (date < 11)
		timeOfDay.innerHTML = "Good freakin' morning!";
	else
		timeOfDay.innerHTML = "Good freakin' afternoon!";
}//end checkTime

//generate the compliment
//compliments are stored in compliments.js
function giveCompliment(){
	var x = Math.floor(Math.random() * compliments.length);
	var chosenCompliment = compliments[x].compliment;
	document.getElementById('complimentMe').innerHTML = chosenCompliment;
}//end giveCompliment


//generate the background
//background imgs also stored in compliments.js
function changeBackground(){
	var x = Math.floor(Math.random() * img_url.length);
	document.body.setAttribute("style", "background-image: url('img/" + img_url[x] + "');");
}//end change background

//get location of user and trigger a data stroage
var x = document.getElementById("weather");
function displayWeather() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(storeData);
	} else {
		x.innerHTML = "well, guess I can't creep";
	}
}
//store the users long and lat for faster weather generation
function storeData(position){
	var lat = position.coords.latitude;
	var lgn = position.coords.longitude;
	chrome.storage.sync.set({
		"latitude" : lat,
		"longitude" : lgn
	}, function(){
		console.log('things ' + lat + " " + lgn + ' were saved');
	});
}

//display the approprate weather information based on users location and Dark Sky's api
function accessDarkSkies(position){
	chrome.storage.sync.get(function(data){
		if (!data){
			displayWeather();
		}
		var uri = "https://api.forecast.io/forecast/" + darkskieskey + "/"+ data.latitude + "," + data.longitude;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
				if (xhr.readyState === 4 && xhr.status === 200){
				var j = JSON.parse(xhr.responseText);
				var temp = j.currently.temperature.toString();
				temp = temp.split('.');
				x.innerHTML = temp[0] + '&#8457 <br>' + j.currently.summary;
			}
		};

		xhr.open("GET", uri);
		xhr.send();
		//end xhr
	});//end storage get
}//end access dark skies.

//kick everything off once them DOM has loaded
document.addEventListener('DOMContentLoaded', function() {
	updateClock();
	changeBackground();
	checkTime();
	giveCompliment();
	accessDarkSkies();
});