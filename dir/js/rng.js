//Seeded LCG Pseudo-Random Number Generator
class SeededRng{
	constructor(seed = null){
		this.multiplier = 8121;
		this.modulus = 134456;
		this.increment = 28411;
		
		//Determine if seed is valid
		if(seed == null){
			this.seed = this.GenerateSeed();
		}
		else if(Number.isInteger(seed)){
			this.seed = seed;
		}
		else{
			this.seed = this.StringToInt(seed);
		}
	}
	
	//Initialize 32 Bit Values
	Init32Bit(){
		this.multiplier = 214013;
		this.modulus = 4294967296;
		this.increment = 2531011;
	}
	
	//Returns miliseconds from 01/01/1970 as a seed
	GenerateSeed(){
		var d = new Date;
		var seed = d.getTime();
	
		return seed;
	}
	
	//Convert seed to int
	StringToInt(seed){
		let intSeed = "";
		for(let i = 0; i < seed.length; i++){
			intSeed += seed.charCodeAt(i);
		}
		return intSeed;
	}
	
	//Generate a single pseudo-random number
	GenerateRandomNumber(){
		this.seed = (this.multiplier * this.seed + this.increment) % this.modulus;
	}
	
	//Return a single pseudo-random number
	GetRandomNumber(){
		this.GenerateRandomNumber();
		return this.seed;
	}
	
	//Return a single pseudo-random number within a minimum and maximum value
	GetRandomWithinRange(minNum, maxNum){
		this.GenerateRandomNumber();
		let percentage = this.seed / (this.modulus - 1);
	
		this.rangeNum = (maxNum - minNum + 1) * percentage;
		return Math.floor(this.rangeNum + minNum);
	}
	
	//Return an array of a specific amount of pseudo-random numbers
	GetRandomArray(amount){
		let listNum = new Array();
		for(let i = 0; i < amount; i++){
			this.GenerateRandomNumber();
			listNum[i] = this.seed;
		}
		return this.listNum;
	}
}