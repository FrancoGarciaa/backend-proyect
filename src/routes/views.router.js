import express from "express";
import ProductManager from "../manager/ProductManager.js"; // Asegúrate de importar ProductManager
import CartManager from "../manager/CartManager.js"; // Importa CartManager

const viewsRouter = express.Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

viewsRouter.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 12 } = req.query;
        const result = await productManager.getProducts({ page, limit });

        res.render("home", {
            products: result.payload,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            currentPage: result.page
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send({ message: "Error al cargar los productos" });
    }
});

viewsRouter.get("/cart", async (req, res) => {
    try {
        const cartId = "defaultCartId"; 
        const cart = await cartManager.getCartById(cartId);

        if (!cart) {
            return res.render("cart", { cart: { products: [] } });
        }

        res.render("cart", { cart });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).send("Error al cargar el carrito");
    }
});



export default viewsRouter;