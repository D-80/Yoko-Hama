var Input = {

	ini: function(data) {

		document.onkeydown = function (e) {

			e = e || window.event; 
			switch(e.which || e.keyCode) {

				case 37 : 
					//alert("LEFT");
					data.left = true; 
					break;  
				case 38 :
					//alert("UP");
					data.up = true; 
					break;  
				case 39 :
					//alert("RIGHT");
					data.right = true; 
					break;
				case 40 :
					//alert("DOWN"); 
					data.down = true; 
					break;
				default: return; 

			}
		}
	},

	clearInput : function(data) {

		data.left = false;
		data.up = false; 
		data.right = false; 
		data.down = false; 

	}
};
