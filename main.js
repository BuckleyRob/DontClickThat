class Gatherable {
	constructor(name, quantity, cutters) {
		this.name = name; // wood
		this.quantity = quantity; // 12
		this.cutters = cutters; // 2
	};
	initialize(){
		this.quantity = 0;
		this.cutters = 0;
		console.log(this.generateData());
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
	generateData(){
		var data = {[this.name]: this.quantity,
		[this.name+"Cutters"]: this.cutters}
		return data;
	}
	logit(){
		console.log(this.name+" has "+this.quantity+" and "+this.cutters+" cutters");
	}
	updateUI() {
		var error = "";
		if(document.getElementById(this.name+"Cutters") != null) {
			document.getElementById(this.name+"Cutters").innerHTML = this.cutters;
		} else {
			error = error + "\n Error: Expecting ElementById: "+this.name+"Cutters";
		}
		if(document.getElementById(this.name+"Disp") != null) {
			document.getElementById(this.name+"Disp").innerHTML = this.quantity;
		} else {
			error = error + "\n Error: Expecting ElementById: "+this.name+"Disp";
		}
		if(document.getElementById(this.name+"CutterCost") != null) {
			var nextCost = Math.floor(10 * Math.pow(1.1,this.cutters));
			document.getElementById(this.name+"CutterCost").innerHTML = nextCost;
		} else {
			error = error + "\n Error: Expecting ElementById: "+this.name+"CutterCost";
		}
		if(error != ""){
			console.error(error);
		}
		//this.logit();
	}	
}
var gatherableDict = {};
gatherableDict['wood'] = new Gatherable('wood',0,0);
gatherableDict['stone'] = new Gatherable('stone',0,0);
gatherableDict['vine'] = new Gatherable('vine',0,0);
gatherableDict['coal'] = new Gatherable('coal',0,0);

function gatherableClick(name, number){
	if(name in gatherableDict){
		gatherableDict[name].addQuantity(number);
	} else {
		console.error("No gatherable in list by name of "+name);
	}
	UpdateUI();
}
function UpdateUI(){
	for (var key in gatherableDict) {
		gatherableDict[key].updateUI();
	}
}
function buyGatherableCutterClick(name) {
	if(name in gatherableDict){
		var curCutterCost = Math.floor(10* Math.pow(1.1,gatherableDict[name].cutters));
		if(gatherableDict[name].quantity >= curCutterCost) {
			gatherableDict[name].addCutters(1);
			gatherableDict[name].removeQuantity(curCutterCost);
		}
		UpdateUI();
	}
}
function initialize(){
	for (var key in gatherableDict) {
		gatherableDict[key].initialize();
	}
}
function resetSave(){
	localStorage.removeItem("save");
	initialize();
}
function save(){
	var save = {};
	for(key in gatherableDict){
		save = Object.assign({},save,gatherableDict[key].generateData());
	}
	console.log(save);
	localStorage.setItem("save", JSON.stringify(save));
	console.log("I Saved");
}
function load(){
	initialize();
	var savegame = JSON.parse(localStorage.getItem("save"));
	if(typeof savegame.wood !== "undefined") {
		gatherableDict['wood'].setQuantity(savegame.wood);
	};
	if(typeof savegame.woodCutters !== "undefined") { 
		gatherableDict['wood'].setCutters(savegame.woodCutters);
		var nextCost = Math.floor(10 * Math.pow(1.1,gatherableDict['wood'].cutters));
	}
	if(typeof savegame.stone !== "undefined") {
		gatherableDict['stone'].setQuantity(savegame.stone);
	};
	if(typeof savegame.stoneCutters !== "undefined") { 
		gatherableDict['stone'].setCutters(savegame.stoneCutters);
		var nextCost = Math.floor(10 * Math.pow(1.1,gatherableDict['stone'].cutters));
	}
	if(typeof savegame.vine !== "undefined") {
		gatherableDict['vine'].setQuantity(savegame.vine);
	};
	if(typeof savegame.vineCutters !== "undefined") { 
		gatherableDict['vine'].setCutters(savegame.vineCutters);
		var nextCost = Math.floor(10 * Math.pow(1.1,gatherableDict['vine'].cutters));
	}
	
	UpdateUI();
}
window.onload = function(){
	load();
}
window.setInterval(function(){
	for (var key in gatherableDict) {
		gatherableClick(key,gatherableDict[key].cutters);
	}
}, 1000);
window.setInterval(function(){
	save();
},30000);