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

//get location of user and trigger a data stroage

function getLocation(weatherElement) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(storeData);
	} else {
		weatherElement.innerHTML = "well, guess I can't creep";
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
	var weatherElement = document.getElementById("weather");
	chrome.storage.sync.get(function(data){
		if (!data){
			getLocation(weatherElement);
		}
		var uri = "https://api.forecast.io/forecast/" + darkskieskey + "/"+ data.latitude + "," + data.longitude;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
				if (xhr.readyState === 4 && xhr.status === 200){
				var j = JSON.parse(xhr.responseText);
				var temp = j.currently.temperature.toString();
				temp = temp.split('.');
				weatherElement.innerHTML = temp[0] + '&#8457 <br>' + j.currently.summary;
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
	giveCompliment();
	accessDarkSkies();
});