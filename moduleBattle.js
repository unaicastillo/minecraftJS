export function combat(enemy,player){
    let lifeP = player.life;
    let defenseP = player.defense;
    let atackP = player.atack;
    let atackE = enemy.atack;
    let lifeE = enemy.lifePoints;
    let points = player.points;
    let jefe = enemy.type;
    while(lifeP>=0||lifeE>=0){
        lifeP=(lifeP+defenseP)-atackE;
        lifeE=lifeE-atackP;
        if(lifeE>=0){
            points+=100+atackE;
            if(jefe="boss"){
                points*enemy.multiDamage;
            }
            return enemy.name;
        }
        else{
            return player.name;
        }
    }
}