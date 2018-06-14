var wood = 0;
var woodCutters = 0;
function treeClick(number){
	wood = wood + number;
	UpdateUIWood();
}
function buyWoodCutterClick(){
	var woodCutterCost = Math.floor(10 * Math.pow(1.1, woodCutters));
	if(wood >= woodCutterCost){
		woodCutters = woodCutters + 1;
		wood = wood - woodCutterCost;
	}
	UpdateUIWood();
}
function UpdateUIWood(){
	document.getElementById("woodCutters").innerHTML = woodCutters;
	document.getElementById("woodDisp").innerHTML = wood;
	
	var nextCost = Math.floor(10 * Math.pow(1.1,woodCutters));
	document.getElementById("woodCutterCost").innerHTML = nextCost;
}
function initialize(){
	wood = 0;
	woodCutters = 0;
}
function resetSave(){
	localStorage.removeItem("save");
	wood = 0;
	woodCutters = 0;
	
}
function save(){
	var save = {
		wood: wood,
		woodCutters: woodCutters
	}
	localStorage.setItem("save", JSON.stringify(save));
	console.log("I Saved");
}
function load(){
	initialize();
	var savegame = JSON.parse(localStorage.getItem("save"));
	if(typeof savegame.wood !== "undefined") {
		wood = savegame.wood;
	};
	if(typeof savegame.woodCutters !== "undefined") { 
		woodCutters = savegame.woodCutters;
		var nextCost = Math.floor(10 * Math.pow(1.1,woodCutters));
	}
	
	UpdateUIWood();
}
window.onload = function(){
	load();
}
window.setInterval(function(){
treeClick(woodCutters);
}, 1000);
window.setInterval(function(){
	save();
},30000);