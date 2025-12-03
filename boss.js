class Boss extends Enemy{
    constructor(name,avatar,atackLevel,livePoints, multiDamage,type){
        super(name);
        super(avatar);
        super(atackLevel);
        super(livePoints);
        this.multiDamage=multiDamage*1.2;
        this.type="boss";
    }
    
}