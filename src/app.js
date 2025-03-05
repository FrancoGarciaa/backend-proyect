import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import productsRouter from "./routes/product.router.js";
import cartsRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import connectDB from "./db/db.js";
import ProductManager from "./manager/ProductManager.js";

dotenv.config(); 

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const productManager = new ProductManager();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

const PORT = process.env.PORT || 8080;

connectDB(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("newProduct", async (productData) => {
        console.log("Datos recibidos para crear producto:", productData);

        try {
            const newProduct = await productManager.createProduct(productData); 
            io.emit("productAdded", newProduct);
        } catch (error) {
            console.log("Error añadiendo el nuevo celular:", error);
        }
    });

    socket.on("deleteProduct", async (productId) => {
        try {
            const success = await productManager.deleteProduct(productId);
            if (success.status === "success") {
                io.emit("productDeleted", productId);
            }
        } catch (error) {
            console.log("Error eliminando el celular:", error);
        }
    });
});


server.listen(PORT, () => console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`));