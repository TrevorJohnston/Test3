"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCounter() {
    var cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    var cartElement = document.querySelector(".cart");
    cartElement.textContent = "Cart (" + cartCount + ")";
}


   window.addToCart = function (productName, productPrice) {
    
    var existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCounter();

    var popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerText = `${productName} has been added to your cart!`;
    document.body.appendChild(popup);

    setTimeout(function () {
        popup.style.display = 'none';
    }, 3000);
};


    function renderCart() {
        var cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = ''; 

        cart.forEach(function (item, index) {
            var cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");

            cartItemDiv.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <p>Quantity: <button class="adjust-quantity" data-index="${index}" data-action="decrease">-</button> 
                ${item.quantity} 
                <button class="adjust-quantity" data-index="${index}" data-action="increase">+</button></p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            
            cartContainer.appendChild(cartItemDiv);
        });

        document.querySelectorAll('.remove-item').forEach(function (button) {
            button.addEventListener('click', function (e) {
                var index = e.target.getAttribute('data-index');
                cart.splice(index, 1); 
                localStorage.setItem("cart", JSON.stringify(cart)); 
                renderCart(); 
                updateCartCounter(); 
            });
        });

        document.querySelectorAll('.adjust-quantity').forEach(function (button) {
            button.addEventListener('click', function (e) {
                var index = e.target.getAttribute('data-index');
                var action = e.target.getAttribute('data-action');

                if (action === 'increase') {
                    cart[index].quantity += 1;
                } else if (action === 'decrease' && cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                }

                localStorage.setItem("cart", JSON.stringify(cart)); 
                renderCart(); 
                updateCartCounter(); 
            });
        });
    }

    if (window.location.pathname.endsWith("cart.html")) {
        renderCart();
    }

    updateCartCounter();
});



document.querySelectorAll(".view-details-btn").forEach(button => {
  button.addEventListener("click", () => {
    const description = button.previousElementSibling;
    description.classList.toggle("show");

    button.textContent = description.classList.contains("show")
      ? "Hide Details"
      : "View Details";
  });
});







document.querySelectorAll('.product').forEach(product => {
    const detailsButton = product.querySelector('.view-details-button');
    const description = product.querySelector('.product-description');

    detailsButton.addEventListener('click', (event) => {
        event.stopPropagation(); 
        description.classList.toggle('show');
    });

   
    product.addEventListener('mouseleave', () => {
        description.classList.remove('show');
    });
});





