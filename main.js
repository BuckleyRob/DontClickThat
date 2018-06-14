var wood = 0;
var woodCutters = 0;
function treeClick(number){
	wood = wood + number;
	document.getElementById("woodDisp").innerHTML = wood;
}
function buyWoodCutterClick(){
var woodCutterCost = Math.floor(10 * Math.pow(1.1, woodCutters));
	if(wood >= woodCutterCost){
		woodCutters = woodCutters + 1;
		wood = wood - woodCutterCost;
		document.getElementById("woodCutters").innerHTML = woodCutters;
		document.getElementById("woodDisp").innerHTML = wood;
	}
	var nextCost = Math.floor(10 * Math.pow(1.1,woodCutters));
	document.getElementById("woodCutterCost").innerHTML = nextCost;
}
window.setInterval(function(){
treeClick(woodCutters);
}, 1000);