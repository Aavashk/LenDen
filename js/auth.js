// Authentication page functionality

// Tab switching
const loginTab = document.getElementById("loginTab")
const signupTab = document.getElementById("signupTab")
const loginForm = document.getElementById("loginForm")
const signupForm = document.getElementById("signupForm")

if (loginTab && signupTab) {
  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active")
    signupTab.classList.remove("active")
    loginForm.classList.remove("hidden")
    signupForm.classList.add("hidden")
  })

  signupTab.addEventListener("click", () => {
    signupTab.classList.add("active")
    loginTab.classList.remove("active")
    signupForm.classList.remove("hidden")
    loginForm.classList.add("hidden")
  })
}



// Handle login
const loginFormElement = document.querySelector("#loginForm form")
if (loginFormElement) {
  loginFormElement.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = document.getElementById("loginEmail").value
    
    // Save login email to localStorage
    localStorage.setItem('email', email)
    
    showToast(`Welcome back, ${email}!`, 'success', 'Login Successful')
    setTimeout(() => {
      window.location.href = "home.html"
    }, 1000)
  })
}

// Handle signup
const signupFormElement = document.querySelector("#signupForm form")
if (signupFormElement) {
  signupFormElement.addEventListener("submit", (e) => {
    e.preventDefault()
    const username = document.getElementById("signupUsername").value
    const email = document.getElementById("signupEmail").value
    const phone = document.getElementById("signupPhone").value
    const dob = document.getElementById("signupDOB").value
    
    localStorage.setItem('username', username)
    localStorage.setItem('email', email)
    localStorage.setItem('phone', phone)
    localStorage.setItem('dob', dob)
    
    showToast(`Welcome to LenDen, ${username}!`, 'success', 'Account Created')
    setTimeout(() => {
      window.location.href = "home.html"
    }, 1000)
  })
}

// Check URL parameter for signup tab
const urlParams = new URLSearchParams(window.location.search)
const tab = urlParams.get('tab')

if (tab === 'signup' && signupTab) {
  signupTab.click()
}
