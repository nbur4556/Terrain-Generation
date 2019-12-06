class TerrainGenerator{
	constructor(mapWidth, mapHeight, fillPercent = 30, convertAt = 3, smoothAmount = 0, seed = null){
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.fillPercent = fillPercent;
		this.convertAt = convertAt;
		this.seed = seed;
		
		this.CreateMap();
		
		for(let i = 0; i < smoothAmount; i++){
			this.SmoothMap();
		}
	}
	
	CreateMap(){
		this.map = new Array();
		let rng = new SeededRng(this.seed);
		rng.Init32Bit();
		let randNum;
		
		for(let iX = 0; iX < this.mapWidth; iX++){
			this.map[iX] = new Array();
			
			for(let iY = 0; iY < this.mapHeight; iY++){
				//Set all edges to 0 and continue
				if(iX == 0 || iY == 0 || iX == (this.mapWidth - 1) || iY == (this.mapHeight - 1)){
					this.map[iX][iY] = 0;
					continue;
				}
				
				//Randomly set to 0 or 1
				randNum = rng.GetRandomWithinRange(0, 100);
				if(randNum <= this.fillPercent){
					this.map[iX][iY] = 1;
				}
				else{
					this.map[iX][iY] = 0;
				}	
			}
		}
		
	}
	
	//Return the entire map
	GetMap(){
		return this.map;
	}
	
	GetCoordinate(x, y){
		if(x == -1 || y == -1 || x >= this.mapWidth || y >= this.mapHeight) { return null; }
		return this.map[x][y];
	}
	
	SetCoordinate(x, y, value){
		this.map[x][y] = value;
	}
	
	SmoothMap(){
		for(let iX = 0; iX < this.mapWidth; iX++){
			for(let iY = 0; iY < this.mapHeight; iY++){
				//let count0 = this.GetNeighborCount(iX, iY, 0);
				let count1 = this.GetNeighborCount(iX, iY, 1);
				
				if(count1 > this.convertAt){
					this.SetCoordinate(iX, iY, 1);
				}
				else if(count1 < this.convertAt){
					this.SetCoordinate(iX, iY, 0);
				}
			}
		}
	}
	
	GetNeighborCount(x, y, value){
		var xNeighbor = x - 1;
		var yNeighbor = y - 1;
		var count = 0;
		
		for(let iX = 0; iX < 3; iX++){
			for(let iY = 0; iY < 3; iY++){
				if(iX == 1 && iY == 1){
					yNeighbor++;
					continue;
				}
				
				if(this.GetCoordinate(xNeighbor, yNeighbor) == null){
					if(value == 0)
						count++;
					yNeighbor++;
					continue;
				}
				
				if(this.GetCoordinate(xNeighbor, yNeighbor) == value){
					
					count++;
				}
				
				yNeighbor++;
			}
			xNeighbor++;
			yNeighbor = y - 1;
		}
		
		return count;
	}
}