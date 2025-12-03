export function filter(products,rarety) {
	let aux=products.filter( (product) => (
		product.rarety === rarety
	));
	
	return aux;
}

export function discount(cost, type) {
	const discounts = {
		"Arma": 10,
		"Armadura": 20,
		"Consumible": 30,
	};
	
	const discountPercent = discounts[type] || 10;
	return cost * (1 - discountPercent / 100);
}

export function searchProduct(products, name) {
	return products.filter(product => 
		product.name.toLowerCase().includes(name.toLowerCase())
	);
}