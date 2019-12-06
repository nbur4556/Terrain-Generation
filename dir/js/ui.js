window.onload = function(){
	var tGen = new TerrainGenerator(125, 250, 37, 3);
	tGen.CreateMap();
	
	tGen.SmoothMap();
	//tGen.SmoothMap();
	//tGen.SmoothMap();
	
	DrawMapToScreen(tGen.GetMap());
}

function WriteMapToScreen(map){
	var textContent = "";
	
	for(let i  = 0; i < map.length; i++){
		for(let ii = 0; ii < map[i].length; ii++){
			textContent += (map[i][ii]);
		}
		textContent += ("\n");
	}
	
	var textNode = document.createTextNode(textContent);
	document.getElementById("build").appendChild(textNode);
}

function DrawMapToScreen(map){
	for(let i  = 0; i < map.length; i++){
		
		let cellRow = document.createElement("div");
		cellRow.className = "cellRow";
		
		for(let ii = 0; ii < map[i].length; ii++){
			let mapValue = (map[i][ii]);
			let cell = document.createElement("div");
			
			if(mapValue == 1){
				cell.className = "landCell";
			}
			else{
				cell.className = "waterCell";
			}
			
			cellRow.appendChild(cell);
		}
		
		document.getElementById("build").appendChild(cellRow);
	}
}