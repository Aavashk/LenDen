// Cart/Wishlist page functionality

const cartItemsContainer = document.getElementById('cartItems')
const cartEmpty = document.getElementById('cartEmpty')
const cartSummary = document.getElementById('cartSummary')

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  
  if (cart.length === 0) {
    cartEmpty.classList.add('show')
    cartSummary.classList.remove('show')
    cartItemsContainer.innerHTML = ''
    return
  }
  
  cartEmpty.classList.remove('show')
  cartSummary.classList.add('show')
  
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
  `).join('')
  
  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''))
    return sum + price
  }, 0)
  
  const shipping = 5.00
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax
  
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`
  document.getElementById('total').textContent = `$${total.toFixed(2)}`
  
  // Add remove button functionality
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = parseInt(e.target.dataset.id)
      removeFromCart(itemId)
    })
  })
}

function removeFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const item = cart.find(i => i.id === itemId)
  cart = cart.filter(item => item.id !== itemId)
  localStorage.setItem('cart', JSON.stringify(cart))
  
  if (item) {
    showToast(`${item.name} removed from wishlist`, 'success', 'Removed')
  }
  
  loadCart()
}

// Checkout button
const checkoutBtn = document.querySelector('.checkout-btn')
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    showToast('Checkout feature coming soon!', 'info', 'Coming Soon')
  })
}

// Load cart on page load
loadCart()
