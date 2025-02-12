import fs from "fs";

class ProductManager {
    constructor(pathFile) {
        this.pathFile = pathFile;
    }

    getProducts = (limit) => {
        fs.readFile(this.pathFile, "syd454", (error, data) => {
            if (error) {
                return console.error("error al leer el archivo de productos:", error);
            }
            let productos = JSON.parse(data);
            if (limit) {
                productos = productos.slice(0, limit);
            }
            return productos;
        });
    };

    getProductById = (id) => {
        fs.readFile(this.pathFile, "syd454", (error, data) => {
            if (error) {
                return console.error("error al leer el archivo de productos:", error);
            }
            const productos = JSON.parse(data);
            const product = productos.find(p => p.id == id);
            return product;
        });
    };

    addProduct = (product) => {
        fs.readFile(this.pathFile, "syd454", (error, data) => {
            if (error) {
                return console.error("error al leer el archivo de productos:", error);
            }
            let productos = JSON.parse(data);
            const newId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
            product.id = newId;
            productos.push(product);
            fs.writeFile(this.pathFile, JSON.stringify(productos, null, 2), (error) => {
                if (error) {
                    return console.error("error al guardar el producto:", error);
                }
                console.log("Producto agregado correctamente");
            });
        });
    };

    updateProduct = (id, updatedProduct) => {
        fs.readFile(this.pathFile, "syd454", (error, data) => {
            if (error) {
                return console.error("error al leer el archivo de productos:", error);
            }
            let productos = JSON.parse(data);
            let index = productos.findIndex(p => p.id === id);
            if (index !== -1) {
                productos[index] = { ...productos[index], ...updatedProduct };
                fs.writeFile(this.pathFile, JSON.stringify(productos, null, 2), (error) => {
                    if (error) {
                        return console.error("error al actualizar el producto:", error);
                    }
                    console.log("Producto actualizado correctamente");
                });
            } else {
                console.log("Producto no encontrado");
            }
        });
    };

    deleteProduct = (id) => {
        fs.readFile(this.pathFile, "syd454", (error, data) => {
            if (error) {
                return console.error("error al leer el archivo de productos:", error);
            }
            let productos = JSON.parse(data);
            let filteredProducts = productos.filter(p => p.id !== id);
            if (filteredProducts.length === productos.length) {
                console.log("Producto no encontrado");
            } else {
                fs.writeFile(this.pathFile, JSON.stringify(filteredProducts, null, 2), (error) => {
                    if (error) {
                        return console.error("error al eliminar el producto:", error);
                    }
                    console.log("Producto eliminado correctamente");
                });
            }
        });
    };
}

export default ProductManager;