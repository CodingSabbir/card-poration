document.addEventListener('DOMContentLoaded', function () {
    const foodItems = document.querySelectorAll('.add-to-cart-btn');
    const open = document.querySelector('.open');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const closeCartButton = document.getElementById('close-cart-btn');
    const cartContainer = document.getElementById('cart');
    const totalQuantityBtn = document.getElementById('Quantity');

    open.addEventListener('click', (event) => {
        updateCart();
    });

    let cartItems = [];

    foodItems.forEach(button => {
        button.addEventListener('click', function () {
            const itemId = button.dataset.id;
            const selectedItem = cartItems.find(item => item.id === itemId);

            if (!selectedItem) {
                const itemName = button.dataset.name;
                const itemPrice = parseFloat(button.dataset.price);
                const itemImage = button.dataset.image;
                const cartItem = {
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    quantity: 1,
                    image: itemImage,
                };

                cartItems.push(cartItem);
                button.textContent = 'Add to Cart';
                button.classList.add('bg-gray-400');
                updateCart();
            }
        });
    });

    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;
        let totalQuantity = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.className = 'mb-2';
            cartItem.innerHTML = `
                <div class='flex gap-2 mt-7 border px-2 py-4 rounded-md relative'>
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-22 object-cover p-2  mx-4">
                    <span class='text-[22px] mt-3 text-white'>${item.name} </span>

                    <button class="bg-black text-white rounded-sm h-6 w-5 ml-5 mt-5  focus:outline-none increment-btn text-center"
                            data-id="${item.id}">+</button>
                    <span class='w-16 text-black'>${item.quantity}<span>

                    <button class="bg-[#FFF] text-black rounded-sm h-6 w-5 mt-5   focus:outline-none decrement-btn"
                            data-id="${item.id}">-</button>
                    <button class="text-white absolute top-0 right-0   ml-28 text-[26px] px-2 py-1 focus:outline-none close-btn" data-id="${item.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                    </button>

                    <div>
                        <span class='ml-24 font-semibold text-white'>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
            cartList.appendChild(cartItem);

            total += item.price * item.quantity;
            totalQuantity += item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        totalQuantityBtn.textContent = +totalQuantity + ' items';
        open.innerHTML = `
            <button class="open">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="h-6 w-6 inline-block">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 2v2m2-2v2m2-2v2m2-2v2m2-2v2m2-2v2m2-2v2m6 14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v10z">
                    </path>
                </svg>
                <sup class="bg-red-600 rounded-full text-white px-2 text-[16px] count">${totalQuantity}</sup>
            </button>
        `;
        // Open the cart when an item is added
        cartContainer.style.transform = 'translateX(0)';

        const incrementButtons = document.querySelectorAll('.increment-btn');
        const decrementButtons = document.querySelectorAll('.decrement-btn');
        const closeButtons = document.querySelectorAll('.close-btn');

        incrementButtons.forEach(incrementButton => {
            incrementButton.addEventListener('click', function () {
                const itemId = incrementButton.dataset.id;
                const selectedItem = cartItems.find(item => item.id === itemId);
                selectedItem.quantity++;
                updateCart();
            });
        });

        decrementButtons.forEach(decrementButton => {
            decrementButton.addEventListener('click', function () {
                const itemId = decrementButton.dataset.id;
                const selectedItem = cartItems.find(item => item.id === itemId);

                if (selectedItem.quantity > 1) {
                    selectedItem.quantity--;
                }

                updateCart();
            });
        });

        closeButtons.forEach(closeButton => {
            closeButton.addEventListener('click', function () {
                const itemId = closeButton.dataset.id;
                cartItems = cartItems.filter(item => item.id !== itemId);
                updateCart();
            });
        });
    }

    closeCartButton.addEventListener('click', function () {
        // Close cart action
        cartContainer.style.transform = 'translateX(100%)';
    });
});
