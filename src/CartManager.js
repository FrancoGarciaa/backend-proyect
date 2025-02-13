import fs from "fs";

class CartManager {
    constructor(pathFile) {
        this.pathFile = pathFile;
    }
    createCart = () => {
        fs.readFile(this.pathFile, "utf-8", (error, data) => {
            if (error) {
                return console.error("error al leer el archivo de carritos:", error);
            }
            let carritos = JSON.parse(data);
            const newId = carritos.length > 0 ? carritos[carritos.length - 1].id + 1 : 1;
            const newCart = { id: newId, products: [] };
            carritos.push(newCart);
            fs.writeFile(this.pathFile, JSON.stringify(carritos, null, 2), (error) => {
                if (error) {
                    return console.error("error al guardar el carrito:", error);
                }
                console.log("Carrito creado correctamente");
            });
        });
    };
    getCartById = (id) => {
        fs.readFile(this.pathFile, "utf-8", (error, data) => {
            if (error) {
                return console.error("error al leer el archivo de carritos:", error);
            }
            const carritos = JSON.parse(data);
            const cart = carritos.find(c => c.id == id);
            return cart ? cart.products : [];
        });
    };
    addProductToCart = (cartId, productId) => {
        fs.readFile(this.pathFile, "utf-8", (error, data) => {
            if (error) {
                return console.error("error al leer el archivo de carritos:", error);
            }
            let carritos = JSON.parse(data);
            let cart = carritos.find(c => c.id == cartId);
            if (cart) {
                const existingProduct = cart.products.find(p => p.product == productId);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.products.push({ product: productId, quantity: 1 });
                }
                fs.writeFile(this.pathFile, JSON.stringify(carritos, null, 2), (error) => {
                    if (error) {
                        return console.error("error al agregar el producto al carrito:", error);
                    }
                    console.log("Producto agregado al carrito");
                });
            } else {
                console.log("Carrito no encontrado");
            }
        });
    };
}

export default CartManager;