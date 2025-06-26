import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, PhoneCall, MapPin } from "lucide-react"

const NavbarTopBar = ({ showTopBar, handlePhoneClick }) => (
  <AnimatePresence>
    {showTopBar && (
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-600 animate-gradient-x"></div>
        <div className="relative px-4 py-3 text-white backdrop-blur-sm bg-black/10">
          <div className="container flex flex-col sm:flex-row items-center justify-between mx-auto text-sm">
            {/* Contact info - responsive layout */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
              {/* Email with enhanced icon */}
              <a 
                href="mailto:cs@globeflight.co.ke" 
                className="flex items-center group transition-all duration-300 hover:text-green-200 hover:scale-105"
              >
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <motion.div
                    className="absolute inset-0 bg-green-200 rounded-full opacity-0 group-hover:opacity-20"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
                <span className="relative text-xs sm:text-sm">
                  cs@globeflight.co.ke
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-200 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
              {/* Phone with call animation */}
              <button 
                onClick={() => handlePhoneClick('+254729341277')}
                className="flex items-center group transition-all duration-300 hover:text-green-200 hover:scale-105"
              >
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <PhoneCall className="w-4 h-4 mr-2" />
                  <motion.div
                    className="absolute inset-0 bg-green-200 rounded-full opacity-0 group-hover:opacity-20"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
                <span className="relative text-xs sm:text-sm font-medium">
                  +254729341277
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-200 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
            </div>
            {/* Address - hidden on very small screens */}
            <div className="flex items-center mt-2 sm:mt-0 group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <MapPin className="w-4 h-4 mr-2 group-hover:animate-bounce transition-all duration-300" />
              </motion.div>
              <span className="text-white/90 group-hover:text-white transition-colors duration-300 text-xs sm:text-sm hidden xs:block">
                NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road
              </span>
              <span className="text-white/90 group-hover:text-white transition-colors duration-300 text-xs sm:text-sm xs:hidden">
                Mombasa Road
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default NavbarTopBar 