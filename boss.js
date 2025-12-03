class Boss extends Enemy{
    constructor(name,avatar,atackLevel,livePoints, multiDamage,type){
        super(name,avatar,atackLevel,livePoints,type);
        this.multiDamage=multiDamage*1.2;
        this.type="boss";
    }
}