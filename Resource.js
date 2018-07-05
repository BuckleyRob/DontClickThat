var Resource = ({name, display, quantity = 0}={}) => ({
	name,
	display,
	quantity,
	addQuantity(number){
		quantity += number;
		this.updateUI();
	},
	removeQuantity(number){
		this.quantity = this.quantity - number;
		this.updateUI();
	},
	updateUI() {
		this.display.innerHTML = name + ": " + quantity;
	}
});