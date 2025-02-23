import express from "express";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";
import viewsRouter from "./routes/views.router.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server)

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

const productManager = new ProductManager("./src/data/products.json");
const cartManager = new CartManager("./src/data/cart.json");

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
        res.status(404).json({ message: "Celular no encontrado" });
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
    res.status(201).json({ message: "Celular agregado correctamente" });
});

productsRouter.put("/:pid", (req, res) => {
    const updatedProduct = req.body;
    productManager.updateProduct(req.params.pid, updatedProduct);
    res.json({ message: "Celular actualizado correctamente" });
});

productsRouter.delete("/:pid", (req, res) => {
    productManager.deleteProduct(req.params.pid);
    res.json({ message: "Celular eliminado correctamente" });
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
    res.json({ message: "Celular agregado al carrito" });
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/realtimeproducts", viewsRouter);

io.on("connection", (socket)=> {
    console.log("Nuevo usuario conectado");

    socket.on("newProduct", async (productData)=>{

        try {
            
            const newProduct = await productManager.addProduct(productData);
            io.emit("productAdded", newProduct);

        } catch (error) {
            console.log("Error añadiendo el nuevo celular")
        }


    });
});


server.listen(PORT, ()=> console.log(`El servidor en: http://localhost:${PORT} ha iniciado correctamente`) );