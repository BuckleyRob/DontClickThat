var Building =({name, sources,output, count = 0} = {}) => ({
	name,
	sources,
	output,
	count,
	build(){
		this.safeName = safeName = name.replace(/\s+/g, '-').toLowerCase();
		this.el = el = document.createElement("div");
		el.setAttribute('id',safeName + "Building");
		el.setAttribute('class', 'building');
		el.innerHTML = "This is a " + safeName + " Building";
		el.building = this;
		
		this.dispQuantity = document.createElement("li");
		return el;
	},
	tick(){
		var canDo = true;
		for(var gath in this.sources){
			canDo = canDo &&(this.sources[gath].quantity >= 5);
		}
		if(canDo){
			for(var gath in this.sources){
				this.sources[gath].removeQuantity(5);
			}
			this.count++;
		}
		this.updateUI();
	},
	updateUI(){
		this.dispQuantity.innerHTML = name + ": " + this.quantity;
		this.el.innerHTML = "I have " + this.count;
	}
});