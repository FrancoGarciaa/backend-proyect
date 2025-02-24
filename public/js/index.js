const socket = io();

const formNewProduct = document.getElementById("formNewProduct");

formNewProduct.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(formNewProduct);
    const productData = {};

    formData.forEach((value, key) => {
        productData[key] = value;
    });

    socket.emit("newProduct", productData);
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const productId = event.target.dataset.id;
        console.log(`Intentando eliminar el producto con ID: ${productId}`);
        socket.emit("deleteProduct", productId);
    }
});

socket.on("productDeleted", (productId) => {
    const productElement = document.getElementById(`product-${productId}`);
    if (productElement) {
        productElement.remove();
    }
});

socket.on("productAdded", (newProduct) => {
    const productsList = document.getElementById("productsList");
    productsList.innerHTML += `
        <li id="product-${newProduct.id}">
            ${newProduct.title} - ${newProduct.price}
            <button class="delete-btn" data-id="${newProduct.id}">Eliminar</button>
        </li>
    `;
});