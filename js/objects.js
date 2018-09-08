
var Objects = {


	changeState : function (object, state) {

		//console.log("state changed");

		object.states.up = false;
		object.states.left = false;
		object.states.right = false;
		object.states.down = false;

		switch(state) {
			case(1):
				object.states.up = true;
				break;
			case(2):
				object.states.left = true;
				break;
			case(3):
				object.states.right = true; 
				break;
			case(4):
				object.states.down = true; 
				break;

		object.change = true; 

		}
	},

	Signal : {

		startX : 512/4,
		startY : 512/4,

		x : 0,
		y : 0,
		duration : 0, 

		size : 0,

		time : 0, 

		amplitude : 0,
		wavelength : 0, 
		speed : 0, 
		length : 0, 

		color : 'green' 

	},

	Yoko : {

		lifetime : 0,		//total number of frames generated 	
		duration : 0, 		//life cycle of an animated object 
		posX : 512/2,		//coordinates 
		posY : 512/2 + 103,
		evenStep : false,
		finished : false,
		change : false, 

		animations : {

			yokoLeft : {  

				name: "yokoLeft",

				frameX : 0, //X starting position on the grid
				frameY : 0, //Y starting position on the grid
				frames: 6, 	//number of frames to the right


			},

			yokoRight : {

				name : "yokoRight",

				frameX : 0,
				frameY : 1, 
				frames : 6,

			},

			yokoDown : {

				name : "yokoDown", 
	
				frameX : 0, 
				frameY : 2, 
				frames : 6,

			},

			yokoUp : {

				name : "yokoUp", 
	
				frameX : 0, 
				frameY : 3, 
				frames : 6,

			}
		},

		states : {

			up : false,
			left : false,
			right : false, 
			down : false,

		}
	}
};
