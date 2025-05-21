"use client"

import { useState, useEffect } from "react"
import { ChevronUp, MessageCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import whatsapp from "@/assets/whatsapp.svg"

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [messageDismissed, setMessageDismissed] = useState(false)

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

    // Show the message after 3 seconds
    const timer = setTimeout(() => {
      if (!messageDismissed) {
        setShowMessage(true)
      }
    }, 3000)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      clearTimeout(timer)
    }
  }, [messageDismissed])

  const handleDismissMessage = () => {
    setShowMessage(false)
    setMessageDismissed(true)
  }

  return (
    <div className="fixed bottom-10 left-4 z-[9999] flex flex-col items-center space-y-4">
      <div className="relative">
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg p-4 w-64"
            >
              <button
                onClick={handleDismissMessage}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Close message"
              >
                <X size={16} />
              </button>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">Globeflight Support</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Hello! Need help with shipping or tracking? Chat with us now for immediate assistance.
                  </p>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <a
                  href="https://wa.me/254797398004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Start Chat
                </a>
              </div>
              <div className="absolute -bottom-2 left-10 w-4 h-4 bg-white transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
          <a
            href="https://wa.me/254797398004"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative"
            aria-label="Contact us on WhatsApp"
            onClick={() => setShowMessage(false)}
          >
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
              <div className="relative rounded-full p-3 bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
                <img
                  src={whatsapp || "/placeholder.svg"}
                  width={40}
                  height={40}
                  alt="WhatsApp Link"
                  onError={(e) => {
                    console.error("Error loading WhatsApp icon")
                    e.target.style.display = "none"
                  }}
                />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white bg-green-100 overflow-hidden">
              <img
                src="/placeholder.svg?height=50&width=50"
                alt="Support Agent"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>'
                }}
              />
            </div>
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all"
            aria-label="Back to Top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="text-green-600 w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BackToTopButton
