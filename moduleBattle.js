function combat(enemy,player){
    let lifeP = player.life;
    let defenseP = player.defense;
    let atackP = player.atack;
    let atackE = enemy.atackLevel;
    let lifeE = enemy.lifePoints;
    let points = player.points;
    let jefe = enemy.type;
    let consumableUsed = false;
    
    if (enemy.multiDamage) {
        atackE = Math.floor(atackE * enemy.multiDamage);
    }
    
    let damageToPlayer = Math.max(0, atackE - defenseP);
    let blockedDamage = Math.max(0, atackE - damageToPlayer);
    let damageToEnemy = atackP;
    
    while(lifeP>=0 && lifeE>=0){
        let damage = Math.max(0, atackE - defenseP);
        lifeP = lifeP - damage;
        player.life = lifeP;
        
        if (lifeP < player.maxLife * 0.5 && lifeP > 0 && !consumableUsed) {
            const result = player.useConsumable();
            if (result.success) {
                lifeP = player.life;
                consumableUsed = true;
            }
        }
        
        lifeE = lifeE - atackP;
        enemy.lifePoints = lifeE;
        if(lifeE<=0){
            player.life = Math.max(0, lifeP);
            enemy.lifePoints = 0;
            return {
                winner: player.name,
                damageToPlayer: damageToPlayer,
                blockedDamage: blockedDamage,
                damageToEnemy: damageToEnemy
            };
        }
        if(lifeP<=0){
            player.life = 0;
            enemy.lifePoints = Math.max(0, lifeE);
            return {
                winner: enemy.name,
                damageToPlayer: damageToPlayer,
                blockedDamage: blockedDamage,
                damageToEnemy: damageToEnemy
            };
        }
    }
}