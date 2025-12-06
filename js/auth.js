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



// Handle login - buttons are now useless (do nothing)
const loginFormElement = document.querySelector("#loginForm form")
if (loginFormElement) {
  loginFormElement.addEventListener("submit", (e) => {
    e.preventDefault()
    // Button does nothing
  })
}

// Handle signup - buttons are now useless (do nothing)
const signupFormElement = document.querySelector("#signupForm form")
if (signupFormElement) {
  signupFormElement.addEventListener("submit", (e) => {
    e.preventDefault()
    // Button does nothing
  })
}

// Check URL parameter for signup tab
const urlParams = new URLSearchParams(window.location.search)
const tab = urlParams.get('tab')

if (tab === 'signup' && signupTab) {
  signupTab.click()
}

