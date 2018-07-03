var Technology = ({name, requiredTech = {}, unlocked = false} = {}) => ({
	name, 
	requiredTech, 
	unlocked,
	onAwake() {
		//What happens when this tech becomes unlocked
		//Send event of the Technology being unlocked;
	},
	build() {
		this.safeName = safeName = name.replace(/\s+/g, '-').toLowerCase();
		el = document.createElement("div"),
		el.setAttribute('id',safeName + "Tech"),
		el.setAttribute('class', 'technology');
		el.technology = this;
		
		this.technologyBtn = document.createElement('button');
		this.technologyBtn.className = 'img-idk';
		this.technologyBtn.className += ' img-' + safeName;
		this.technologyBtn.className += ' size-mid';
		this.technologyBtn.className += ' tech-locked';
		this.technologyBtn.setAttribute('id',safeName + 'TechBtn');
		this.technologyBtn.disabled = true;
		this.technologyBtn.onclick = function(){this.parentElement.technology.buyTech();};
		el.appendChild(this.technologyBtn);
		
		this.missingTech = 1;
		for(rTech in requiredTech){
			if(!rTech.unlocked) {
				this.missingTech += 1;
			}
		}
		if(this.missingTech == 0) {
			this.unlocked = true;
		} else {
			this.unlocked = false;
		}
		if(!this.unlocked){
			this.technologyBtn.className = this.technologyBtn.className.replace("tech-unlocked", "tech-locked");
			this.technologyBtn.disabled = false;
		}
		
		this.updateUI();
		return el;
	},
	getCost(){
		return Math.floor(10 * Math.pow(1.1, this.cutters));
	},
	buyTech: function(){
		alert("ding");
		this.missingTech = 0;
		for(rTech in requiredTech){
			if(!rTech.unlocked) {
				this.missingTech += 1;
			}
		}
		if(this.missingTech == 0) {
			this.unlocked = true;
		} else {
			this.unlocked = false;
		}
		if(this.unlocked){
			this.technologyBtn.className = this.technologyBtn.className.replace("tech-locked", "tech-unlocked");
			this.technologyBtn.disabled = true;
		}
		
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
		/*
		var nextCost = this.getCost();
		this.buyCutterBtn.innerHTML = 'Buy ' + name + ' Cutter (' + nextCost + ' ' + name + ')';
		this.buyCutterBtn.disabled = !(this.quantity >= nextCost);
		this.cutterLbl.innerHTML = 'Cutters ' + this.cutters;
		this.dispQuantity.innerHTML = name + ": " + this.quantity;
		*/
	}
});