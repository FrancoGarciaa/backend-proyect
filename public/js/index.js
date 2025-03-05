const socket = io();

const addProductToList = (product) => {
    const productList = document.getElementById("productList");
    const productItem = document.createElement("li");
    productItem.id = `product-${product._id}`;
    productItem.innerHTML = `${product.name} - ${product.price} USD`;
    productList.appendChild(productItem);
};

const removeProductFromList = (productId) => {
    const productItem = document.getElementById(`product-${productId}`);
    if (productItem) {
        productItem.remove();
    }
};

socket.on("productAdded", (newProduct) => {
    alert(`Nuevo celular agregado: ${newProduct.name}`);
    addProductToList(newProduct);
});

socket.on("productDeleted", (productId) => {
    alert(`Celular eliminado con ID: ${productId}`);
    removeProductFromList(productId);
});