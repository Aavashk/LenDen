// Common functionality shared across all pages

// Menu functionality
const menuToggle = document.getElementById("menuToggle")
const sidebar = document.getElementById("sidebar")
const closeMenu = document.getElementById("closeMenu")

if (menuToggle && sidebar && closeMenu) {
  // Open menu when hamburger is clicked
  menuToggle.addEventListener("click", () => {
    sidebar.classList.add("active")
  })

  // Close menu when close button is clicked
  closeMenu.addEventListener("click", () => {
    sidebar.classList.remove("active")
  })

  // Close menu when clicking on menu items
  document.querySelectorAll(".menu-items a").forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active")
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove("active")
    }
  })
}

// Toast notification system
function showToast(message, type = 'success', title = '') {
  let container = document.querySelector('.toast-container')
  if (!container) {
    container = document.createElement('div')
    container.className = 'toast-container'
    document.body.appendChild(container)
  }

  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }
  
  const titles = {
    success: title || 'Success',
    error: title || 'Error',
    warning: title || 'Warning',
    info: title || 'Info'
  }
  
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <div class="toast-content">
      <div class="toast-title">${titles[type]}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">&times;</button>
  `
  
  container.appendChild(toast)
  
  const closeBtn = toast.querySelector('.toast-close')
  closeBtn.addEventListener('click', () => removeToast(toast))
  
  setTimeout(() => removeToast(toast), 4000)
}

function removeToast(toast) {
  toast.classList.add('removing')
  setTimeout(() => {
    toast.remove()
    const container = document.querySelector('.toast-container')
    if (container && container.children.length === 0) {
      container.remove()
    }
  }, 300)
}
