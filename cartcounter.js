document.addEventListener("DOMContentLoaded", function () {
  
    function updateCartCounter() {
        var cart = JSON.parse(localStorage.getItem("cart")) || [];
        var totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        var cartElement = document.querySelector(".cart");
        if (cartElement) {
            cartElement.textContent = "Cart (" + totalItems + ")";
        }
    }

    updateCartCounter();
});


localStorage.setItem("cart", JSON.stringify(cart));
