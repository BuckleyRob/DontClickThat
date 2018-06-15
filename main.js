class Gatherable {
	constructor(name, quantity, cutters) {
		this.name = name; // wood
		this.quantity = quantity; // 12
		this.cutters = cutters; // 2
	};
	initialize(){
		this.quantity = 0;
		this.cutters = 0;
	}
	addQuantity(number){
		this.quantity = this.quantity + number;
	}
	setQuantity(number){
		this.quantity = number;
	}
	removeQuantity(number){
		this.quantity = this.quantity - number;
	}
	addCutters(number){
		this.cutters = this.cutters + number;
	}
	setCutters(number){
		this.cutters = number;
	}
	removeCutters(number){
		this.cutters = this.cutters - number;
	}
	logit(){
		console.log(this.name+" has "+this.quantity+" and "+this.cutters+" cutters");
	}
	updateUI() {
		document.getElementById(this.name+"Cutters").innerHTML = this.cutters;
		document.getElementById(this.name+"Disp").innerHTML = this.quantity;
		
		var nextCost = Math.floor(10 * Math.pow(1.1,this.cutters));
		document.getElementById(this.name+"CutterCost").innerHTML = nextCost;
		this.logit();
	}	
}
var wood = 0;
var woodCutters = 0;

var gWood = new Gatherable("wood",0,0);
var gStone = new Gatherable("stone",0,0);
var gVine = new Gatherable("vine",0,0);

function gatherableClick(name, number){
	if(name == 'wood'){
		gWood.addQuantity(number);
	} else if (name == 'stone'){
		gStone.addQuantity(number);
	} else if (name == 'vine'){
		gVine.addQuantity(number);
	}
	UpdateUI();
}
function UpdateUI(){
	gWood.updateUI();
	gStone.updateUI();
	gVine.updateUI();
}
function buyGatherableCutterClick(name) {
	var numcutters;
	var gCutterCost;
	if(name == 'wood'){
		gCutterCost = Math.floor(10 * Math.pow(1.1,gWood.cutters));
		if(gWood.quantity >= gCutterCost){
			gWood.addCutters(1);
			gWood.removeQuantity(gCutterCost);
		}
	} else if (name == 'stone'){
		gCutterCost = Math.floor(10 * Math.pow(1.1,gStone.cutters));
		if(gStone.quantity >= gCutterCost){
			gStone.addCutters(1);
			gStone.removeQuantity(gCutterCost);
		}
	} else if (name == 'vine'){
		gCutterCost = Math.floor(10 * Math.pow(1.1,gVine.cutters));
		if(gVine.quantity >= gCutterCost){
			gVine.addCutters(1);
			gVine.removeQuantity(gCutterCost);
		}
	}
	UpdateUI();
}
function initialize(){
	gWood.initialize();
	gStone.initialize();
	gVine.initialize();
}
function resetSave(){
	localStorage.removeItem("save");
	initialize();
}
function save(){
	var save = {
		wood: gWood.quantity,
		woodCutters: gWood.cutters,
		stone: gStone.quantity,
		stoneCutters: gStone.cutters,
		vine: gVine.quantity,
		vineCutters: gVine.cutters
	}
	localStorage.setItem("save", JSON.stringify(save));
	console.log("I Saved");
}
function load(){
	initialize();
	var savegame = JSON.parse(localStorage.getItem("save"));
	if(typeof savegame.wood !== "undefined") {
		gWood.setQuantity(savegame.wood);
	};
	if(typeof savegame.woodCutters !== "undefined") { 
		gWood.setCutters(savegame.woodCutters);
		var nextCost = Math.floor(10 * Math.pow(1.1,gWood.cutters));
	}
	if(typeof savegame.stone !== "undefined") {
		gStone.setQuantity(savegame.stone);
	};
	if(typeof savegame.stoneCutters !== "undefined") { 
		gStone.setCutters(savegame.stoneCutters);
		var nextCost = Math.floor(10 * Math.pow(1.1,gStone.cutters));
	}
	if(typeof savegame.vine !== "undefined") {
		gVine.setQuantity(savegame.vine);
	};
	if(typeof savegame.vineCutters !== "undefined") { 
		gVine.setCutters(savegame.vineCutters);
		var nextCost = Math.floor(10 * Math.pow(1.1,gVine.cutters));
	}
	
	UpdateUI();
}
window.onload = function(){
	load();
}
window.setInterval(function(){
gatherableClick('wood',gWood.cutters);
gatherableClick('stone',gStone.cutters);
gatherableClick('vine',gVine.cutters);
}, 1000);
window.setInterval(function(){
	save();
},30000);