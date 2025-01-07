// Fetch the data from the API
fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const cartItems = data.items;
    const cartContainer = document.getElementById('cart');
    const cartCard = document.querySelector('.cart-card');

    let total = 0;

    // Function to recalculate the total
    const updateTotal = () => {
      total = 0;
      const subtotals = document.querySelectorAll('.subtotal');
      subtotals.forEach(subtotal => {
        const value = parseFloat(subtotal.textContent.replace('Rs', '')) || 0;
        total += value;
      });
      totalDisplay.textContent = `Total: Rs${total.toFixed(2)}`;
    };

    // Create totals display
    const totalDisplay = document.createElement('div');
    totalDisplay.textContent = `Total: Rs${total.toFixed(2)}`;
    totalDisplay.classList.add('cart-total');
    cartCard.appendChild(totalDisplay);

    // Create checkout button
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.classList.add('checkout-btn');
    checkoutButton.addEventListener('click', () => {
      alert('Proceeding to checkout');
    });
    cartCard.appendChild(checkoutButton);

    // Loop through each item and display it
    cartItems.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');

      // Product image
      const productImage = document.createElement('img');
      productImage.src = item.featured_image.url;
      productImage.alt = item.product_title;
      cartItemElement.appendChild(productImage);

      // Product details
      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');

      const productTitle = document.createElement('span');
      productTitle.textContent = item.product_title;
      productDetails.appendChild(productTitle);

      const productPrice = document.createElement('span');
      productPrice.textContent = `Rs${item.price}`;
      productDetails.appendChild(productPrice);
      cartItemElement.appendChild(productDetails);

      // Quantity input
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.value = item.quantity;
      quantityInput.min = 1;

      // Subtotal display
      const subtotal = document.createElement('span');
      subtotal.classList.add('subtotal');
      subtotal.textContent = `Rs${(item.price * item.quantity).toFixed(2)}`;

      // Update subtotal on quantity change
      quantityInput.addEventListener('input', () => {
        const newQuantity = parseInt(quantityInput.value) || 0;
        subtotal.textContent = `Rs${(item.price * newQuantity).toFixed(2)}`;
        updateTotal();
      });

      // Remove item button
      const removeBtn = document.createElement('span');
      removeBtn.classList.add('remove-btn');
      removeBtn.textContent = '🗑️';
      removeBtn.addEventListener('click', () => {
        cartItemElement.remove();
        updateTotal();
      });

      // Actions section
      const actions = document.createElement('div');
      actions.classList.add('actions');
      actions.appendChild(quantityInput);
      actions.appendChild(subtotal);
      actions.appendChild(removeBtn);
      cartItemElement.appendChild(actions);

      // Add the item to the cart container
      cartContainer.appendChild(cartItemElement);
    });

    // Initial total calculation
    updateTotal();
  })
  .catch(error => {
    console.error('Error fetching the cart data:', error);
  });
