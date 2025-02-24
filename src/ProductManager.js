import fs from "fs/promises";

class ProductManager {
    constructor(pathFile) {
        this.pathFile = pathFile;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.pathFile, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer los productos:", error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.readFile(this.pathFile, "utf-8");
            const celulares = JSON.parse(data);
            return celulares.find(p => p.id == id) || null;
        } catch (error) {
            console.error("Error al leer el archivo de celulares:", error);
            return null;
        }
    }

    async addProduct(product) {
        try {
            const data = await fs.readFile(this.pathFile, "utf-8");
            let celulares = JSON.parse(data);

            const newId = celulares.length > 0 ? celulares[celulares.length - 1].id + 1 : 1;
            product.id = newId;

            celulares.push(product);
            await fs.writeFile(this.pathFile, JSON.stringify(celulares, null, 2));

            console.log("celular agregado correctamente");
            return product;
        } catch (error) {
            console.error("Error al agregar el celular:", error);
            return null;
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const data = await fs.readFile(this.pathFile, "utf-8");
            let celulares = JSON.parse(data);

            let index = celulares.findIndex(p => p.id == id);
            if (index !== -1) {
                celulares[index] = { ...celulares[index], ...updatedProduct };
                await fs.writeFile(this.pathFile, JSON.stringify(celulares, null, 2));
                console.log("celular actualizado correctamente");
                return true;
            } else {
                console.log("celular no encontrado");
                return false;
            }
        } catch (error) {
            console.error("Error al actualizar el celular:", error);
            return false;
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const newProducts = products.filter(product => product.id != id);
            if (newProducts.length === products.length) {
                console.log(`Producto con ID ${id} no encontrado.`);
                return false;
            }
            await fs.writeFile(this.pathFile, JSON.stringify(newProducts, null, 2));
            console.log(`Producto con ID ${id} eliminado correctamente.`);
            return true;
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            return false;
        }
    }
}

export default ProductManager;