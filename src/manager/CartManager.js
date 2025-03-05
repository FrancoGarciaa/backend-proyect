import { Cart } from "../models/cart.model.js";
import mongoose from "mongoose";

class CartManager {
    async getCartById(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                console.error("ID de carrito no válido");
                return null;
            }

            const cart = await Cart.findById(id).populate("products.product");
            return cart ? cart : null;
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            return null;
        } 
    }

    async addProductToCart(cartId, productId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
                console.error("ID no válido");
                return null;
            }
    
            let cart = await Cart.findById(cartId);
            if (!cart) {
                console.error("Carrito no encontrado");
                return null;
            }
    
            const existingProduct = cart.products.find(p => p.product.equals(productId));
            if (existingProduct) {
                existingProduct.quantity += 1;
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
            const cart = await Cart.findById(cartId);
            if (!cart) return null;

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