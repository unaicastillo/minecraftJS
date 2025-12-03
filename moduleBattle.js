function combat(enemy,player){
    let lifeP = player.life;
    let defenseP = player.defense;
    let atackP = player.atack;
    let atackE = enemy.atackLevel;
    let lifeE = enemy.lifePoints;
    let points = player.points;
    let jefe = enemy.type;
    while(lifeP>=0 && lifeE>=0){
        lifeP = lifeP - (atackE - defenseP);
        lifeE = lifeE - atackP;
        if(lifeE<=0){
            points+=100+atackE;
            if(jefe==="boss"){
                points*=enemy.multiDamage;
            }
            player.points = points;
            player.life = Math.max(0, lifeP);
            enemy.lifePoints = 0;
            return player.name;
        }
        if(lifeP<=0){
            player.life = 0;
            enemy.lifePoints = Math.max(0, lifeE);
            return enemy.name;
        }
    }
}