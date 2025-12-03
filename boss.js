class Boss extends Enemy{
    constructor(name,avatar,atackLevel,livePoints, multiDamage,type,points){
        super(name,avatar,atackLevel,livePoints,type,points);
        this.multiDamage=multiDamage*1.2;
        this.type="boss";
    }
}