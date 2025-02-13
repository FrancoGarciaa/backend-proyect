import fs from "fs/promises";

class ProductManager {
    constructor(pathFile) {
        this.pathFile = pathFile;
    }

    async getProducts(limit) {
        try {
            const data = await fs.readFile(this.pathFile, "utf-8");
            let productos = JSON.parse(data);
            return limit ? productos.slice(0, limit) : productos;
        } catch (error) {
            console.error("Error al leer el archivo de productos:", error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.readFile(this.pathFile, "utf-8");
            const productos = JSON.parse(data);
            return productos.find(p => p.id == id) || null;
        } catch (error) {
            console.error("Error al leer el archivo de productos:", error);
            return null;
        }
    }

    async addProduct(product) {
        try {
            const data = await fs.readFile(this.pathFile, "utf-8");
            let productos = JSON.parse(data);

            const newId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
            product.id = newId;

            productos.push(product);
            await fs.writeFile(this.pathFile, JSON.stringify(productos, null, 2));

            console.log("Producto agregado correctamente");
            return product;
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            return null;
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const data = await fs.readFile(this.pathFile, "utf-8");
            let productos = JSON.parse(data);

            let index = productos.findIndex(p => p.id == id);
            if (index !== -1) {
                productos[index] = { ...productos[index], ...updatedProduct };
                await fs.writeFile(this.pathFile, JSON.stringify(productos, null, 2));
                console.log("Producto actualizado correctamente");
                return true;
            } else {
                console.log("Producto no encontrado");
                return false;
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            return false;
        }
    }
    
    async deleteProduct(id) {
        try {
            const data = await fs.readFile(this.pathFile, "utf-8");
            let productos = JSON.parse(data);

            const filteredProducts = productos.filter(p => p.id != id);
            if (filteredProducts.length === productos.length) {
                console.log("Producto no encontrado");
                return false;
            }

            await fs.writeFile(this.pathFile, JSON.stringify(filteredProducts, null, 2));
            console.log("Producto eliminado correctamente");
            return true;
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            return false;
        }
    }
}

export default ProductManager;