var Gatherable = ({name, quantity = 0, cutters = 0, dispQuantity} = {}) => ({
	name, 
	quantity, 
	cutters, 
	dispQuantity,
	build(){
		el = document.createElement("div"),
		el.setAttribute('id',name + "Gather"),
		el.setAttribute('class', 'gatherable');
		el.gatherable = this;
		
		this.gatherBtn = document.createElement('button');
		this.gatherBtn.setAttribute('class','img-' + name + ' size-mid');
		this.gatherBtn.onclick = function(){this.parentElement.gatherable.addQuantity(1);};
		el.appendChild(this.gatherBtn);
		
		this.buyCutterBtn = document.createElement('button');
		
		this.buyCutterBtn.onclick = function(){this.parentElement.gatherable.addCutters(1);};
		el.appendChild(this.buyCutterBtn);

		this.cutterLbl = document.createElement('span','Cutters ' + this.cutters);
		el.appendChild(this.cutterLbl);

		
		this.updateUI();
		return el;
	},
	getCost(){
		return Math.floor(10 * Math.pow(1.1, this.cutters));
	},
	addQuantity: function(number){
		this.quantity = this.quantity + number;
		this.updateUI();
	},
	setQuantity(number){
		this.quantity = number;
	},
	removeQuantity(number){
		this.quantity = this.quantity - number;
	},
	addCutters(number){
		var cost = this.getCost();
		if(this.quantity >= cost){
			this.addQuantity(-cost);
			this.cutters = this.cutters + number;
		}
		this.updateUI();
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
		var nextCost = this.getCost();
		this.buyCutterBtn.innerHTML = 'Buy ' + name + ' Cutter (' + nextCost + ' ' + name + ')';
		this.buyCutterBtn.disabled = !(this.quantity >= nextCost);
		this.cutterLbl.innerHTML = 'Cutters ' + this.cutters;
		dispQuantity.innerHTML = this.quantity;
	}
});