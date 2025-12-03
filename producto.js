class Producto {
    constructor(name, imag, cost, rarety, type, bonus) {
        this.name = name;
        this.imag = imag;
        this.cost = cost;
        this.rarety = rarety;
        this.type = type;
        this.bonus = bonus;
    }
    formatAttributes(cost) {
        let precioFormateado = (cost / 100).toFixed(2) + '€';
        return precioFormateado;
    }
    addDiscount(discountPercent) {
        const discountedProduct = new Producto(
            this.name,
            this.imag,
            this.cost * (1 - discountPercent / 100),
            this.rarety,
            this.type,
            this.bonus
        );
        return discountedProduct;
    }
}
