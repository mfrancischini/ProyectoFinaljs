
let shopping = JSON.parse(localStorage.getItem("miCarrito")) ?? []
class Compra { 
    constructor(carritoDeCompras) {
        this.carrito = carritoDeCompras
    }

}
const compra = new Compra(shopping);
