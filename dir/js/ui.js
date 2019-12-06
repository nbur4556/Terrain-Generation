window.onload = function(){
	var mapWidth = 100;
	var mapHeight = 100;
	var fillpercent = 54;
	var convertAt = 4;
	var smoothAmount = 5;
	var seed = null;
	var tGen = new TerrainGenerator(mapWidth, mapHeight, fillpercent, convertAt, smoothAmount, seed);
	
	DrawMapToScreen(tGen.GetMap());
	
	document.getElementById("build").addEventListener("click", function(){
		tGen.CreateMap();
		for(let i = 0; i < smoothAmount; i++){
			tGen.SmoothMap();
		}
		ClearChild();
		DrawMapToScreen(tGen.GetMap());
	});
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

function ClearChild(){
	while(document.getElementById("build").lastElementChild){
		let child = document.getElementById("build").lastElementChild;
		document.getElementById("build").removeChild(child);
	}
}