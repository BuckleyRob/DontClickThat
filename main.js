var gatherTypes = ["wood","stone","vine"];

var gatherableDict = {};


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
window.onload = function(){
	load();
}
function load(){
	var saveItem = localStorage.getItem("save");
	var savegame = JSON.parse(saveItem !== null?saveItem:"{}");
	
	var gathers = {};
	gatherTypes.forEach(function(element){
		var opts = {
			name: element,
			quantity: typeof savegame[element] !== "undefined"?savegame[element]:0,
			cutters: typeof savegame[element] !== "undefined"?savegame[element]:0,
			dispQuantity: document.getElementById(element + "Disp")
		}
		addGatherable(Gatherable(opts));
	});
}
function addGatherable(gatherable){
	document.getElementById("Gatherables").appendChild(gatherable.build());
}
/*
window.setInterval(function(){
	for (var key in gatherableDict) {
		gatherableClick(key,gatherableDict[key].cutters);
	}
}, 1000);
window.setInterval(function(){
	save();
},30000);
*/