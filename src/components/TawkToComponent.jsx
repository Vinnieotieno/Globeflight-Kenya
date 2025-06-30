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
import { loadTawkToScript, isTawkToLoaded } from '@/lib/tawkToLoader';

const TawkToComponent = () => {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showCustomTrigger, setShowCustomTrigger] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [chatStatus, setChatStatus] = useState('offline');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const tawkToRef = useRef(null);

  useEffect(() => {
    const initTawkTo = async () => {
      try {
        setIsLoading(true);
        const tawkAPI = await loadTawkToScript();
        
        // Configure Tawk.to with custom settings
        if (tawkAPI) {
          tawkAPI.onLoad = function() {
            console.log('Tawk.to loaded successfully');
            
            // Set custom visitor information
            if (userInfo) {
              tawkAPI.setAttributes({
                'name': userInfo.name || 'Anonymous',
                'email': userInfo.email || '',
                'phone': userInfo.phone || '',
                'company': TAWK_TO_CONFIG.contact.company,
                'source': window.location.href,
                'page_title': document.title,
                'user_type': 'website_visitor'
              });
            }

            // Set up event listeners
            tawkAPI.onStatusChange = function(status) {
              setChatStatus(status);
              console.log('Chat status changed:', status);
            };

            tawkAPI.onChatStarted = function() {
              console.log('Chat started');
              setIsWidgetVisible(true);
              setIsMinimized(false);
            };

            tawkAPI.onChatEnded = function() {
              console.log('Chat ended');
            };

            // Apply custom styling
            tawkAPI.customize({
              ...TAWK_TO_CONFIG.widget,
              chatMinimized: isMinimized,
              chatHidden: !isWidgetVisible
            });
          };

          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to initialize Tawk.to:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (!isTawkToLoaded()) {
      initTawkTo();
    }

    return () => {
      // Cleanup if needed
      if (window.Tawk_API) {
        window.Tawk_API.onLoad = null;
        window.Tawk_API.onStatusChange = null;
        window.Tawk_API.onChatStarted = null;
        window.Tawk_API.onChatEnded = null;
      }
    };
  }, [userInfo]);

  const toggleChat = () => {
    if (window.Tawk_API) {
      if (isWidgetVisible) {
        window.Tawk_API.hideWidget();
        setIsWidgetVisible(false);
      } else {
        window.Tawk_API.showWidget();
        setIsWidgetVisible(true);
        setIsMinimized(false);
      }
    }
  };

  const minimizeChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.minimize();
      setIsMinimized(true);
    }
  };

  if (error) {
    console.error('TawkTo Error:', error);
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isWidgetVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={toggleChat}
            className="flex items-center gap-2 px-4 py-3 text-white rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Chat with us</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TawkToComponent;
