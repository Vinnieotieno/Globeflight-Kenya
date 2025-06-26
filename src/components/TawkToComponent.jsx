// TawkToComponent.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Minimize2, 
  Maximize2, 
  Settings,
  Sparkles,
  Clock,
  User,
  Bot
} from 'lucide-react';
import { TAWK_TO_CONFIG } from '@/config/tawkTo';

const TawkToComponent = () => {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showCustomTrigger, setShowCustomTrigger] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [chatStatus, setChatStatus] = useState('offline');
  const tawkToRef = useRef(null);

  useEffect(() => {
    // Initialize Tawk.to
    const initTawkTo = () => {
      if (window.Tawk_API) {
        // Configure Tawk.to with custom settings
        window.Tawk_API.onLoad = function() {
          console.log('Tawk.to loaded successfully');
          
          // Set custom visitor information
          if (userInfo) {
            window.Tawk_API.setAttributes({
              'name': userInfo.name || 'Anonymous',
              'email': userInfo.email || '',
              'phone': userInfo.phone || '',
              'company': TAWK_TO_CONFIG.contact.company,
              'source': window.location.href,
              'page_title': document.title,
              'user_type': 'website_visitor'
            });
          }

          // Customize widget appearance
          window.Tawk_API.customize({
            desktopNotification: TAWK_TO_CONFIG.notifications.desktop,
            soundNotification: TAWK_TO_CONFIG.notifications.sound,
            chatMinimized: isMinimized,
            chatHidden: !isWidgetVisible,
            theme: TAWK_TO_CONFIG.widget.theme,
            color: TAWK_TO_CONFIG.colors.primary,
            title: TAWK_TO_CONFIG.messages.title,
            subtitle: TAWK_TO_CONFIG.messages.subtitle,
            placeholder: TAWK_TO_CONFIG.messages.placeholder,
            greeting: TAWK_TO_CONFIG.messages.greeting,
            offlineMessage: TAWK_TO_CONFIG.messages.offlineMessage,
            onlineMessage: TAWK_TO_CONFIG.messages.onlineMessage,
            widgetPosition: TAWK_TO_CONFIG.widget.position,
            widgetOffset: TAWK_TO_CONFIG.widget.offset,
            widgetWidth: TAWK_TO_CONFIG.widget.width,
            widgetHeight: TAWK_TO_CONFIG.widget.height,
            widgetMinimized: isMinimized,
            widgetHidden: !isWidgetVisible,
            enableFileUpload: TAWK_TO_CONFIG.widget.enableFileUpload,
            enableEmoji: TAWK_TO_CONFIG.widget.enableEmoji,
            enableTypingIndicator: TAWK_TO_CONFIG.widget.enableTypingIndicator,
            enableReadReceipts: TAWK_TO_CONFIG.widget.enableReadReceipts,
            enableChatHistory: TAWK_TO_CONFIG.widget.enableChatHistory,
            enableVisitorTracking: TAWK_TO_CONFIG.widget.enableVisitorTracking,
            enableAnalytics: TAWK_TO_CONFIG.widget.enableAnalytics,
            enableCustomCSS: true,
            customCSS: `
              /* Custom Tawk.to Styling */
              .tawk-widget-container {
                border-radius: ${TAWK_TO_CONFIG.cssVariables['--tawk-border-radius']} !important;
                box-shadow: ${TAWK_TO_CONFIG.cssVariables['--tawk-shadow']} !important;
                font-family: ${TAWK_TO_CONFIG.cssVariables['--tawk-font-family']} !important;
              }
              
              .tawk-widget-header {
                background: linear-gradient(135deg, ${TAWK_TO_CONFIG.colors.primary} 0%, ${TAWK_TO_CONFIG.colors.secondary} 100%) !important;
                border-radius: ${TAWK_TO_CONFIG.cssVariables['--tawk-border-radius']} ${TAWK_TO_CONFIG.cssVariables['--tawk-border-radius']} 0 0 !important;
                padding: 16px !important;
              }
              
              .tawk-widget-title {
                color: white !important;
                font-weight: 600 !important;
                font-size: 16px !important;
              }
              
              .tawk-widget-subtitle {
                color: rgba(255, 255, 255, 0.9) !important;
                font-size: 14px !important;
              }
              
              .tawk-widget-body {
                background: ${TAWK_TO_CONFIG.colors.background} !important;
                border-radius: 0 0 ${TAWK_TO_CONFIG.cssVariables['--tawk-border-radius']} ${TAWK_TO_CONFIG.cssVariables['--tawk-border-radius']} !important;
              }
              
              .tawk-message {
                border-radius: 12px !important;
                margin: 8px 0 !important;
                padding: 12px 16px !important;
                font-size: 14px !important;
                line-height: 1.5 !important;
              }
              
              .tawk-message-visitor {
                background: #f3f4f6 !important;
                color: ${TAWK_TO_CONFIG.colors.text} !important;
              }
              
              .tawk-message-agent {
                background: linear-gradient(135deg, ${TAWK_TO_CONFIG.colors.primary} 0%, ${TAWK_TO_CONFIG.colors.secondary} 100%) !important;
                color: white !important;
              }
              
              .tawk-input-container {
                border-top: 1px solid #e5e7eb !important;
                padding: 16px !important;
                background: #f9fafb !important;
                border-radius: 0 0 ${TAWK_TO_CONFIG.cssVariables['--tawk-border-radius']} ${TAWK_TO_CONFIG.cssVariables['--tawk-border-radius']} !important;
              }
              
              .tawk-input {
                border: 2px solid #e5e7eb !important;
                border-radius: 12px !important;
                padding: 12px 16px !important;
                font-size: 14px !important;
                background: white !important;
                transition: all 0.2s ease !important;
              }
              
              .tawk-input:focus {
                border-color: ${TAWK_TO_CONFIG.colors.primary} !important;
                box-shadow: 0 0 0 3px ${TAWK_TO_CONFIG.colors.primary}20 !important;
                outline: none !important;
              }
              
              .tawk-send-button {
                background: linear-gradient(135deg, ${TAWK_TO_CONFIG.colors.primary} 0%, ${TAWK_TO_CONFIG.colors.secondary} 100%) !important;
                border-radius: 12px !important;
                border: none !important;
                color: white !important;
                padding: 12px 20px !important;
                font-weight: 600 !important;
                transition: all 0.2s ease !important;
              }
              
              .tawk-send-button:hover {
                transform: translateY(-1px) !important;
                box-shadow: 0 4px 12px ${TAWK_TO_CONFIG.colors.primary}4d !important;
              }
              
              .tawk-minimize-button {
                background: rgba(255, 255, 255, 0.2) !important;
                border-radius: 8px !important;
                border: none !important;
                color: white !important;
                padding: 8px !important;
                transition: all 0.2s ease !important;
              }
              
              .tawk-minimize-button:hover {
                background: rgba(255, 255, 255, 0.3) !important;
              }
              
              .tawk-widget-button {
                background: linear-gradient(135deg, ${TAWK_TO_CONFIG.colors.primary} 0%, ${TAWK_TO_CONFIG.colors.secondary} 100%) !important;
                border-radius: 50% !important;
                box-shadow: 0 10px 25px ${TAWK_TO_CONFIG.colors.primary}4d !important;
                border: 3px solid white !important;
                transition: all 0.3s ease !important;
              }
              
              .tawk-widget-button:hover {
                transform: scale(1.1) !important;
                box-shadow: 0 15px 35px ${TAWK_TO_CONFIG.colors.primary}66 !important;
              }
              
              .tawk-widget-button-icon {
                color: white !important;
                font-size: 24px !important;
              }
              
              .tawk-typing-indicator {
                background: #f3f4f6 !important;
                border-radius: 12px !important;
                padding: 8px 16px !important;
                color: #6b7280 !important;
                font-style: italic !important;
              }
              
              .tawk-file-upload {
                border: 2px dashed #d1d5db !important;
                border-radius: 12px !important;
                background: #f9fafb !important;
                padding: 20px !important;
                text-align: center !important;
                color: #6b7280 !important;
                transition: all 0.2s ease !important;
              }
              
              .tawk-file-upload:hover {
                border-color: ${TAWK_TO_CONFIG.colors.primary} !important;
                background: #f0fdf4 !important;
              }
              
              .tawk-emoji-picker {
                border-radius: 12px !important;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
                border: 1px solid #e5e7eb !important;
              }
              
              /* Mobile Responsive */
              @media (max-width: 768px) {
                .tawk-widget-container {
                  width: 100% !important;
                  height: 100% !important;
                  border-radius: 0 !important;
                }
                
                .tawk-widget-header {
                  border-radius: 0 !important;
                }
                
                .tawk-widget-body {
                  border-radius: 0 !important;
                }
                
                .tawk-input-container {
                  border-radius: 0 !important;
                }
              }
            `
          });

          // Set up event listeners
          window.Tawk_API.onStatusChange = function(status) {
            setChatStatus(status);
            console.log('Chat status changed:', status);
          };

          window.Tawk_API.onVisitorMessage = function(message) {
            console.log('Visitor message:', message);
            // Track user engagement
            if (window.gtag && TAWK_TO_CONFIG.analytics.trackMessageSent) {
              window.gtag('event', 'chat_message_sent', {
                event_category: 'engagement',
                event_label: 'tawk_chat'
              });
            }
          };

          window.Tawk_API.onAgentMessage = function(message) {
            console.log('Agent message:', message);
            // Show notification
            if (Notification.permission === 'granted' && TAWK_TO_CONFIG.notifications.browser) {
              new Notification(TAWK_TO_CONFIG.messages.title, {
                body: message,
                icon: '/logo.png'
              });
            }
          };

          window.Tawk_API.onChatMaximized = function() {
            setIsMinimized(false);
            setIsWidgetVisible(true);
          };

          window.Tawk_API.onChatMinimized = function() {
            setIsMinimized(true);
          };

          window.Tawk_API.onChatHidden = function() {
            setIsWidgetVisible(false);
          };

          window.Tawk_API.onChatStarted = function() {
            console.log('Chat started');
            // Track chat start
            if (window.gtag && TAWK_TO_CONFIG.analytics.trackChatStart) {
              window.gtag('event', 'chat_started', {
                event_category: 'engagement',
                event_label: 'tawk_chat'
              });
            }
          };

          window.Tawk_API.onChatEnded = function() {
            console.log('Chat ended');
            if (window.gtag && TAWK_TO_CONFIG.analytics.trackChatEnd) {
              window.gtag('event', 'chat_ended', {
                event_category: 'engagement',
                event_label: 'tawk_chat'
              });
            }
          };

          window.Tawk_API.onPrechatSubmit = function(data) {
            console.log('Pre-chat form submitted:', data);
            setUserInfo(data);
          };

          // Set initial state
          setIsWidgetVisible(true);
        };

        // Load Tawk.to script
        const script = document.createElement("script");
        script.src = `https://embed.tawk.to/${TAWK_TO_CONFIG.propertyId}/${TAWK_TO_CONFIG.widgetId}`;
        script.async = true;
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        document.body.appendChild(script);
      }
    };

    // Initialize when component mounts
    initTawkTo();

    // Cleanup function
    return () => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
    };
  }, [isMinimized, isWidgetVisible, userInfo]);

  // Custom trigger functions
  const showChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize();
      setShowCustomTrigger(false);
    }
  };

  const hideChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.hideWidget();
    }
  };

  const minimizeChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.minimize();
    }
  };

  // Smart trigger based on user behavior
  useEffect(() => {
    const handleScroll = () => {
      if (!TAWK_TO_CONFIG.triggers.enableScrollTrigger) return;
      
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Show custom trigger after configured scroll percentage
      if (scrollPercentage > TAWK_TO_CONFIG.triggers.scrollPercentage && !showCustomTrigger && !isWidgetVisible) {
        setShowCustomTrigger(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (!TAWK_TO_CONFIG.triggers.enableExitIntent) return;
      
      if (e.clientY <= 0 && !isWidgetVisible) {
        setShowCustomTrigger(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showCustomTrigger, isWidgetVisible]);

  return (
    <>
      {/* Custom Chat Trigger */}
      <AnimatePresence>
        {showCustomTrigger && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-32 right-6 z-[9999]"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-sm">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">Need Help?</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Our AI assistant is here to help with shipping questions!
                  </p>
                </div>
                <button
                  onClick={() => setShowCustomTrigger(false)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X size={14} className="text-gray-500" />
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={showChat}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium py-2 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Chat
                </button>
                <button
                  onClick={() => setShowCustomTrigger(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Chat Controls (Optional) */}
      {isWidgetVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-40 right-6 z-[9998] flex flex-col gap-2"
        >
          <button
            onClick={minimizeChat}
            className="p-3 rounded-full bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:bg-white"
            title="Minimize Chat"
          >
            <Minimize2 className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={hideChat}
            className="p-3 rounded-full bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:bg-white"
            title="Close Chat"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </motion.div>
      )}

      {/* Status Indicator */}
      <div className="fixed bottom-6 right-6 z-[9997]">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xl rounded-full px-3 py-2 shadow-lg border border-gray-100">
          <div className={`w-2 h-2 rounded-full ${
            chatStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
          }`}></div>
          <span className="text-xs text-gray-600 font-medium">
            {chatStatus === 'online' ? 'Support Online' : 'Support Offline'}
          </span>
        </div>
      </div>
    </>
  );
};

export default TawkToComponent;
