// Account page functionality

const userData = {
  username: localStorage.getItem('username') || 'JohnDoe',
  email: localStorage.getItem('email') || 'john@example.com',
  phone: localStorage.getItem('phone') || '+1 234 567 8900',
  dob: localStorage.getItem('dob') || ''
}

// Display user data
document.getElementById('usernameValue').textContent = userData.username
document.getElementById('emailValue').textContent = userData.email
document.getElementById('phoneValue').textContent = userData.phone
document.getElementById('dobValue').textContent = userData.dob || 'Not set'

// Edit buttons
document.querySelectorAll('.btn-edit-small').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const field = e.target.dataset.field
    const displayDiv = document.getElementById(`${field}Display`)
    const editDiv = document.getElementById(`${field}Edit`)
    const input = document.getElementById(`${field}Input`)
    const currentValue = document.getElementById(`${field}Value`).textContent

    displayDiv.classList.add('hidden')
    editDiv.classList.remove('hidden')
    
    if (field !== 'password') {
      input.value = currentValue
    }
    input.focus()
  })
})

// Save buttons
document.querySelectorAll('.btn-save').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const field = e.target.dataset.field
    const displayDiv = document.getElementById(`${field}Display`)
    const editDiv = document.getElementById(`${field}Edit`)
    const input = document.getElementById(`${field}Input`)
    const valueSpan = document.getElementById(`${field}Value`)

    const newValue = input.value.trim()
    
    if (newValue) {
      if (field === 'password') {
        valueSpan.textContent = '••••••••'
      } else {
        valueSpan.textContent = newValue
      }
      
      localStorage.setItem(field, newValue)
      displayDiv.classList.remove('hidden')
      editDiv.classList.add('hidden')
      
      showToast(`Your ${field} has been updated.`, 'success', 'Profile Updated')
    }
  })
})

// Cancel buttons
document.querySelectorAll('.btn-cancel').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const field = e.target.dataset.field
    document.getElementById(`${field}Display`).classList.remove('hidden')
    document.getElementById(`${field}Edit`).classList.add('hidden')
  })
})
