import ProductManager from "../manager/ProductManager.js";

const productManager = new ProductManager();

export const getAllProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const products = await productManager.getProducts({ limit, page, sort, query });
        res.json({ status: "success", payload: products });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
        if (!product) {
            return res.status(404).json({ status: "error", message: "Error al encontra el producto" });
        }
        res.json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productManager.createProduct(productData);
        res.status(201).json({ status: "success", payload: newProduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const productData = req.body;
        const updatedProduct = await productManager.updateProduct(pid, productData);
        res.json({ status: "success", payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        await productManager.deleteProduct(pid);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

