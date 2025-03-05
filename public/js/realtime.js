const socket = io();

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = {
        name: e.target.name.value,
        description: e.target.description.value,
        price: e.target.price.value,
        stock: e.target.stock.value
    };
    socket.emit("newProduct", newProduct);
});

const deleteProduct = (productId) => {
    socket.emit("deleteProduct", productId);
};

socket.on("productAdded", (product) => {
    alert(`Nuevo producto agregado: ${product.name}`);
    location.reload();
});

socket.on("productDeleted", (productId) => {
    alert("Producto eliminado correctamente");
    location.reload();
});
