const scenes = [];
const scene1 = document.getElementById("scene-1");
const scene2 = document.getElementById("scene-2");
const scene3 = document.getElementById("scene-3");
const scene4 = document.getElementById("scene-4");
const scene5 = document.getElementById("scene-5");
const scene6 = document.getElementById("scene-6");
const buttons = document.querySelectorAll(".continuar");
scenes.push(scene1);
scenes.push(scene2);
scenes.push(scene3);
scenes.push(scene4);
scenes.push(scene5);
scenes.push(scene6);

const enemies = [
	new Enemy("Zombie", "images/zombie.png", 15, 80, "normal", 150),
	new Enemy("Creeper", "images/Creeper.png", 20, 60, "normal", 200),
	new Enemy("Chicken Zombie", "images/chickenzombie.png", 18, 70, "normal", 180),
	new Enemy("Enderman", "images/enderman.png", 20, 50, "normal", 120),
	new Boss("Ender Dragon", "images/Ender_Dragon.gif", 70, 500, 1.5, "boss", 500)
];

const marketProducts = [
	new Producto("Espada de diamante", "images/swordsSprite.png", 750, "Rara", "Arma", 20),
	new Producto("Espada de diamante encantada", "images/enchantredSword.png", 950, "Epica", "Arma", 40),
	new Producto("Pechera de diamante", "images/pecheraDiamante.png", 300, "Rara", "Armadura", 25),
	new Producto("Pechera de Netherite", "images/pecheraNetherite.png", 300, "Epica", "Armadura", 45),
	new Producto("Hacha de diamante", "images/diamondAxe.png", 250, "Rara", "Arma", 25),
	new Producto("Arco", "images/bow.png", 200, "Rara", "Arma", 18),
	new Producto("Pantalones de diamante", "images/pantalonesDiamante.png", 200, "Comun", "Armadura", 15),
	new Producto("Casco de diamante", "images/helmet.png", 100, "Comun", "Armadura", 10),
	new Producto("Poción curativa", "images/healPotion.png", 150, "Rara", "Consumible", 15),
	new Producto("Poción curativa", "images/healPotion.png", 350, "Epica", "Consumible", 25),
	new Producto("Poción curativa", "images/healPotion.png", 800, "Epica", "Consumible", 50),
];

marketProducts.forEach((product, index) => {
	product.id = index;
});

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

function renderEnemies() {
	const enemiesContainer = document.querySelector('.enemies-container');
	enemiesContainer.innerHTML = '';

	enemies.forEach(enemy => {
		const enemyCard = document.createElement('div');
		enemyCard.className = enemy.type === 'boss' ? 'enemy-card boss-card' : 'enemy-card';

		enemyCard.innerHTML = `
			<img src="${enemy.avatar}" alt="${enemy.name}" class="enemy-image">
			<h3 class="enemy-name">${enemy.name}</h3>
			<div class="enemy-stats">
				<p>Ataque: ${enemy.atackLevel}</p>
				<p>Vida: ${enemy.lifePoints}</p>
				<p>Tipo: ${enemy.type}</p>
			</div>
		`;
		enemiesContainer.appendChild(enemyCard);
	});
}

function initBattle() {
	currentEnemyIndex = 0;
	currentEnemy = enemies[currentEnemyIndex];
	battleInProgress = true;

	document.getElementById('player-name').textContent = player.name;
	document.getElementById('battle-player-life').textContent = player.life;
	document.getElementById('battle-player-attack').textContent = player.atack;
	document.getElementById('battle-player-defense').textContent = player.defense;

	document.getElementById('enemy-name').textContent = currentEnemy.name;
	document.getElementById('enemy-avatar').src = currentEnemy.avatar;
	document.getElementById('battle-enemy-life').textContent = currentEnemy.lifePoints;
	document.getElementById('battle-enemy-attack').textContent = currentEnemy.atackLevel;
	document.getElementById('battle-enemy-points').textContent = currentEnemy.points;

	document.getElementById('battle-messages').innerHTML = `<p>¡Comienza el combate contra ${currentEnemy.name}!</p>`;

	document.getElementById('attack-btn').style.display = 'inline-block';
	document.getElementById('next-enemy-btn').style.display = 'none';
	document.getElementById('battle-end-btn').style.display = 'none';
}

function playerAttack() {
	if (!battleInProgress) return;

	const battleResult = combat(currentEnemy, player);

	document.getElementById('battle-player-life').textContent = player.life;
	document.getElementById('battle-enemy-life').textContent = currentEnemy.lifePoints;

	const resultDiv = document.getElementById('battle-result');
	const damageInfoDiv = document.getElementById('battle-damage-info');

	damageInfoDiv.innerHTML = `
		<p style="color: #ff6b6b; font-size: 14px; margin: 5px 0;">
			🗡️ Jugador recibe: ${battleResult.damageToPlayer} daño
		</p>
		<p style="color: #4ecdc4; font-size: 14px; margin: 5px 0;">
			🛡️ Defensa bloquea: ${battleResult.blockedDamage} daño
		</p>
		<p style="color: #ffd700; font-size: 14px; margin: 5px 0;">
			⚔️ Jugador inflige: ${battleResult.damageToEnemy} daño
		</p>
	`;

	if (battleResult.winner === player.name) {
		player.addPoints(currentEnemy.points);
		resultDiv.innerHTML = `<p style="color: #00ff00; font-weight: bold;">¡${player.name} gana!</p><p style="color: #ffd700;">+${currentEnemy.points} puntos</p>`;
		updatePlayerStats();
		document.getElementById('attack-btn').style.display = 'none';

		if (currentEnemyIndex < enemies.length - 1) {
			document.getElementById('next-enemy-btn').style.display = 'inline-block';
		} else {
			battleInProgress = false;
			document.getElementById('battle-end-btn').style.display = 'inline-block';
		}
	} else {
		resultDiv.innerHTML = `<p style="color: #ff0000; font-weight: bold;">${currentEnemy.name} gana!</p><p style="color: #ff4444;">Game Over</p>`;
		updatePlayerStats();
		battleInProgress = false;
		document.getElementById('attack-btn').style.display = 'none';
		document.getElementById('battle-end-btn').textContent = 'Game Over';
		document.getElementById('battle-end-btn').style.display = 'inline-block';
	}
}

