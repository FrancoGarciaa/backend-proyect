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

async function removeFromCart(productId) {
    const cartId = localStorage.getItem("cartId") || "defaultCartId";
    try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        if (data.status === "success") {
            alert("Producto eliminado del carrito");
            location.reload();
        } else {
            alert("Error al eliminar el producto");
        }
    } catch (error) {
        console.error("Error al eliminar del carrito:", error);
    }
}

socket.on("productAdded", (product) => {
    alert(`Nuevo producto agregado: ${product.name}`);
    location.reload();
});

socket.on("productDeleted", (productId) => {
    alert("Producto eliminado correctamente");
    const productCard = document.querySelector(`#product-${productId}`);
    if (productCard) {
        productCard.remove();
    }
});


socket.on("updateProducts", (updatedProducts) => {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    updatedProducts.forEach((product) => {
        addProductToList(product);
    });
});
