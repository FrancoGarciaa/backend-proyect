import { Cart } from "../models/cart.model.js";
import mongoose from "mongoose";

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
            console.log("Carrito encontrado:", cart);
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
            console.log("Producto agregado al carrito");
            return cart;
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
            return null; 
        }
    }
}

export default CartManager;
