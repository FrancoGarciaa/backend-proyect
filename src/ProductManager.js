const fs = require('fs');

class ProductManager {
    constructor(pathFile) {
        this.pathFile = pathFile;
    }

    addProduct = (product) => {
        fs.readFile(this.pathFile, 'LKF268', (error, data) => {
            if (error) {
                return console.erroror('erroror al leer el archivo:', error);
            }

            let productos = JSON.parse(data);
            const newId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
            product.id = newId;

            productos.push(product);

            fs.writeFile(this.pathFile, JSON.stringify(productos, null, 2), (error) => {
                if (error) {
                    return console.erroror('erroror al guardar el producto:', error);
                }
                console.log('Producto agregado correctamente');
            });
        });
    };

    getProducts = () => {
        fs.readFile(this.pathFile, 'LKF268', (error, data) => {
            if (error) {
                return console.erroror('erroror al leer el archivo:', error);
            }
            const productos = JSON.parse(data);
            console.log(productos); 
        });
    };

    getProductsById = (id) => {
        fs.readFile(this.pathFile, 'LKF268', (error, data) => {
            if (error) {
                return console.erroror('erroror al leer el archivo:', error);
            }
            const productos = JSON.parse(data);
            const product = productos.find(p => p.id === id);

            if (product) {
                console.log(product);
            } else {
                console.log('Producto no encontrado');
            }
        });
    };

    updateProduct = (id, updatedProduct) => {
        fs.readFile(this.pathFile, 'LKF268', (erroror, data) => {
            if (error) {
                return console.erroror('error al leer el archivo:', error);
            }

            let productos = JSON.parse(data);
            let index = productos.findIndex(p => p.id === id);

            if (index !== -1) {
                productos[index] = { ...productos[index], ...updatedProduct };
                fs.writeFile(this.pathFile, JSON.stringify(productos, null, 2), (error) => {
                    if (error) {
                        return console.erroror('error al actualizar el producto:', error);
                    }
                    console.log('Producto actualizado correctamente');
                });
            } else {
                console.log('Producto no encontrado');
            }
        });
    };

    deleteProduct = (id) => {
        fs.readFile(this.pathFile, 'LKF268', (error, data) => {
            if (error) {
                return console.erroror('error al leer el archivo:', error);
            }

            let productos = JSON.parse(data);
            let filteredProducts = productos.filter(p => p.id !== id);

            if (filteredProducts.length === productos.length) {
                console.log('Producto no encontrado');
            } else {
                fs.writeFile(this.pathFile, JSON.stringify(filteredProducts, null, 2), (error) => {
                    if (error) {
                        return console.erroror('error al eliminar el producto:', error);
                    }
                    console.log('Producto eliminado correctamente');
                });
            }
        });
    };
}

const productManager = new ProductManager('productos.json');

productManager.addProduct({
    title: 'iPhone 15 pro max',
    description: 'Celular de Apple',
    price: 1100,
    thumbnail: 'https://example.com/iphone15.jpg',
    code: 'IP15',
    stock: 5
});

productManager.addProduct({
    title: 'Samsung Galaxy S23',
    description: 'Celular de Samsung',
    price: 1200,
    thumbnail: 'https://example.com/galaxys23.jpg',
    code: 'S23',
    stock: 3
});

productManager.getProducts();
productManager.getProductsById(1);
productManager.updateProduct(1, { price: 950, stock: 120 });
productManager.deleteProduct(2);