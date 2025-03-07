import mongoose from "mongoose";
import Cart from "../models/cart.model.js";

class CartManager {
    async createCart() {
        try {
            const newCart = new Cart({ products: [] });
            await newCart.save(); 
            return newCart;
        } catch (error) {
            console.error("Error al crear el carrito:", error);
            return null;
        }
    }

    async getCartById(cartId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId)) {
                console.log("ID de carrito inválido");
                return null;
            }

            const cart = await Cart.findById(cartId).populate("products.product");
            if (!cart) {
                console.log(`Carrito con ID ${cartId} no encontrado.`);
                return null;
            }
            return cart;
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            return null;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
                console.log("ID de carrito o producto inválido");
                return null;
            }

            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log("Carrito no encontrado");
                return null;
            }

            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            return null;
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
                console.log("ID de carrito o producto inválido");
                return null;
            }

            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log("Carrito no encontrado");
                return null;
            }

            cart.products = cart.products.filter(p => !p.product.equals(productId));
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
            return null;
        }
    }
}

export default CartManager;