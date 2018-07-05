var Building =({name, sources,output, quantity = 0,buildingCount = 0} = {}) => ({
	name,
	sources,
	output,
	buildingCount,
	quantity,
	build(){
		this.safeName = safeName = name.replace(/\s+/g, '-').toLowerCase();
		this.el = el = document.createElement("div");
		el.building = this;
		el.setAttribute('id',safeName + "Building");
		el.setAttribute('class', 'building');
		
		this.buyButton = document.createElement("button");
		this.buyButton.className = 'img-idk';
		this.buyButton.className += ' img-' + safeName;
		this.buyButton.className += ' size-mid';
		this.buyButton.setAttribute('id',safeName + 'BuyButton');
		this.buyButton.onclick = function(){this.parentElement.building.buyBuilding();};
		el.appendChild(this.buyButton);
		this.buildingCountDisp = document.createElement("div");
		el.appendChild(this.buildingCountDisp);
		this.buildingCosts = document.createElement("div");
		costList = document.createElement("ul");
		this.buildingCosts.appendChild(costList);
		for(item in sources){
			thisItem = document.createElement("li");
			thisItem.innerHTML = sources[item].source.name + " " + sources[item].reqAmt ;
			costList.appendChild(thisItem);
		}
		el.appendChild(this.buildingCosts);
		
		
		
		this.dispQuantity = document.createElement("li");
		this.updateUI();
		console.log(sources);
		return el;
	},
	buyBuilding(){
	console.log("Buy Building");
		this.buildingCount++;
		this.updateUI();
	},
	getCost(){
		return Math.floor(10 * Math.pow(1.1, this.buildingCount));
	},
	removeQuantity(number){
		this.quantity = this.quantity - number;
		this.updateUI();
	},
	tick(){
		var canDo = this.buildingCount;
		for(var gath in this.sources){
			var thisSource = Math.floor(this.sources[gath].source.quantity / this.sources[gath].reqAmt);
			if(thisSource < canDo){
				canDo = thisSource;
			}
		}
		for(var gath in this.sources){
			this.sources[gath].source.removeQuantity(canDo * this.sources[gath].reqAmt);
		}
		this.quantity += canDo;
		
		this.updateUI();
	},
	updateUI(){
		this.dispQuantity.innerHTML = output + ": " + this.quantity;
		this.buildingCountDisp.innerHTML = "I have " + this.buildingCount;
	}
});