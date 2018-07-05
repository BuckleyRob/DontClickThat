var gatherTypes = ["Wood","Stone","Vine"];

var gatherableDict = {};
var buildingDict = {};

function resetSave(){
	gatherableDict = {};
	buildingDict = {};
	localStorage.removeItem("save");
	load();
}
function save(){
	var save = {};
	for(key in gatherableDict){
		save[key] = gatherableDict[key].generateData();
	}
	localStorage.setItem("save", JSON.stringify(save));
	console.log("I Saved");
}
window.onload = function(){
	load();
}
function load(){
	var resourceDisp = document.getElementById('ResourceList');
	while(resourceDisp.firstChild){
		resourceDisp.removeChild(resourceDisp.firstChild);
	}
	var gath = document.getElementById('Gatherables');
	while(gath.firstChild){
		gath.removeChild(gath.firstChild);
	}
	var saveString = localStorage.getItem("save");
	var saveGame = JSON.parse(saveString !== null?saveString:"{}");
	if(Object.keys(saveGame).length > 0){
		console.log("savegame key length greater than zero")
		for(var saveItem in saveGame){
			var opts = {
				name: saveItem,
				quantity: saveGame[saveItem].quantity,
				cutters: saveGame[saveItem].cutters
			}
			addGatherable(Gatherable(opts));
		}
	}else{
		console.log("savegame empty, starting new");
		gatherTypes.forEach(element => {
			console.log("loading " + element);
			var opts = {
				name: element,
				quantity: 0,
				cutters: 0
			}
			addGatherable(Gatherable(opts));
		});
	}
	opts = {
		name:'Wood',
		sources:[
			{source:gatherableDict['Wood'],reqAmt:2},
			{source:gatherableDict['Stone'],reqAmt:3}
		],
		output:'Wood Stone Thing',
		count:0};
	var niceB = Building(opts);
	addBuilding(niceB);
	
}
function addBuilding(building){
	document.getElementById("Buildings").appendChild(building.build());
	document.getElementById("ResourceList").appendChild(building.dispQuantity);
	buildingDict[building.name] = building;
}
function addGatherable(gatherable){
	document.getElementById("Gatherables").appendChild(gatherable.build());
	document.getElementById("ResourceList").appendChild(gatherable.dispQuantity);
	gatherableDict[gatherable.name] = gatherable;
}
window.setInterval(function(){
	for (var key in gatherableDict) {
		gatherableDict[key].tick();
	}
	for (var key in buildingDict) {
		buildingDict[key].tick();
	}
}, 1000);
window.setInterval(function(){
	save();
},5000);
