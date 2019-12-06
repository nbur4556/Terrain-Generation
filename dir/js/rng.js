//Returns miliseconds from 01/01/1970 as a seed for Pseudo-Random Number Generator's
function generateSeed(){
	var d = new Date;
	var seed = d.getTime();
	
	return seed;
}

//Javascript Default Random Number Generator
function defaultRNG(){
	console.log(Math.random());
	return Math.random();
}

//LCG Pseudo-Random Number Generator
var lcgRNG = function(seed){
	//Determine if seed is valid
	if(seed == undefined){
		this.seed = generateSeed();
	}
	else if(Number.isInteger(seed)){
		this.seed = seed;
	}
	else{
		this.seed = stringToInt(seed);
	}
	
	//Initialize
	this.initDefault();
	//console.log("seed: " + this.seed);
	
	//Convert seed to int
	function stringToInt(){
		var r = "";
		for(let i = 0; i < seed.length; i++){
			r += seed.charCodeAt(i);
			//console.log(seed.charCodeAt(i));
		}
		return r;
	}
}
//Initialize Default Values
lcgRNG.prototype.initDefault = function(){
	this.multiplier = 8121;
	this.modulus = 134456;
	this.increment = 28411;
}
//Initialize 32 Bit Values
lcgRNG.prototype.init32Bit = function(){
	this.multiplier = 214013;
	this.modulus = 4294967296;
	this.increment = 2531011;
}
//Generate a single pseudo-random number
lcgRNG.prototype.generateRandomNumber = function(){
	this.seed = (this.multiplier * this.seed + this.increment) % this.modulus;
}
//Return a single pseudo-random number
lcgRNG.prototype.getRandom = function(){
	this.generateRandomNumber();
	return this.seed;
}
//Return a single pseudo-random number within a minimum and maximum value
lcgRNG.prototype.getRandomWithinRange = function(minNum, maxNum){
	this.generateRandomNumber();
	this.percentage = this.seed / (this.modulus - 1);
	
	this.rangeNum = (maxNum - minNum + 1) * this.percentage;
	return Math.floor(this.rangeNum + minNum);
}
//Get an array of a specific amount of pseudo-random numbers
lcgRNG.prototype.getRandomArray = function(amount){
	this.listNum = new Array();
	for(let i = 0; i < amount; i++){
		this.generateRandomNumber();
		this.listNum[i] = this.seed;
	}
	return this.listNum;
}
/*
lcgRNG.prototype.getNumberWithinRange = function(minNum,maxNum){	
	//Tends to favor specific numbers
	this.generateRandomNumber();
	this.rangedSeed = this.seed;
	
	while(this.rangedSeed >= 1){
		this.rangedSeed = this.rangedSeed / 10;
	}
	
	//Setting Range
	this.offset = Math.floor(maxNum / 10);
	this.rangedSeed = this.rangedSeed * (maxNum - minNum + this.offset + 1);
	return Math.floor(this.rangedSeed + minNum - this.offset);
}
*/