function nextEnemy() {
	currentEnemyIndex++;
	if (currentEnemyIndex >= enemies.length) return;

	currentEnemy = enemies[currentEnemyIndex];

	document.getElementById('enemy-name').textContent = currentEnemy.name;
	document.getElementById('enemy-avatar').src = currentEnemy.avatar;
	document.getElementById('battle-enemy-life').textContent = currentEnemy.lifePoints;
	document.getElementById('battle-enemy-attack').textContent = currentEnemy.atackLevel;
	document.getElementById('battle-enemy-points').textContent = currentEnemy.points;

	document.getElementById('battle-result').innerHTML = '';
	document.getElementById('battle-damage-info').innerHTML = '';
	document.getElementById('attack-btn').style.display = 'inline-block';
	document.getElementById('next-enemy-btn').style.display = 'none';
	battleInProgress = true;
}

document.getElementById('attack-btn')?.addEventListener('click', playerAttack);
document.getElementById('next-enemy-btn')?.addEventListener('click', nextEnemy);
document.getElementById('battle-end-btn')?.addEventListener('click', () => {
	if (player.life > 0) {
		const rank = player.points >= 2000 ? 'VETERANO' : 'NOVATO';
		document.getElementById('player-rank').textContent = rank;
		document.getElementById('final-points').textContent = `Puntos totales: ${player.points}`;

		scenes.forEach(scene => scene.style.display = 'none');
		if (scene6) scene6.style.display = 'flex';

		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 }
		});

		setTimeout(() => {
			confetti({
				particleCount: 50,
				angle: 60,
				spread: 55,
				origin: { x: 0 }
			});
			confetti({
				particleCount: 50,
				angle: 120,
				spread: 55,
				origin: { x: 1 }
			});
		}, 250);
	} else {
		location.reload();
	}
});

document.querySelector('#restart-btn').addEventListener('click', function () {
	location.reload();
});

const player = new Player("Héroe", "Steve.png", 0, [], 100, 100, 0, 0);

let currentEnemyIndex = 0;
let currentEnemy = null;
let battleInProgress = false;

function updatePlayerStats() {
	document.querySelectorAll('#ataque').forEach(el => el.querySelector('h3').textContent = `ataque:${player.atack}`);
	document.querySelectorAll('#defensa').forEach(el => el.querySelector('h3').textContent = `defensa:${player.defense}`);
	document.querySelectorAll('#vida').forEach(el => el.querySelector('h3').textContent = `vida:${player.life}`);
	document.querySelectorAll('#puntos').forEach(el => el.querySelector('h3').textContent = `puntos:${player.points}`);
}

function renderMarketProducts() {
	const marketDiv = document.querySelector(".market");
	marketDiv.innerHTML = "";

	marketProducts.forEach((product, index) => {
		const productCard = document.createElement("div");
		productCard.className = "product-card";

		if (product.bought) productCard.classList.add('sold');

		productCard.innerHTML = `
			<img src="${product.imag}" alt="${product.name}" class="product-image">
			<p class="product-price">${product.formatAttributes(product.cost)}</p>
			<button class="buy-btn ${product.bought ? 'return-btn' : ''}" data-product-id="${product.id}">${product.bought ? 'Devolver' : 'Comprar'}</button>
		`;
		marketDiv.appendChild(productCard);

		const buyBtn = productCard.querySelector(".buy-btn");
		buyBtn.addEventListener("click", () => {
			const productId = parseInt(buyBtn.dataset.productId);
			const productoEncontrado = marketProducts[productId];

			if (!productoEncontrado) return;

			if (productoEncontrado.bought) {
				const result = player.removeFromInventory(productoEncontrado);
				if (result.success) {
					productoEncontrado.bought = false;
					productCard.classList.remove('sold');
					buyBtn.classList.remove('return-btn');
					buyBtn.textContent = 'Comprar';
					renderInventory();
					updatePlayerStats();
					console.log(`${productoEncontrado.name} devuelto al mercado (slot ${result.slot})`);
				}
			} else {
				const result = player.addInventory(productoEncontrado);
				if (result.success) {
					productoEncontrado.bought = true;
					productCard.classList.add('sold');
					buyBtn.classList.add('return-btn');
					buyBtn.textContent = 'Devolver';
					renderInventory();
					updatePlayerStats();
					console.log(`${productoEncontrado.name} añadido al inventario (slot ${result.slot})`);
				} else {
					if (result.reason === 'no-space') console.log('Inventario lleno');
					else console.log('No se pudo comprar el producto:', result.reason);
				}
			}
		});
	});
}

function initScenes() {
	scenes.forEach(scene => scene.style.display = "none");
	if (scene1) scene1.style.display = "block";
	updatePlayerStats();
}


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
			if (nextScene === scene4) {
				renderEnemies();
			}
			if (nextScene === scene5) {
				nextScene.style.display = 'flex';
				initBattle();
				return;
			}
		}
	});
});
window.addEventListener("DOMContentLoaded", initScenes);