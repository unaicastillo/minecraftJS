class Player {
    constructor(name,avatar,points,inventory,life,maxLife,defense,atack){
        this.avatar=avatar;
        this.name=name; 
        this.points=points;
        if (!Array.isArray(inventory) || inventory.length === 0) {
            this.inventory = new Array(6).fill(null);
        } else {
            this.inventory = new Array(6).fill(null);
            for (let i = 0; i < Math.min(6, inventory.length); i++) {
                this.inventory[i] = inventory[i];
            }
        }

        this.atack = 0;
        this.defense = 0;
        this.life = 100;
        this.maxLife = 100;
    }
    addInventory(product) {


        const emptyIndex = this.inventory.findIndex(slot => slot === null);
        if (emptyIndex === -1) {
            return { success: false, reason: 'no-space' };
        }

        this.inventory[emptyIndex] = product;

        this.applyProductBonus(product);

        return { success: true, slot: emptyIndex };
    }
    
    applyProductBonus(product) {
        if (!product || typeof product.bonus !== 'number') return;
        const type = (product.type || '').toLowerCase();
        if ( type.includes('armadura')) {
            this.defense += product.bonus;
        } else if (type.includes('arma')) {
            this.atack += product.bonus;
        } else if (type.includes('consumible')) {
            this.life = Math.min(this.maxLife, this.life + product.bonus);
        }
    }
    addPoints(){

    }
    getTotalAtack(){

    }
    getTotalDefense(){

    }
    getLifeTotal(){
        
    }
}