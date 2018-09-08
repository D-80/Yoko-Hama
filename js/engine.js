var Engine = {

	ini: function() {

		var data = {

			//ANIMATION
			frameNo : 0,
			lpf : 6, //loops per frame

			//SPRITESHEET
			spritesheet : "img/bg512.png", 
			cellSize : 512,

			randSeed : 1,
			rateOfChange : 1, 

			yoko : Objects.Yoko,
			signal : Objects.Signal, 

			//SIGNAL
			signalSize : 40, 
			sizeSpeed : 10, 
			signalSpeed : 1,


			//GAME
			goal : 1, 
			startOver : false,
			time : 0,

			//CANVAS:
			yokoCanvas : document.getElementById("yoko-canvas"),
			signalCanvas : document.getElementById("signal-canvas"), 
			yokoCtx : document.getElementById("yoko-canvas").getContext("2d"),   
			signalCtx : document.getElementById("signal-canvas").getContext("2d"),   
			canvasHeight : document.getElementById("yoko-canvas").height, 
			canvasWidth : document.getElementById("yoko-canvas").width,
			signalCanvasHeight : document.getElementById("signal-canvas").height,
			signalCanvasWidth : document.getElementById("signal-canvas").width,  
			clientWidth : window.innerWidth,
			clientHeight : window.innerHeight, 

			//USER INPUT:
			up : false, 
			down : false, 
			left : false, 
			right : false
		
		}; 

		alert("YOKO-HAMA\nUse arrow keys to match Yoko's color with the color of the Heartbeat.\n\nUp - Red\nDown - Yellow\nLeft - Green\nBlue - Right\n\nIf youll beat 100 seconds and send me a screenshot to prove it, you get a kebab xD"); 
		Engine.start(data); 
	},


	start: function(data) {
			var mainLoop = function() {

				if(data.frameNo == 0 || data.startOver) {

					data.time = Math.round((new Date()).getTime()) / 1000; 

				}

				data.frameNo == 0 ? console.log(data.time = Math.round((new Date()).getTime()) / 1000) : null; 			

	
				Input.ini(data); 
				Render.ini(data); 
				Game.ini(data); 

				data.frameNo++;

				//data.startOver ? data.frameNo = 0 : data.startOver = false; 

				//document.getElementById("yoko-canvas").style.transform = "rotate("+data.frameNo+"deg)";
		
				window.requestAnimationFrame(mainLoop);
			}
			
			mainLoop();  
	},

	genRandSeed : function(data) {

		if(data.frameNo%data.rateOfChange == 0) {
			data.randSeed = Math.floor((Math.random() * 100)+1); //between 1 and 100
			//console.log("randSeed = "+data.randSeed); 
		}
		


	}
};

window.onload = Engine.ini();
