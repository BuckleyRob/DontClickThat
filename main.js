var gatherTypes = ["wood","stone","vine"];
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
	var dispElem = 2;
	

	
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
gatherableClick('wood',gWood.cutters);
gatherableClick('stone',gStone.cutters);
gatherableClick('vine',gVine.cutters);
}, 1000);
window.setInterval(function(){
	save();
},30000);
*/