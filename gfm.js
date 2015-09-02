//dark skies api key : dfca3c0aef158e73d2cc5951a910b3d6
//https://api.forecast.io/forecast/dfca3c0aef158e73d2cc5951a910b3d6/LATITUDE,LONGITUDE

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


//aquire location and display weather data






document.addEventListener('DOMContentLoaded', function() {
	changeBackground();
	checkTime();
	giveCompliment();
});



