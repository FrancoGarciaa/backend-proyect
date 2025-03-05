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
            alert("Carrito creado correctamente");
        } else {
            alert("No se pudo crear el carrito");
        }
    } catch (error) {
        console.error("Error al crear carrito:", error);
    }
}

if (!localStorage.getItem("cartId")) {
    console.log("No hay carrito en localStorage. Creando uno nuevo...");
    createCart();
}

async function addToCart(productId) {
    try {
        const cartId = localStorage.getItem("cartId");

        if (!cartId) {
            alert("No hay carrito activo. Por favor, recarga la página o crea un carrito.");
            return;
        }

        console.log("Cart ID obtenido:", cartId);

        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            alert("Producto agregado al carrito");
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || "No se pudo agregar el producto"}`);
        }
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
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
