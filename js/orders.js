// Orders page - Display user's listed products

const userProductsGrid = document.getElementById('userProductsGrid')
const emptyOrders = document.getElementById('emptyOrders')

function loadUserProducts() {
  const userProducts = JSON.parse(localStorage.getItem('userProducts') || '[]')
  
  if (userProducts.length === 0) {
    emptyOrders.classList.add('show')
    userProductsGrid.innerHTML = ''
    return
  }
  
  emptyOrders.classList.remove('show')
  
  userProductsGrid.innerHTML = userProducts.map(product => `
    <div class="order-item" data-id="${product.id}">
      <div class="order-item-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="order-item-details">
        <h3 class="order-item-name">${product.name}</h3>
        <p class="order-item-description">${product.description}</p>
        <div class="order-item-meta">
          <span class="order-item-rating">${product.rating}</span>
          <span class="order-item-price">${product.price}</span>
        </div>
      </div>
      <div class="order-item-actions">
        <button class="btn-edit" data-id="${product.id}">Edit</button>
        <button class="btn-delete" data-id="${product.id}">Delete</button>
      </div>
    </div>
  `).join('')
  
  // Add edit functionality
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const productId = parseInt(e.target.dataset.id)
      editUserProduct(productId)
    })
  })
  
  // Add delete functionality
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const productId = parseInt(e.target.dataset.id)
      deleteUserProduct(productId)
    })
  })
}

function editUserProduct(productId) {
  let userProducts = JSON.parse(localStorage.getItem('userProducts') || '[]')
  const product = userProducts.find(p => p.id === productId)
  
  if (!product) return
  
  const newName = prompt('Edit Product Name:', product.name)
  if (newName === null) return
  
  const newDescription = prompt('Edit Product Description:', product.description)
  if (newDescription === null) return
  
  const newContact = prompt('Edit Contact Information:', product.contact)
  if (newContact === null) return
  
  // Update product
  product.name = newName.trim()
  product.description = newDescription.trim()
  product.contact = newContact.trim()
  
  // Save to user products
  localStorage.setItem('userProducts', JSON.stringify(userProducts))
  
  // Update in all products
  let allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]')
  const allProductIndex = allProducts.findIndex(p => p.id === productId)
  if (allProductIndex !== -1) {
    allProducts[allProductIndex] = product
    localStorage.setItem('allProducts', JSON.stringify(allProducts))
  }
  
  showToast('Your product details have been updated.', 'success', 'Product Updated')
  loadUserProducts()
}

function deleteUserProduct(productId) {
  let userProducts = JSON.parse(localStorage.getItem('userProducts') || '[]')
  const product = userProducts.find(p => p.id === productId)
  
  if (!product) return
  
  if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
    // Remove from user products
    userProducts = userProducts.filter(p => p.id !== productId)
    localStorage.setItem('userProducts', JSON.stringify(userProducts))
    
    // Remove from all products
    let allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]')
    allProducts = allProducts.filter(p => p.id !== productId)
    localStorage.setItem('allProducts', JSON.stringify(allProducts))
    
    showToast(`${product.name} has been deleted.`, 'success', 'Product Deleted')
    loadUserProducts()
  }
}

// Load products on page load
loadUserProducts()
