var Gatherable = {
	Gatherable: function(name, quantity, cutters) {
		this.name = name;
		this.quantity = quantity;
		this.cutters = cutters;
		var el = document.createElement("button");
		el.setAttribute('class','img-tree size-mid');
		el.onClick = function(){console.log("asd");};
		return el;
	},
	doOnClick(){
		addQuantity(1);
	},
	addQuantity(number){
		this.quantity = this.quantity + number;
		console.log("heyeyey");
		document.getElementById('woodDisp').innerHTML=this.quantity;
	},
	setQuantity(number){
		this.quantity = number;
	},
	removeQuantity(number){
		this.quantity = this.quantity - number;
	},
	addCutters(number){
		this.cutters = this.cutters + number;
	},
	setCutters(number){
		this.cutters = number;
	},
	removeCutters(number){
		this.cutters = this.cutters - number;
	},
	logit(){
		console.log(this.name+" has "+this.quantity+" and "+this.cutters+" cutters");
	},
	updateUI() {
		document.getElementById(this.name+"Cutters").innerHTML = this.cutters;
		document.getElementById(this.name+"Disp").innerHTML = this.quantity;
		
		var nextCost = Math.floor(10 * Math.pow(1.1,this.cutters));
		document.getElementById(this.name+"CutterCost").innerHTML = nextCost;
		//this.logit();
	},
}