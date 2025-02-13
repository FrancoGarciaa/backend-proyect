import express from "express";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";
import usersRouter from "../routes/users.router.js";

const app = express();

const productManager = new ProductManager("productos.json");
const cartManager = new CartManager("carritos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit);
    res.json(products);
});

productsRouter.get("/:pid", async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Producto no encontrado" });
    }
});

productsRouter.post("/", (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    const newProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
        status: true
    };
    productManager.addProduct(newProduct);
    res.status(201).json({ message: "Producto agregado correctamente" });
});

productsRouter.put("/:pid", (req, res) => {
    const updatedProduct = req.body;
    productManager.updateProduct(req.params.pid, updatedProduct);
    res.json({ message: "Producto actualizado correctamente" });
});

productsRouter.delete("/:pid", (req, res) => {
    productManager.deleteProduct(req.params.pid);
    res.json({ message: "Producto eliminado correctamente" });
});

const cartsRouter = express.Router();

cartsRouter.post("/", (req, res) => {
    cartManager.createCart();
    res.status(201).json({ message: "Carrito creado correctamente" });
});

cartsRouter.get("/:cid", (req, res) => {
    const products = cartManager.getCartById(req.params.cid);
    res.json(products);
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
    cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.json({ message: "Producto agregado al carrito" });
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);



app.listen(8080, () => {
    console.log("Servidor corriendo en el puerto 8080");
});