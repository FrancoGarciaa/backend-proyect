import express from "express";
import ProductManager from "../manager/ProductManager.js";


const viewsRouter = express.Router();
const productManager = new ProductManager();

viewsRouter.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
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


viewsRouter.get("/realtimeproducts", (req, res) => {
    try {
        res.render("realTimeProducts");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default viewsRouter;