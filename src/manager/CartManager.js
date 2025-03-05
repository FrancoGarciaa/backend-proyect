import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 }
        }
    ]
});

const Cart = mongoose.model("Cart", cartSchema);

class CartManager {
    async createCart() {
        try {
            const newCart = new Cart({ products: [] });
            await newCart.save();
            console.log("Carrito creado correctamente");
            return newCart;
        } catch (error) {
            console.error("Error al crear el carrito:", error);
        }
    }

    async getCartById(id) {
        try {
            const cart = await Cart.findById(id).populate("products.product");
            return cart ? cart.products : [];
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            return null;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log("Carrito no encontrado");
                return null;
            }
            
            const existingProduct = cart.products.find(p => p.product.equals(productId));
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            
            await cart.save();
            console.log("Celular agregado al carrito");
            return cart;
        } catch (error) {
            console.error("Error al agregar el celular al carrito:", error);
            return null;
        }
    }
}

export default CartManager;
