// Tawk.to Configuration
export const TAWK_TO_CONFIG = {
  // Your Tawk.to Property ID and Widget ID
  propertyId: '6603e3d51ec1082f04dbdc97',
  widgetId: '1hpvj3v29',
  
  // Brand Colors (matches your website theme)
  colors: {
    primary: '#10b981', // Green
    secondary: '#059669',
    accent: '#34d399',
    text: '#1f2937',
    background: '#ffffff',
  },
  
  // Widget Settings
  widget: {
    position: 'bottom-right',
    offset: '20px',
    width: '350px',
    height: '500px',
    theme: 'light',
    enableFileUpload: true,
    enableEmoji: true,
    enableTypingIndicator: true,
    enableReadReceipts: true,
    enableChatHistory: true,
    enableVisitorTracking: true,
    enableAnalytics: true,
  },
  
  // Custom Messages
  messages: {
    title: 'Globeflight Support',
    subtitle: 'How can we help you today?',
    placeholder: 'Type your message here...',
    greeting: '👋 Hello! Welcome to Globeflight Kenya. How can we assist you with your shipping needs today?',
    offlineMessage: 'We\'re currently offline. Please leave a message and we\'ll get back to you soon!',
    onlineMessage: 'We\'re online! Chat with us now for instant support.',
  },
  
  // Trigger Settings
  triggers: {
    scrollPercentage: 30, // Show trigger after 30% scroll
    delay: 5000, // Show trigger after 5 seconds
    enableExitIntent: true,
    enableScrollTrigger: true,
  },
  
  // Notification Settings
  notifications: {
    desktop: true,
    sound: true,
    browser: true,
  },
  
  // Custom CSS Variables
  cssVariables: {
    '--tawk-primary-color': '#10b981',
    '--tawk-secondary-color': '#059669',
    '--tawk-accent-color': '#34d399',
    '--tawk-text-color': '#1f2937',
    '--tawk-background-color': '#ffffff',
    '--tawk-border-radius': '16px',
    '--tawk-shadow': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '--tawk-font-family': '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  // Contact Information
  contact: {
    company: 'Globeflight Kenya',
    website: 'https://globeflight.co.ke',
    email: 'info@globeflight.co.ke',
    phone: '+254729341277',
    whatsapp: '+254797398004',
  },
  
  // Analytics Events
  analytics: {
    trackChatStart: true,
    trackMessageSent: true,
    trackFileUpload: true,
    trackChatEnd: true,
  },
  
  // Mobile Settings
  mobile: {
    fullscreen: true,
    responsive: true,
    touchFriendly: true,
  },
  
  // Custom Features
  features: {
    preChatForm: false,
    customGreeting: true,
    typingIndicator: true,
    readReceipts: true,
    fileUpload: true,
    emojiSupport: true,
    chatHistory: true,
    visitorTracking: true,
  }
};

// Helper function to get configuration
export const getTawkToConfig = (key) => {
  return key ? TAWK_TO_CONFIG[key] : TAWK_TO_CONFIG;
};

// Helper function to update configuration
export const updateTawkToConfig = (key, value) => {
  if (key && value) {
    TAWK_TO_CONFIG[key] = value;
  }
};

export default TAWK_TO_CONFIG; 