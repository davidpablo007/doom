document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let cart = [];

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productElement = button.closest(".product");
            const productId = productElement.getAttribute("data-id");
            const productName = productElement.getAttribute("data-name");
            const productPrice = parseFloat(productElement.getAttribute("data-price"));
            const productOption = productElement.querySelector(".product-option").value;
            const productQuantity = parseInt(productElement.querySelector(".product-quantity").value);

            const item = {
                id: productId,
                name: productName,
                option: productOption,
                price: productPrice,
                quantity: productQuantity
            };

            const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id && cartItem.option === item.option);

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += item.quantity;
            } else {
                cart.push(item);
            }

            updateCartUI();
        });
    });

    function updateCartUI() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} (${item.option}): $${item.price} x ${item.quantity}
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);

        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach((removeButton) => {
            removeButton.addEventListener("click", () => {
                const index = parseInt(removeButton.getAttribute("data-index"));
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }
});