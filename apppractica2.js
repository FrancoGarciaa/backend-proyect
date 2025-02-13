// import express from "express";
// import ProductManager from "./ProductManager";

// const ProductManager = require("./ProductManager");
// const fs = require("fs");
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// const productManager = new ProductManager("productos.json");

// app.get("/celulares", (req, res) => {
//     productManager.getProducts(); 
//     res.status(200).send("Productos obtenidos");
// });

// app.get("/celulares/:pid", (req, res) => {
//     const pid = parseInt(req.params.pid); 
//     productManager.getProductsById(pid); 
//     res.status(200).send(`Producto con ID ${pid}`);
// });


// app.post("/celulares", (req, res) => {
//     const product = req.body; 
//     productManager.addProduct(product); 
//     res.status(201).send("Producto agregado");
// });


// app.listen(8080, () => {
//     console.log("Servidor corriendo en el puerto 8080");
// });