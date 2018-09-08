var Render = {

	ini : function (data) {

		Render.renderSignal (data);
		//remember ^ use data.signalSpeed which is incremented by the Game.changeDiff() 
		Render.renderYoko (data); 

	},


	renderSignal : function (data) {

		/*if(!(	yoko.states.up == false &&
			yoko.states.down == false && 
			yoko.states.right == false &&
			yoko.states.left == false )) { 
		*/
		Render.setAmplitude(data);
		Render.setWavelength(data);  
		
		var length = data.signal.startX + data.signal.wavelength * 3; 
		var oldPosX = data.signal.x; 
		var oldPosY = data.signal.y;

		data.signal.speed = data.signalSpeed; 


		if(data.signal.x - data.signal.startX < data.signalSize*data.sizeSpeed) {
			data.signal.size += 1/data.sizeSpeed;
		} else if(data.signal.size > 1/data.sizeSpeed  && data.signal.x  > length - data.signalSize*data.sizeSpeed) {
			data.signal.size -=  1/data.sizeSpeed;		
			//console.log(data.signal.size); 	
		}


		if(data.signal.duration == 0 || data.signal.x > length) {
			data.signal.x = data.signal.startX-1;
			oldPosX = data.signal.x;
			oldPosY = Render.getCos(data); 
			// 
		}

		data.signal.y = Render.getCos(data); 

		//data.signal.y = (data.signal.amplitude * Math.cos((cosSeed + transX) * 2 * Math.PI / data.signal.wavelength)) + data.signal.startY; 

		data.signal.duration++;
		data.signal.x += data.signal.speed * Math.PI;  
		data.signal.length = length; 


		Render.drawDot(data, data.signal.x, data.signal.y, data.signal.size, oldPosX, oldPosY, length);

//		}

	},

	getCos : function (data) {

		var cosSeed = data.signal.wavelength/4; 
		var transX = data.signal.x - data.signal.startX;

		cos = data.signal.amplitude * Math.cos((cosSeed + transX) * 2 * Math.PI / data.signal.wavelength) + data.signal.startY;
 
		return cos;  

	},


	setAmplitude : function (data) {

		data.signal.amplitude = data.signal.startY/2;

	},

	setWavelength : function (data) {

		data.signal.wavelength = data.cellSize/2;

	},

	drawDot : function (data, x, y, size, oldPosX, oldPosY, length) {

		var context = data.signalCtx;

		//context.globalAlpha = 0 - 1/x; 
 
		context.beginPath();
		context.strokeStyle = data.signal.color; 
		context.lineWidth = 5; 
		context.moveTo(oldPosX, oldPosY);
		context.lineTo(x,y);
		context.stroke(); 
		context.closePath();  
		//context.arc(x - radius, y - radius, radius, 0, 2 * Math.PI, false);
      	//context.fillStyle = data.signal.color;
      	//context.fill();
      	//context.lineWidth = 0;
      	//context.strokeStyle = data.signal.color;
      	//context.stroke();	
		//context.closePath(); 
		context.clearRect(x-100, 0, 10, 512);
		context.clearRect(x+100, 0, 600, 512); 

		//console.log("x = "+x+"; length = "+length+"; data.signal.startX = "+data.signal.startX); 

		//x > length-1 ? context.clearRect(length-200, 0, 512, 512) : null;

	},


	renderYoko : function (data) {

		//CYCLE HERE
		(data.frameNo % data.lpf == 0) ? inCycle = true : inCycle = false; 
	
		//YOKO	
		data.yoko.posY = 0;
		data.yoko.posX = 0;
		//data.yoko.posY = data.clientHeight-data.canvasHeight;
		//data.yoko.poX = data.clientWidth-data.canvasWidth; 

		if( (data.yoko.lifetime) % (data.lpf*6) == 0 && data.yoko.change == false) {

			data.yoko.even ? data.yoko.even = false : data.yoko.even = true;
			
			//console.log("renderYoko() : data.yoko.even = "+data.yoko.even); 

		}
	
		//console.log("up = "+data.yoko.states.up+"; right = "+data.yoko.states.right); 		

		data.up ? Objects.changeState(data.yoko, 1) : null; 
		data.left ? Objects.changeState(data.yoko, 2) : null; 
		data.right ? Objects.changeState(data.yoko, 3) : null; 
		data.down ? Objects.changeState(data.yoko, 4) : null; 

		if			(data.yoko.states.left == true) {

			Render.animate(data, inCycle, data.yoko, data.yoko.animations.yokoLeft, data.yoko.even);
			//data.yoko.posX--;
		} else if	
					(data.yoko.states.right == true) {

			Render.animate(data, inCycle, data.yoko, data.yoko.animations.yokoRight, data.yoko.even); 
			//data.yoko.posX++;
		} else if	
					(data.yoko.states.down == true) {

			Render.animate(data, inCycle, data.yoko, data.yoko.animations.yokoDown, data.yoko.even);
			//data.yoko.posY++; 
		} else if	
					(data.yoko.states.up == true) {

			Render.animate(data, inCycle, data.yoko, data.yoko.animations.yokoUp, data.yoko.even);
			//data.yoko.posY--; 
		} else {

			Render.animate(data, inCycle, data.yoko, data.yoko.animations.yokoRight, data.yoko.even);

		}

		Input.clearInput(data); 

	},

///////////////ANIMATION////////////////////////////////////////////////////////	
	animate : function (data, inCycle, object, animation, backwards = false, loop=true) {

		//console.log("Animation: " + animation.name); 
		var duration = animation.frames * data.lpf; //static, don't confuse with object.duration
		var currFrame = !backwards ? 0 : animation.frames; 
		var cycle = object.duration/data.lpf;

		object.finished = false; 

	//LOGS
		//console.log("Cycle: "+inCycle); 
		//(!inCycle && object.duration == 0) ? console.log("Synchronize watches: "+!inCycle && object.duration == 0) : null;  

	//Loop, look here in case animation changes places after each rep
		if(		(!backwards && (object.duration >= duration)) || 
				(backwards && (object.duration >= duration))) {
			if(loop) {
				object.finished = true; 
				object.duration = 0;
				//console.log("object.even = "+object.even+"; object.finished = "+object.finished);
				
				return;  
				//!backwards ? object.duration = 0 : object.duration = 1; 
			} else {
				return; 
			}
		}

	//LOGS#2
		//console.log(object.even); 
		//console.log("object.finished = "+object.finished); 

		//Synchronizing watches
		if(!inCycle && object.duration == 0) {
			return; 
		}
		currFrame = !backwards ? (animation.frameX + cycle) : (animation.frames - cycle -1 ); 

	//LOGS#3
		//console.log("currFrame = "+currFrame); 

	//Time Skip
		if(inCycle) {
			Render.draw(data, currFrame, animation.frameY, object.posX, object.posY, data.spritesheet, true); 
		}	
			console.log(	"object.duration = "+object.duration +
					"; data.frameNo= "+data.frameNo +
					"; data.lpf = "+data.lpf +
					"; cycle = "+cycle	
			);

		object.duration++;
		object.lifetime++;  
	},


	draw : function(data, frameX, frameY, x, y, spritesheet, clear = true, isAnimation = true) {

		var canvas = data.yokoCanvas;
		var ctx = data.yokoCtx;  
		clear ? ctx.clearRect(x, y, 512, 512) : null; 	
	
		var img = new Image;

		if(isAnimation) {

			img.onload = function() {
				ctx.drawImage(img, 
					//frame count
					0 + (frameX) * 512,
					0 + (frameY) * 512, 
					//cut size
					data.cellSize,
					data.cellSize, 
					//position
					x,
					y, 
					//scaling factor
					data.cellSize, 
					data.cellSize);
			}
 
		}	else {

			img.onload = function() {
				ctx.drawImage(img, 
					//frame count
					frameX, 
					frameY,
					//cut size
					data.cellSize,
					data.cellSize, 
					x,
					y, 
					//scaling factor
					data.cellSize, 
					data.cellSize); 

			}
		}

		img.src = spritesheet;
	}
}; 
