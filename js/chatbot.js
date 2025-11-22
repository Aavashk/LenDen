// Chatbot functionality

document.addEventListener('DOMContentLoaded', () => {
  const chatbotToggle = document.getElementById('chatbotToggle')
  const chatbotWindow = document.getElementById('chatbotWindow')
  const chatbotClose = document.getElementById('chatbotClose')
  const chatbotInput = document.getElementById('chatbotInput')
  const chatbotSend = document.getElementById('chatbotSend')
  const chatbotMessages = document.getElementById('chatbotMessages')

  // Toggle chatbot window
  chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active')
    if (chatbotWindow.classList.contains('active')) {
      chatbotInput.focus()
    }
  })

  chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active')
  })

  // Send message
  function sendMessage() {
    const message = chatbotInput.value.trim()
    if (!message) return

    // Add user message
    addMessage(message, 'user')
    chatbotInput.value = ''

    // Show typing indicator
    showTypingIndicator()

    // Simulate bot response
    setTimeout(() => {
      hideTypingIndicator()
      const response = getBotResponse(message)
      addMessage(response, 'bot')
    }, 1000 + Math.random() * 1000)
  }

  chatbotSend.addEventListener('click', sendMessage)
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  })

  // Add message to chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div')
    messageDiv.className = `chatbot-message ${sender}`
    
    const avatar = document.createElement('div')
    avatar.className = 'message-avatar'
    avatar.textContent = sender === 'bot' ? '🤖' : '👤'
    
    const bubble = document.createElement('div')
    bubble.className = 'message-bubble'
    bubble.textContent = text
    
    messageDiv.appendChild(avatar)
    messageDiv.appendChild(bubble)
    chatbotMessages.appendChild(messageDiv)
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }

  // Typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div')
    typingDiv.className = 'chatbot-message bot'
    typingDiv.id = 'typingIndicator'
    
    const avatar = document.createElement('div')
    avatar.className = 'message-avatar'
    avatar.textContent = '🤖'
    
    const indicator = document.createElement('div')
    indicator.className = 'typing-indicator'
    indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>'
    
    typingDiv.appendChild(avatar)
    typingDiv.appendChild(indicator)
    chatbotMessages.appendChild(typingDiv)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }

  function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator')
    if (indicator) {
      indicator.remove()
    }
  }

  // Bot responses
  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase()

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! Welcome to LenDen. How can I assist you today?"
    }

    // Help
    if (lowerMessage.includes('help')) {
      return "I can help you with buying products, selling items, managing your account, or answering questions about LenDen. What would you like to know?"
    }

    // Buy/Shop
    if (lowerMessage.includes('buy') || lowerMessage.includes('shop') || lowerMessage.includes('purchase')) {
      return "You can browse our products by clicking 'Buy Products' in the menu. We have a wide variety of items available!"
    }

    // Sell
    if (lowerMessage.includes('sell') || lowerMessage.includes('list')) {
      return "To sell products, go to 'Sell Products' in the menu. You can upload product images, set prices, and add descriptions easily!"
    }

    // Account
    if (lowerMessage.includes('account') || lowerMessage.includes('profile')) {
      return "You can manage your account by clicking 'My Account' in the menu. There you can update your profile information and settings."
    }

    // Wishlist
    if (lowerMessage.includes('wishlist') || lowerMessage.includes('cart')) {
      return "Your wishlist contains items you're interested in. Click 'Wishlist' in the menu to view and manage your saved products."
    }

    // Orders
    if (lowerMessage.includes('order') || lowerMessage.includes('my products')) {
      return "You can view all your listed products by clicking 'My Products' in the menu. There you can edit or delete your listings."
    }

    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
      return "Need to reach our team? Visit the 'Contact Us' page from the menu to see our support team's contact information."
    }

    // Price
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Product prices are set by sellers. You can view prices on each product card. When selling, you set your own prices!"
    }

    // Payment
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return "For payment inquiries, please contact the seller directly using the contact information provided on the product listing."
    }

    // Shipping
    if (lowerMessage.includes('ship') || lowerMessage.includes('delivery')) {
      return "Shipping arrangements are made directly between buyers and sellers. Contact the seller for shipping details and options."
    }

    // Thanks
    if (lowerMessage.match(/(thank|thanks)/)) {
      return "You're welcome! Feel free to ask if you need anything else. Happy shopping!"
    }

    // Goodbye
    if (lowerMessage.match(/(bye|goodbye|see you)/)) {
      return "Goodbye! Have a great day and happy shopping at LenDen!"
    }

    // Default response
    const defaultResponses = [
      "I'm here to help! Could you please provide more details about what you're looking for?",
      "That's interesting! Can you tell me more about what you need help with?",
      "I'd be happy to assist you. Could you rephrase your question?",
      "I'm not sure I understand. Try asking about buying, selling, or managing your account!",
      "Let me help you with that. You can ask me about products, orders, or your account."
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  // Initial greeting
  setTimeout(() => {
    addMessage("Hi! I'm ShopBot, your LenDen assistant. How can I help you today?", 'bot')
  }, 500)
})
