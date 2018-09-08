var Game = {


	ini : function (data) {

		if(data.signal.x > data.signal.length) {
			data.randSeed = Math.floor((Math.random() * 4)+1); //between 1 and 4	
			Game.checkColors(data);
			Game.setColors(data);
			Game.changeDiff(data); 
		}
	},


	changeDiff : function (data) {
		
		data.signalSpeed += 0.1; 

	},


	checkColors : function (data) {

		if(data.signal.x > data.signal.length) {

			console.log(data.signal.color); 
			switch(data.signal.color){
				case 'green' :
					data.yoko.states.left == false ? Game.gameOver(data) : null;
					break;
				case 'red':
					data.yoko.states.up == false ? Game.gameOver(data) : null; 
					break;
				case 'blue':
					data.yoko.states.right == false ? Game.gameOver(data) : null; 
					break;
				case 'yellow':
					data.yoko.states.down == false ? Game.gameOver(data) : null;  
					break;
				default:
					alert("checkColors crashed"); 
					return;
			}
		}

	},

	setColors : function (data) {

		switch(data.randSeed){
			case 1 :
				console.log("green");
				data.signal.color = "green";
				break;
			case 2:
				console.log("red");
				data.signal.color = "red";
				break;
			case 3:
				console.log("blue");
				data.signal.color = "blue";
				break;
			case 4:
				console.log("yellow"); 
				data.signal.color = "yellow";
				break;
			default:
				alert("setColors crashed");
				return;
		}
	},

	gameOver : function (data) {

		data.startOver = true;
		
		currTime = Math.round((new Date()).getTime() / 1000); 
 
		data.time = Math.round(currTime - data.time); 
		console.log("currTime = "+currTime); 
		console.log("dataTime = "+data.time); 

		alert("GAME OVER\nYou lasted \n"+data.time+" seconds");  

		location.reload();

	}
};



