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

async function createCart() {
    try {
        const response = await fetch('/api/carts', { method: 'POST' });
        const data = await response.json();

        if (data && data._id) {
            localStorage.setItem("cartId", data._id);
            console.log("Carrito creado correctamente:", data._id);
            return data._id; // Retornar el ID del carrito creado
        } else {
            console.error("Error: No se pudo obtener un ID de carrito válido");
            return null;
        }
    } catch (error) {
        console.error("Error al crear carrito:", error);
        return null;
    }
}


async function addToCart(productId) {
    const cartId = await ensureCartExists(); 

    if (!cartId) {
        alert("No se encontró un carrito válido. Intenta recargar la página.");
        return;
    }

    try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();

        if (data.status === "success") {
            alert("Producto agregado al carrito");
        } else {
            alert("Error al agregar el producto");
        }
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
    }
}

socket.on("productAdded", (newProduct) => {
    alert(`Nuevo celular agregado: ${newProduct.name}`);
    addProductToList(newProduct);
});

socket.on("productDeleted", (productId) => {
    alert(`Celular eliminado con ID: ${productId}`);
    removeProductFromList(productId);
});
