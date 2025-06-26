"use client"

import { useState, useEffect } from "react"
import { 
  ChevronUp, 
  MessageCircle, 
  X, 
  Phone, 
  Mail, 
  Sparkles,
  ArrowUp,
  MessageSquare,
  Clock
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import whatsapp from "@/assets/whatsapp.svg"

const ScrollOnSideSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [messageDismissed, setMessageDismissed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState('whatsapp')

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)

    // Show the message after 5 seconds (increased from 3)
    const timer = setTimeout(() => {
      if (!messageDismissed) {
        setShowMessage(true)
      }
    }, 5000)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      clearTimeout(timer)
    }
  }, [messageDismissed])

  const handleDismissMessage = () => {
    setShowMessage(false)
    setMessageDismissed(true)
  }

  const contactMethods = [
    {
      id: 'whatsapp',
      icon: MessageSquare,
      label: 'WhatsApp',
      href: 'https://wa.me/254797398004',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      description: 'Instant chat support'
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Call Us',
      href: 'tel:+254729341277',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      description: 'Direct phone support'
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      href: 'mailto:info@globeflight.co.ke',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      description: 'Email support'
    }
  ]

  return (
    <div className="fixed bottom-6 left-6 z-[9990] flex flex-col items-center space-y-4">
      {/* Modern Support Message - Hidden on small devices */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative hidden md:block"
          >
            <div className="absolute bottom-full mb-3 left-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-6 w-80 max-w-sm">
              {/* Close Button */}
              <button
                onClick={handleDismissMessage}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                aria-label="Close message"
              >
                <X size={14} className="text-gray-500" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Need Help?</h4>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Online now
                  </p>
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Get instant support for shipping, tracking, or any questions. Our team is here to help 24/7!
              </p>

              {/* Contact Options */}
              <div className="space-y-2">
                {contactMethods.map((method) => (
                  <a
                    key={method.id}
                    href={method.href}
                    target={method.id === 'whatsapp' ? '_blank' : undefined}
                    rel={method.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 group"
                    onClick={() => setShowMessage(false)}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center shadow-sm`}>
                      <method.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{method.label}</p>
                      <p className="text-xs text-gray-500">{method.description}</p>
                    </div>
                    <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200 rotate-45" />
                  </a>
                ))}
              </div>

              {/* Arrow */}
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white/95 transform rotate-45 border-r border-b border-gray-100"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Floating Action Button */}
      <div className="relative">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative"
        >
          {/* Pulsing Background */}
          <motion.div
            animate={{ 
              scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
              opacity: isHovered ? [0.3, 0.1, 0.3] : [0.2, 0.05, 0.2]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur-sm"
          />

          {/* Main Button */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-2xl"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-green-600 rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
              <img
                src={whatsapp || "/placeholder.svg"}
                width={32}
                height={32}
                alt="WhatsApp Support"
                className="drop-shadow-sm"
                onError={(e) => {
                  console.error("Error loading WhatsApp icon")
                  e.target.style.display = "none"
                }}
              />
            </div>
          </div>

          {/* Online Status Indicator */}
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full border-3 border-white bg-green-500 flex items-center justify-center shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>

          {/* Hover Label - Hidden on small devices */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap hidden md:block"
              >
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Chat with us
                </span>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modern Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={scrollToTop}
            className="group relative p-4 rounded-full bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:bg-white"
            aria-label="Back to Top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon */}
            <div className="relative">
              <ChevronUp className="text-gray-700 group-hover:text-green-600 w-5 h-5 transition-colors duration-300" />
            </div>

            {/* Hover Label - Hidden on small devices */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden md:block">
              Back to top
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-gray-900"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quick Contact Tabs (Optional - shows on hover) - Hidden on small devices */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-full ml-3 top-0 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-100 p-2 hidden lg:block"
          >
            <div className="flex flex-col space-y-2">
              {contactMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    if (method.id === 'whatsapp') {
                      window.open(method.href, '_blank');
                    } else {
                      window.location.href = method.href;
                    }
                  }}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    activeTab === method.id 
                      ? `bg-gradient-to-r ${method.color} text-white shadow-lg` 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                  }`}
                  onMouseEnter={() => setActiveTab(method.id)}
                >
                  <method.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ScrollOnSideSection
