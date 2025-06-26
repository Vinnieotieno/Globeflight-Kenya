# Tawk.to Chatbot Setup Guide

## Overview
This project includes a fully customized Tawk.to chatbot integration with modern UI, smart triggers, and advanced features.

## Features

### 🎨 **Modern Design**
- Glassmorphic UI with backdrop blur effects
- Custom branding with your company colors
- Responsive design for all devices
- Smooth animations and transitions

### 🤖 **Smart Triggers**
- **Scroll-based trigger**: Appears after 30% page scroll
- **Exit intent**: Shows when user moves mouse to leave page
- **Delayed trigger**: Appears after 5 seconds
- **Custom controls**: Minimize, close, and show/hide options

### 📱 **Enhanced UX**
- Custom chat status indicator
- Multiple contact methods (WhatsApp, Phone, Email)
- File upload support
- Emoji support
- Typing indicators
- Read receipts

### 📊 **Analytics & Tracking**
- Google Analytics integration
- Chat engagement tracking
- User behavior monitoring
- Custom event tracking

## Configuration

### 1. Basic Setup
The chatbot is already configured and ready to use. It's included in `MainLayout.jsx` and will appear on all pages.

### 2. Customization
Edit `src/config/tawkTo.js` to customize:

```javascript
// Colors
colors: {
  primary: '#10b981', // Your brand color
  secondary: '#059669',
  accent: '#34d399',
  text: '#1f2937',
  background: '#ffffff',
},

// Messages
messages: {
  title: 'Globeflight Support',
  subtitle: 'How can we help you today?',
  greeting: '👋 Hello! Welcome to Globeflight Kenya...',
},

// Triggers
triggers: {
  scrollPercentage: 30, // Show after 30% scroll
  delay: 5000, // Show after 5 seconds
  enableExitIntent: true,
  enableScrollTrigger: true,
},
```

### 3. Tawk.to Dashboard Setup
1. Go to [Tawk.to Dashboard](https://dashboard.tawk.to/)
2. Create a new widget or use existing one
3. Copy your Property ID and Widget ID
4. Update in `src/config/tawkTo.js`:

```javascript
propertyId: 'YOUR_PROPERTY_ID',
widgetId: 'YOUR_WIDGET_ID',
```

## Usage

### Automatic Integration
The chatbot is automatically included in your main layout and will appear on all pages.

### Manual Integration
If you want to add it to specific pages:

```jsx
import TawkToComponent from '@/components/TawkToComponent';

function YourPage() {
  return (
    <div>
      {/* Your page content */}
      <TawkToComponent />
    </div>
  );
}
```

## Customization Options

### 1. Colors & Branding
```javascript
// In src/config/tawkTo.js
colors: {
  primary: '#your-brand-color',
  secondary: '#your-secondary-color',
  accent: '#your-accent-color',
},
```

### 2. Messages & Content
```javascript
messages: {
  title: 'Your Company Support',
  subtitle: 'Custom subtitle',
  greeting: 'Custom greeting message',
  offlineMessage: 'Custom offline message',
  onlineMessage: 'Custom online message',
},
```

### 3. Triggers & Behavior
```javascript
triggers: {
  scrollPercentage: 50, // Show after 50% scroll
  delay: 10000, // Show after 10 seconds
  enableExitIntent: false, // Disable exit intent
  enableScrollTrigger: false, // Disable scroll trigger
},
```

### 4. Features
```javascript
features: {
  preChatForm: true, // Enable pre-chat form
  customGreeting: true,
  typingIndicator: true,
  readReceipts: true,
  fileUpload: true,
  emojiSupport: true,
  chatHistory: true,
  visitorTracking: true,
},
```

## Advanced Features

### 1. Custom CSS Styling
The component includes extensive custom CSS for the Tawk.to widget. You can modify the styles in the `customCSS` section of the configuration.

### 2. Analytics Integration
The chatbot automatically tracks:
- Chat starts
- Messages sent
- File uploads
- Chat ends

### 3. Notification Settings
```javascript
notifications: {
  desktop: true, // Desktop notifications
  sound: true, // Sound notifications
  browser: true, // Browser notifications
},
```

### 4. Mobile Optimization
```javascript
mobile: {
  fullscreen: true, // Fullscreen on mobile
  responsive: true, // Responsive design
  touchFriendly: true, // Touch-friendly interface
},
```

## Troubleshooting

### 1. Chatbot Not Appearing
- Check if Tawk.to script is loading (check browser console)
- Verify Property ID and Widget ID are correct
- Ensure the component is properly imported and rendered

### 2. Styling Issues
- Check if custom CSS is being applied
- Verify color values are valid hex codes
- Clear browser cache and reload

### 3. Analytics Not Working
- Ensure Google Analytics is properly set up
- Check if `window.gtag` is available
- Verify analytics events are being fired

### 4. Mobile Issues
- Test on different mobile devices
- Check responsive breakpoints
- Verify touch interactions work properly

## Best Practices

### 1. Performance
- The chatbot loads asynchronously
- Custom triggers help reduce initial load impact
- Images and assets are optimized

### 2. User Experience
- Triggers are non-intrusive
- Users can easily dismiss or minimize
- Multiple contact options available

### 3. Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly

### 4. SEO
- No impact on page load speed
- Proper meta tags and structured data
- Mobile-friendly design

## Support

For issues with:
- **Tawk.to Service**: Contact Tawk.to support
- **Customization**: Check the configuration file
- **Integration**: Review the component code
- **Styling**: Modify the custom CSS

## Files Structure
```
src/
├── components/
│   └── TawkToComponent.jsx    # Main chatbot component
├── config/
│   └── tawkTo.js             # Configuration file
└── layout/
    └── MainLayout.jsx        # Where chatbot is included
```

The chatbot is now fully integrated and ready to provide excellent customer support for your logistics website! 