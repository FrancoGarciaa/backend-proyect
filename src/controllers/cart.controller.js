import CartManager from "../manager/CartManager.js";

const cartManager = new CartManager();

export const createCart = async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ status: "success", payload: newCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Error al encontrar el carrito" });
        }
        res.json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
        res.json({ status: "success", payload: updatedCart });
    } catch (error) {
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
