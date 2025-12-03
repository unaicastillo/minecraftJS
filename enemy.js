class Enemy {
    constructor(name,avatar,atackLevel,lifePoints,type){
        this.atackLevel=atackLevel;
        this.name=name;
        this.avatar=avatar;
        this.lifePoints=lifePoints;
        this.type=type || "normal";
    }
}