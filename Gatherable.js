var Gatherable = ({name, quantity = 0, cutters = 0, dispQuantity} = {}) => ({
	name, 
	quantity, 
	cutters, 
	dispQuantity,
	build(){
		el = document.createElement("div"),
		el.setAttribute('id',name + "Gather"),
		el.setAttribute('class', 'gatherable');
		var btn = document.createElement('button');
		btn.setAttribute('class','img-' + name + ' size-mid');
		btn.onclick = this.doOnClick;
		btn.addQuantity = this.addQuantity;
		el.appendChild(btn);
		
		return el;
	},
	doOnClick(e){
		this.addQuantity(1);
	},
	addQuantity: function(number){
		quantity = quantity + 1;
		dispQuantity.innerHTML= quantity;
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
		dispQuantity.innerHTML = this.quantity;
		
		var nextCost = Math.floor(10 * Math.pow(1.1,this.cutters));
		document.getElementById(this.name+"CutterCost").innerHTML = nextCost;
		//this.logit();
	}
});