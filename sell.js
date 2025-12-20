// Sell page functionality

// Image preview
const productImageInput = document.getElementById("productImage")
const imagePreview = document.getElementById("imagePreview")
const fileNameDisplay = document.getElementById("fileName")

if (productImageInput && imagePreview) {
  productImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      if (fileNameDisplay) {
        fileNameDisplay.textContent = `Selected: ${file.name}`
      }
      
      const reader = new FileReader()
      reader.onload = (event) => {
        imagePreview.innerHTML = `<img src="${event.target.result}" alt="Product Preview">`
      }
      reader.readAsDataURL(file)
    }
  })
}

// Handle sell form submission
const sellForm = document.getElementById("sellForm")
if (sellForm) {
  sellForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const productName = document.getElementById("productName").value
    const productDescription = document.getElementById("productDescription").value
    const productPrice = document.getElementById("productPrice").value
    const contactInfo = document.getElementById("contactInfo").value
    const imageFile = document.getElementById("productImage").files[0]
    
    if (imageFile) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const productData = {
          id: Date.now(),
          name: productName,
          description: productDescription,
          price: `Rs.${parseFloat(productPrice).toFixed(2)}`,
          contact: contactInfo,
          image: event.target.result,
          rating: "⭐ New",
          seller: localStorage.getItem('username') || 'Anonymous'
        }
        
        let userProducts = JSON.parse(localStorage.getItem('userProducts') || '[]')
        userProducts.push(productData)
        localStorage.setItem('userProducts', JSON.stringify(userProducts))
        
        let allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]')
        allProducts.push(productData)
        localStorage.setItem('allProducts', JSON.stringify(allProducts))
        
        showToast("Your product is now live and visible to buyers!", 'success', 'Product Listed')
        sellForm.reset()
        imagePreview.innerHTML = ""
        if (fileNameDisplay) fileNameDisplay.textContent = ""
      }
      reader.readAsDataURL(imageFile)
    } else {
      showToast("Please upload a product image to continue.", 'warning', 'Image Required')
    }
  })
}
