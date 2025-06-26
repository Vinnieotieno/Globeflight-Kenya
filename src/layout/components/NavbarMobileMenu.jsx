import React from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Sparkles, PhoneCall, MessageCircle, MapPin } from "lucide-react"
import { Button } from "../../components/ui/button"

const NavbarMobileMenu = ({ isMobileMenuOpen, toggleMobileMenu, data, pathname, handlePhoneClick }) => (
  <AnimatePresence>
    {isMobileMenuOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={toggleMobileMenu}
        />
        {/* Mobile menu panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl lg:hidden overflow-y-auto"
        >
          {/* Mobile menu header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <Link to="/" onClick={toggleMobileMenu}>
                <img 
                  src={data.logo} 
                  className="h-12 w-auto" 
                  alt="globeflight.co.ke"
                />
              </Link>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                onClick={toggleMobileMenu}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          {/* Mobile menu items */}
          <div className="p-6">
            <ul className="space-y-1">
              {data.navItems.map(({ link, path, external }, index) => (
                <motion.li
                  key={path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {external ? (
                    <a
                      href={path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 font-medium"
                      onClick={toggleMobileMenu}
                    >
                      {link}
                    </a>
                  ) : (
                    <Link
                      to={path}
                      className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                        pathname === path 
                          ? "bg-green-50 text-green-600" 
                          : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      {link}
                    </Link>
                  )}
                </motion.li>
              ))}
              {/* Additional mobile menu items */}
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link
                  to="/track"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                    pathname === "/track" 
                      ? "bg-green-50 text-green-600" 
                      : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Track
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                <a
                  href="https://bigdrop.co.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 font-medium"
                  onClick={toggleMobileMenu}
                >
                  Bigdrop
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Link
                  to="/blog"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                    pathname === "/blog" 
                      ? "bg-green-50 text-green-600" 
                      : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <span className="flex items-center gap-2">
                    Blog
                    <Sparkles className="w-3 h-3 text-green-500" />
                  </span>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
              >
                <Link
                  to="/jobs"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                    pathname === "/jobs" 
                      ? "bg-green-50 text-green-600" 
                      : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Careers
                </Link>
              </motion.li>
            </ul>
            {/* Mobile CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-6 pt-6 border-t border-gray-100"
            >
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg transition-all duration-300 rounded-full py-4"
              >
                <Link to="/contact-us" onClick={toggleMobileMenu}>
                  <span className="flex items-center justify-center gap-2 font-semibold">
                    Get A Quote
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </Button>
            </motion.div>
            {/* Mobile contact info with enhanced icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="mt-6 pt-6 border-t border-gray-100 space-y-3"
            >
              <a 
                href="mailto:cs@globeflight.co.ke" 
                className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors duration-300 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                </motion.div>
                cs@globeflight.co.ke
              </a>
              <button 
                onClick={() => {
                  handlePhoneClick('+254729341277');
                  toggleMobileMenu();
                }}
                className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors duration-300 group w-full text-left"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <PhoneCall className="w-4 h-4 mr-2" />
                </motion.div>
                <span className="font-medium">+254729341277</span>
              </button>
              <div className="flex items-start text-sm text-gray-600">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                </motion.div>
                <span>NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

export default NavbarMobileMenu 