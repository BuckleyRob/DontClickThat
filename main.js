var gatherTypes = ["Wood","Stone","Vine","IDK what this is, its a thing"];

var gatherableDict = {};
var technologyDict = {};

function resetSave(){
	gatherableDict = {};
	technologyDict = {};
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
	var params0 = {
		name: "TestTechnology0",
		requirements: {"Gatherables":[],"Buildings":[],"Technologies":[]}, 
		bought: false
	}
	var tech0 = Technology(params0);
	addTechnology(tech0);
	var params1 = {
		name: "TestTechnology1",
		requirements: {"Gatherables":[],"Buildings":[],"Technologies":[tech0]}, 
		bought: false
	}
	var tech1 = Technology(params1);
	addTechnology(tech1);
	var params2 = {
		name: "TestTechnology2",
		requirements: {"Gatherables":[],"Buildings":[],"Technologies":[tech0]}, 
		bought: false
	}
	var tech2 = Technology(params2);
	addTechnology(tech2);
	var params3 = {
		name: "TestTechnology3",
		requirements: {"Gatherables":[],"Buildings":[],"Technologies":[tech1,tech2]}, 
		bought: false
	}
	var tech3 = Technology(params3);
	addTechnology(tech3);
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
}
function addGatherable(gatherable){
	document.getElementById("Gatherables").appendChild(gatherable.build());
	document.getElementById("ResourceList").appendChild(gatherable.dispQuantity);
	gatherableDict[gatherable.name] = gatherable;
}
function addTechnology(technology){
	document.getElementById("TechTree").appendChild(technology.build());
	technologyDict[technology.name] = technology;
}
window.setInterval(function(){
	for (var key in gatherableDict) {
		gatherableDict[key].tick();
	}
}, 1000);
window.setInterval(function(){
	save();
},5000);
