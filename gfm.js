//Determine the time of day and the date. Will update every second.
function updateClock(){
	var date = new Date()
	//gives hour:minute:seconds am/pm
	var todaysDate = date.toLocaleString(undefined, {month:"long", day:"numeric", year:"numeric"});
	var now = date.toLocaleTimeString(undefined, {hour:"numeric", minute:"numeric"});

	document.getElementById('current_time'). innerHTML = now + "<br>" + todaysDate;
	checkTime(date);
	setTimeout(updateClock, 1000);
}//end updateClock

//determines whether to display morning or afternoon
function checkTime(date){
	document.getElementById('timeOfDay')
		.innerHTML = date.getHours() <= 11? 
			"Good freakin' morning!" : "Good freakin' afternoon!";
}//end checkTime

//generate the compliment
//compliments are stored in compliments.js
function giveCompliment(){
	var index = Math.floor(Math.random() * compliments.length);
	var chosenCompliment = compliments[index].compliment;
	document.getElementById('complimentMe').innerHTML = chosenCompliment;
}//end giveCompliment


//generate the background
//background imgs also stored in compliments.js
function changeBackground(){
	var index = Math.floor(Math.random() * imgUrl.length);
	document.body.setAttribute("style", "background-image: url('img/" + imgUrl[index] + "');");
}//end change background


//store the users long and lat for faster weather generation
function storeData(callback, position){
	if (callback === undefined){
		callback = function(){
			console.log('things were calledback');
		}
	}
	console.log("I'm trying! I promise");
	var lat = position.coords.latitude;
	var lgn = position.coords.longitude;
	chrome.storage.sync.set({
		"lat" : lat,
		"lng" : lgn
	}, callback);
}

function callDarkSkies(data){
	var uri = "https://api.forecast.io/forecast/" + darkskieskey + "/"+ data.lat + "," + data.lng;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
			if (xhr.readyState === 4 && xhr.status === 200){
			var j = JSON.parse(xhr.responseText);
			var temp = j.currently.temperature.toString();
			temp = temp.split('.');
			document.getElementById('weather').innerHTML = temp[0] + '&#8457 <br>' + j.currently.summary;
		}
	};

	xhr.open("GET", uri);
	xhr.send();
	//end xhr
}

//display the approprate weather information based on users location and Dark Sky's api
function accessDarkSkies(){
	var weatherElement = document.getElementById("weather");

	chrome.storage.sync.get(function(data){
		if (!data.hasOwnProperty('lat')) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					storeData.bind(this, function(data) {
						chrome.storage.sync.get(callDarkSkies);
					}));
			} else {
				weatherElement.innerHTML = "well, guess I can't creep";
			}
		} else {
			callDarkSkies(data);
		}
	});
}//end access dark skies.

//kick everything off once them DOM has loaded
document.addEventListener('DOMContentLoaded', function() {
	updateClock();
	changeBackground();
	giveCompliment();
	accessDarkSkies();
});