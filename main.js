/*
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
}*/
function save(){
document.getElementById("Gatherables").appendChild(new Gatherable.Gatherable());

	
	console.log("I Saved");
}/*
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
*/