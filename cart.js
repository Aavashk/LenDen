// Cart/Wishlist page functionality
const cartItemsContainer = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartSummary = document.getElementById('cartSummary');

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  if (cart.length === 0) {
    cartEmpty.classList.add('show');
    cartSummary.classList.remove('show');
    cartItemsContainer.innerHTML = '';
    return;
  }

  cartEmpty.classList.remove('show');
  cartSummary.classList.add('show');

  // Display cart items
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-image">
        ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-description">${item.description}</div>
        <div class="cart-item-price">${item.price}</div>
      </div>
      <div class="cart-item-actions">
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `).join('');

  updateTotals(cart);

  // Remove button
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = parseInt(e.target.dataset.id);
      removeFromCart(itemId);
    });
  });
}

function updateTotals(cart) {
  const subtotal = cart.reduce((sum, item) => {
    // Extract numeric value from price string (remove Rs. and spaces, keep commas and dots)
    const priceStr = item.price.toString().replace(/Rs\.?\s*/g, '').replace(/,/g, '');
    const price = parseFloat(priceStr) || 0;
    return sum + price;
  }, 0);

  const shipping = 150; // Rs.150 fixed shipping
  const total = subtotal + shipping;

  document.getElementById('subtotal').textContent = `Rs.${subtotal.toFixed(2)}`;
  document.getElementById('total').textContent = `Rs.${total.toFixed(2)}`;
}

function removeFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(i => i.id === itemId);
  cart = cart.filter(item => item.id !== itemId);
  localStorage.setItem('cart', JSON.stringify(cart));

  if (item) {
    showToast(`${item.name} removed from wishlist`, 'success', 'Removed');
  }

  loadCart();
}

// Checkout button functionality
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cart.length === 0) {
      showToast('Your wishlist is empty!', 'info', 'Info');
      return;
    }

    const subtotal = cart.reduce((sum, item) => {
      // Extract numeric value from price string (remove Rs. and spaces, keep commas and dots)
      const priceStr = item.price.toString().replace(/Rs\.?\s*/g, '').replace(/,/g, '');
      const price = parseFloat(priceStr) || 0;
      return sum + price;
    }, 0);

    const shipping = 150;
    const total = subtotal + shipping;

    // Clear cart after checkout
    localStorage.setItem('cart', '[]');
    showToast('Thank you for your purchase!', 'success', 'Success');
    loadCart();
  });
}

// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
});
