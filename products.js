// Product card expansion and wishlist functionality

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.createElement('div')
  overlay.className = 'product-overlay'
  document.body.appendChild(overlay)

  const productCards = document.querySelectorAll('.product-card')
  let originalPosition = null

  productCards.forEach(card => {
    const closeBtn = document.createElement('button')
    closeBtn.className = 'close-product'
    closeBtn.innerHTML = '&times;'
    card.appendChild(closeBtn)

    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-add') || e.target.classList.contains('close-product')) {
        if (e.target.classList.contains('close-product')) {
          closeExpandedCard()
        }
        return
      }

      document.querySelectorAll('.product-card.expanded').forEach(c => {
        if (c !== card) {
          c.classList.remove('expanded', 'expanding')
        }
      })

      const rect = card.getBoundingClientRect()
      originalPosition = { top: rect.top, left: rect.left, width: rect.width, height: rect.height }

      card.style.top = `${rect.top}px`
      card.style.left = `${rect.left}px`
      card.style.width = `${rect.width}px`
      card.style.height = `${rect.height}px`
      
      card.classList.add('expanding')
      overlay.classList.add('active')
      document.body.style.overflow = 'hidden'

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.classList.add('expanded')
        })
      })
    })

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      closeExpandedCard()
    })
  })

  overlay.addEventListener('click', closeExpandedCard)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeExpandedCard()
  })

  function closeExpandedCard() {
    const expandedCard = document.querySelector('.product-card.expanded')
    
    if (expandedCard && originalPosition) {
      expandedCard.classList.add('closing')
      expandedCard.classList.remove('expanded')
      overlay.classList.add('closing')
      
      expandedCard.style.top = `${originalPosition.top}px`
      expandedCard.style.left = `${originalPosition.left}px`
      expandedCard.style.width = `${originalPosition.width}px`
      expandedCard.style.height = `${originalPosition.height}px`
      expandedCard.style.transform = 'scale(0.95)'
      expandedCard.style.opacity = '0.8'

      setTimeout(() => {
        expandedCard.classList.remove('expanding', 'closing')
        expandedCard.style.top = ''
        expandedCard.style.left = ''
        expandedCard.style.width = ''
        expandedCard.style.height = ''
        expandedCard.style.transform = ''
        expandedCard.style.opacity = ''
        originalPosition = null
      }, 500)
    }
    
    overlay.classList.remove('active')
    overlay.classList.add('closing')
    
    setTimeout(() => {
      overlay.classList.remove('closing')
      document.body.style.overflow = ''
    }, 500)
  }

  // Add to wishlist
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const card = e.target.closest('.product-card')
      const productName = card.querySelector('h3').textContent
      const productPrice = card.querySelector('.price').textContent
      const productDescription = card.querySelector('p').textContent
      const productImage = card.querySelector('.product-image img')?.src || ''
      
      let cart = JSON.parse(localStorage.getItem('cart') || '[]')
      cart.push({
        id: Date.now(),
        name: productName,
        price: productPrice,
        description: productDescription,
        image: productImage
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      
      showToast(`${productName} added to wishlist!`, 'success', 'Added to Wishlist')
      closeExpandedCard()
    })
  })
})

// Load user-added products on buy page
if (window.location.pathname.includes('buy.html')) {
  const productsGrid = document.querySelector('.product-grid')
  
  if (productsGrid) {
    const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]')
    
    if (allProducts.length > 0) {
      const userProductsHTML = allProducts.map(product => `
        <div class="product-card">
          <button class="close-product">&times;</button>
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="rating">${product.rating}</div>
            <div class="product-footer">
              <span class="price">${product.price}</span>
              <button class="btn-add">Add to Wishlist</button>
            </div>
          </div>
        </div>
      `).join('')
      
      productsGrid.innerHTML += userProductsHTML
    }
  }
}

// SEARCH BARFOR PRODUCTS
const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      if (title.includes(query) || desc.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
