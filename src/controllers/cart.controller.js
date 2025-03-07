    import CartManager from "../manager/CartManager.js";
    import mongoose from "mongoose";
    import  Cart  from "../models/cart.model.js";

    const cartManager = new CartManager();

    export const createCart = async (req, res) => {
        try {
            const newCart = new Cart({ products: [] }); 
            const savedCart = await newCart.save();
    
            console.log("Carrito creado correctamente:", savedCart);
            res.status(201).json(savedCart);
        } catch (error) {
            console.error("Error al crear carrito:", error);
            res.status(500).json({ message: "Error interno al crear carrito" });
        }
    };

    export const getCartById = async (req, res) => {
        try {
            const { cid } = req.params;
            console.log("Buscando carrito con ID:", cid);
    
            if (!mongoose.Types.ObjectId.isValid(cid)) {
                return res.status(400).json({ status: "error", message: "ID de carrito inválido" });
            }
    
            const cart = await Cart.findById(cid).populate("products.product");
    
            if (!cart) {
                console.log("Carrito no encontrado en la base de datos");
                return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
            }
    
            res.json({ status: "success", payload: cart });
        } catch (error) {
            console.error("Error al obtener carrito:", error);
            res.status(500).json({ status: "error", message: error.message });
        }
    };
    


    export const addProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;

            console.log("Recibiendo solicitud para agregar producto al carrito");
            console.log("ID del carrito:", cid);
            console.log("ID del producto:", pid);

            if (!mongoose.Types.ObjectId.isValid(cid)) {
                console.error("ID de carrito no válido");
                return res.status(400).json({ status: "error", message: "ID de carrito no válido" });
            }
            if (!mongoose.Types.ObjectId.isValid(pid)) {
                console.error("ID de producto no válido");
                return res.status(400).json({ status: "error", message: "ID de producto no válido" });
            }

            const updatedCart = await cartManager.addProductToCart(cid, pid);

            console.log("Producto agregado correctamente:", updatedCart);
            res.json({ status: "success", payload: updatedCart });
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
            res.status(500).json({ status: "error", message: error.message });
        }
    };

    export const updateCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const products = req.body;
            const updatedCart = await cartManager.updateCart(cid, products);
            res.json({ status: "success", payload: updatedCart });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    };

    export const updateProductQuantity = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updatedCart = await cartManager.updateProductQuantity(cid, pid, quantity);
            res.json({ status: "success", payload: updatedCart });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    };

    export const deleteProductFromCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await cartManager.deleteProductFromCart(cid, pid);
            res.json({ status: "success", payload: updatedCart });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    };

    export const deleteCart = async (req, res) => {
        try {
            const { cid } = req.params;
            await cartManager.deleteCart(cid);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    };
