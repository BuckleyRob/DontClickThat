var Gatherable = ({name, quantity = 0, cutters = 0} = {}) => ({
	name, 
	quantity, 
	cutters,
	build(){
		this.safeName = safeName = name.replace(/\s+/g, '-').toLowerCase();
		el = document.createElement("div"),
		el.setAttribute('id',safeName + "Gather"),
		el.setAttribute('class', 'gatherable');
		el.gatherable = this;
		
		this.gatherBtn = document.createElement('button');
		this.gatherBtn.className = 'img-idk';
		this.gatherBtn.className += ' img-' + safeName;
		this.gatherBtn.className += ' size-mid';
		this.gatherBtn.setAttribute('id',safeName + 'GatherBtn');
		this.gatherBtn.onclick = function(){this.parentElement.gatherable.addQuantity(1);};
		el.appendChild(this.gatherBtn);
		
		this.buyCutterBtn = document.createElement('button');
		this.buyCutterBtn.setAttribute('id',safeName + 'BuyCutterBtn');
		
		this.buyCutterBtn.onclick = function(){this.parentElement.gatherable.addCutters(1);};
		el.appendChild(this.buyCutterBtn);

		this.cutterLbl = document.createElement('span','Cutters ' + this.cutters);
		this.cutterLbl.setAttribute('id',safeName + 'CutterLbl');
		el.appendChild(this.cutterLbl);

		this.dispQuantity = document.createElement("li");

		// this.testBtn = document.createElement('button');
		// this.testBtn.innerHTML = "Test Tick";
		// this.testBtn.onclick = function(){this.parentElement.gatherable.tick();};
		// el.appendChild(this.testBtn);
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
	tick(){
		this.addQuantity(this.cutters);
		this.updateUI();
	},
	generateData(){
		return {
			quantity: this.quantity,
			cutters: this.cutters
		};
	},
	updateUI() {
		var nextCost = this.getCost();
		this.buyCutterBtn.innerHTML = 'Buy ' + name + ' Cutter (' + nextCost + ' ' + name + ')';
		this.buyCutterBtn.disabled = !(this.quantity >= nextCost);
		this.cutterLbl.innerHTML = 'Cutters ' + this.cutters;
		this.dispQuantity.innerHTML = name + ": " + this.quantity;
	}
});