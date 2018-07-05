var Technology = ({name, requirements = {"Gatherables":[],"Buildings":[],"Technologies":[]}, bought = false} = {}) => ({
	name, 
	requirements, 
	bought,
	onAwake() {
		//What happens when this tech becomes bought
		//Send event of the Technology being bought;
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
		this.technologyBtn.onclick = function(){this.parentElement.technology.buyTech();};
		el.appendChild(this.technologyBtn);
		
		this.technologyTitle = document.createElement('p');
		this.technologyTitle.innerHTML = this.name;
		this.technologyTitle.className = 'title';
		this.technologyTitle.setAttribute('id',safeName + 'TechTitle');
		el.appendChild(this.technologyTitle);
		
		this.loadTech();
		
		this.updateUI();
		return el;
	},
	getCost(){
		return Math.floor(10 * Math.pow(1.1, this.cutters));
	},
	buyTech: function(){
		console.log("buying "+this.name);
		this.missingTech = 0;
		for(requirement in this.requirements["Technologies"]){
			if(!this.requirements["Technologies"][requirement].bought) {
				console.log("Technology required: "+this.requirements["Technologies"][requirement].name);
				this.missingTech += 1;
			}
		}
		for(requirement in this.requirements["Gatherables"]){
			console.log("Gatherable required");
			if(this.requirements["Gatherables"][requirement].quantity < 25) {
				this.missingTech += 1;
			}
		}
		if(this.missingTech == 0) {
			this.bought = true;
		} else {
			this.bought = false;
		}
		if(this.bought){
			console.log("BOUGHT: "+this.name);
			this.technologyBtn.className = this.technologyBtn.className.replace("tech-locked", "tech-bought");
			this.technologyBtn.disabled = true;
		}
		
		this.updateUI();
	},
	loadTech: function() {
		if(this.bought){
			console.log("LOADED AS BOUGHT: "+this.name);
			this.technologyBtn.className = this.technologyBtn.className.replace("tech-locked", "tech-bought");
			this.technologyBtn.disabled = true;
		}
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