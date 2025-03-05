import express from "express";
import ProductManager from "../manager/ProductManager.js";


const viewsRouter = express.Router();
const productManager = new ProductManager();

viewsRouter.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 12 } = req.query;
        const result = await productManager.getProducts({ page, limit });

        if (result.status === "success") {
            res.render("home", { 
                products: result.payload,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                currentPage: result.page
            });
        } else {
            res.render("home", { products: [] });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


viewsRouter.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("realtimeproducts", { products: products.payload });
    } catch (error) {
        console.error("Error al obtener productos para la vista:", error);
        res.status(500).send("Error al cargar los productos");
    }
});

export default viewsRouter;