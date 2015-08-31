var fs = require('fs');

function giveCompliment(){
	fs.readFile('compliment.txt', 'utf8', function opened(err, data){
		if (err)
			console.log("well, I wanted to compliment you...");
		var data_array = data.split('\n');
		var compNumber = Math.floor(Math.random() * data_array.length + 1);
		var x = '';
		var clean_compliment = data_array.filter(function(data){
			var thing = data.split('.');
			if (thing[0] == compNumber)
				return thing;
		});
		var compliment = clean_compliment[0].split('.');
		return(compliment[1]);
	}); //end readFile
}//end giveCompliment

// if (process.argv[3] == 'compliment me');
// 	giveCompliment();

document.getElementById('complimentMe').innerHTML = giveCompliment();