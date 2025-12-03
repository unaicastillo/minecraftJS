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
        }
    }
    
    removeProductBonus(product) {
        if (!product || typeof product.bonus !== 'number') return;
        const type = (product.type || '').toLowerCase();
        if ( type.includes('armadura')) {
            this.defense = Math.max(0, this.defense - product.bonus);
        } else if (type.includes('arma')) {
            this.atack = Math.max(0, this.atack - product.bonus);
        }
    }
    
    removeFromInventory(product) {
        const productIndex = this.inventory.findIndex(item => item && item.id === product.id);
        if (productIndex === -1) {
            return { success: false, reason: 'not-found' };
        }
        
        this.inventory[productIndex] = null;
        this.removeProductBonus(product);
        
        return { success: true, slot: productIndex };
    }
    
    useConsumable() {
        const consumableIndex = this.inventory.findIndex(item => {
            if (!item) return false;
            const type = (item.type || '').toLowerCase();
            return type.includes('consumible');
        });
        
        if (consumableIndex === -1) {
            return { success: false, reason: 'no-consumable' };
        }
        
        const consumable = this.inventory[consumableIndex];
        const oldLife = this.life;
        this.life = Math.min(this.maxLife, this.life + consumable.bonus);
        const healedAmount = this.life - oldLife;
        
        this.inventory[consumableIndex] = null;
        
        return { 
            success: true, 
            item: consumable, 
            healedAmount: healedAmount 
        };
    }
    addPoints(points){
        this.points += points;
    }
    getTotalAtack(){
        this.atack;
    }
    getTotalDefense(){
        this.defense;
    }
    getLifeTotal(){
        this.life;
    }
}