const scenes=[];
const scene1= document.getElementById("scene-1");
const scene2= document.getElementById("scene-2");
const scene3= document.getElementById("scene-3");
const scene4= document.getElementById("scene-4");
scenes.push(scene1);
scenes.push(scene2);
scenes.push(scene3);
scenes.push(scene4);

const marketProducts = [
    new Producto("Espada de diamante", "images/swordsSprite.png", 750, "Rara", "Arma", 20),
    new Producto("Pechera de diamante", "images/pecheraDiamante.png", 300, "Rara", "Armadura",25),
    new Producto("Hacha de diamante", "images/diamondAxe.png", 250, "Rara", "Arma", 25),
    new Producto("Arco", "images/bow.png", 200, "Rara", "Arma", 18),
    new Producto("Arco", "images/bow.png", 150, "comun", "Arma", 13),
    new Producto("Pantalones de diamante", "images/pantalonesDiamante.png", 200, "Comun", "Armadura", 10),
    new Producto("Casco de diamante", "images/helmet.png", 100, "Comun", "Armadura", 10),
    new Producto("Poción curativa", "images/healPotion.png", 50, "Epica", "Consumible", 30),
];

function renderInventory() {
	const containers = document.querySelectorAll('.inventory-slots');
	containers.forEach(container => {
		const slots = container.querySelectorAll('.inventory-slot');
		slots.forEach((slot, index) => {
			slot.innerHTML = '';
			const item = player.inventory[index];
			if (item) {
				slot.innerHTML = `
					<img src="${item.imag}" alt="${item.name}" class="inventory-item-image">
					<p class="inventory-item-name">${item.name}</p>
				`;
				slot.classList.add('occupied');
			} else {
				slot.classList.remove('occupied');
			}
		});
	});
}

const player = new Player("Héroe", "Steve.png", 0, [], 100, 100, 0, 0);

function updatePlayerStats() {
	document.querySelectorAll('#ataque').forEach(el => el.querySelector('h3').textContent = `ataque:${player.atack}`);
	document.querySelectorAll('#defensa').forEach(el => el.querySelector('h3').textContent = `defensa:${player.defense}`);
	document.querySelectorAll('#vida').forEach(el => el.querySelector('h3').textContent = `vida:${player.life}`);
	document.querySelectorAll('#puntos').forEach(el => el.querySelector('h3').textContent = `puntos:${player.points}`);
}

function renderMarketProducts() {
	const marketDiv = document.querySelector(".market");
	marketDiv.innerHTML = ""; 
	
	marketProducts.forEach(product => {
		const productCard = document.createElement("div");
		productCard.className = "product-card";

		const boughtAttr = product.bought ? 'disabled' : '';
		if (product.bought) productCard.classList.add('sold');

		productCard.innerHTML = `
			<img src="${product.imag}" alt="${product.name}" class="product-image">
			<p class="product-price">${product.formatAttributes(product.cost)}</p>
			<button class="buy-btn" data-product-name="${product.name}" ${boughtAttr}>${product.bought ? 'Comprado' : 'Comprar'}</button>
		`;
		marketDiv.appendChild(productCard);

		const buyBtn = productCard.querySelector(".buy-btn");
		buyBtn.addEventListener("click", () => {
			if (product.bought) return;

			const productName = buyBtn.dataset.productName;
			const productoAComprar = marketProducts.find(p => p.name === productName);

			if (productoAComprar) {
				const result = player.addInventory(productoAComprar);
				if (result.success) {
					productoAComprar.bought = true;
					productCard.classList.add('sold');
					buyBtn.disabled = true;
					buyBtn.textContent = 'Comprado';
					renderInventory();
					updatePlayerStats();
					console.log(`${productoAComprar.name} añadido al inventario (slot ${result.slot})`);
				} else {
					if (result.reason === 'insufficient-funds') console.log('Fondos insuficientes');
					else if (result.reason === 'no-space') console.log('Inventario lleno');
					else console.log('No se pudo comprar el producto:', result.reason);
				}
			}
		});
	});
}

function initScenes() {
	scenes.forEach(scene => scene.style.display = "none");
	scene1.style.display = "block";
	updatePlayerStats(); 
}

const buttons = document.querySelectorAll(".continuar");

buttons.forEach(btn => {
	btn.addEventListener("click", e => {
		let currentScene = e.target.closest(".scene");
		if (!currentScene) return;
		
		const currentIndex = scenes.indexOf(currentScene);
		
		if (currentIndex < scenes.length - 1) {
			scenes.forEach(scene => scene.style.display = "none");
			const nextScene = scenes[currentIndex + 1];
			nextScene.style.display = "block";
			renderInventory();
			updatePlayerStats();
			if (nextScene === scene2) {
				renderMarketProducts();
			}
		}
	});
});
window.addEventListener("DOMContentLoaded", initScenes);