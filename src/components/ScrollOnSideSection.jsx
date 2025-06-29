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
import { Dialog } from "@/components/ui/dialog";

const ScrollOnSideSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState('whatsapp')
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [waName, setWaName] = useState("");
  const [waMessage, setWaMessage] = useState("");

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

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const contactMethods = [
    {
      id: 'whatsapp',
      icon: MessageSquare,
      label: 'WhatsApp',
      href: 'https://wa.me/254729341277',
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
      href: 'mailto:cso@globeflight.co.ke',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      description: 'Email support'
    }
  ]

  // WhatsApp form submit handler
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const base = "https://wa.me/254729341277";
    const text = encodeURIComponent(
      `Hi, my name is ${waName || "[Your Name]"}. ${waMessage}`
    );
    window.open(`${base}?text=${text}`, "_blank");
    setShowWhatsAppModal(false);
    setWaName("");
    setWaMessage("");
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9990] flex flex-col items-start space-y-4">
      {/* WhatsApp Modal */}
      <AnimatePresence>
        {showWhatsAppModal && (
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute bottom-20 left-0 z-[9999] w-[90vw] max-w-sm md:w-96 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-6 flex flex-col"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowWhatsAppModal(false)}
              className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Close WhatsApp form"
            >
              <X size={18} className="text-gray-500" />
            </button>
            <div className="flex flex-col items-center mb-4">
              <img src={whatsapp} alt="WhatsApp" className="w-12 h-12 mb-2" />
              <h3 className="font-bold text-lg text-green-700 mb-1">Chat with us on WhatsApp</h3>
              <p className="text-gray-600 text-sm text-center">Fill in your details and message. We'll respond instantly!</p>
            </div>
            <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-4 mt-2">
              <input
                type="text"
                placeholder="Your Name"
                className="rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/80"
                value={waName}
                onChange={e => setWaName(e.target.value)}
                required
              />
              <textarea
                placeholder="Type your message..."
                className="rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/80 min-h-[80px] resize-none"
                value={waMessage}
                onChange={e => setWaMessage(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold shadow-lg hover:from-green-600 hover:to-green-700 transition-all text-lg mt-2"
              >
                <span className="flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Send via WhatsApp
                </span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB */}
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
          <div className="relative cursor-pointer" onClick={() => setShowWhatsAppModal(true)}>
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
