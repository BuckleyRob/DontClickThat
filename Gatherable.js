var Gatherable = ({name, quantity = 0, cutters = 0, dispQuantity} = {}) => ({
	name, 
	quantity, 
	cutters, 
	dispQuantity,
	build(){
		el = document.createElement("div"),
		el.setAttribute('id',name + "Gather"),
		el.setAttribute('class', 'gatherable');
		
		var gatherBtn = document.createElement('button');
		gatherBtn.setAttribute('class','img-' + name + ' size-mid');
		gatherBtn.onclick = this.doOnClick;
		gatherBtn.addQuantity = this.addQuantity;
		el.appendChild(gatherBtn);
		
		var buyCutterBtn = document.createElement('button');
		buyCutterBtn.appendChild(document.createTextNode('Buy ' + name + ' Cutter'));
		el.appendChild(buyCutterBtn);
		
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