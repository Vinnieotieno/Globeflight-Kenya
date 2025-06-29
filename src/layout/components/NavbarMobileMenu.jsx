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
          aria-label="Main navigation"
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
              {/* Home link for SEO */}
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.01 }}
              >
                <Link
                  to="/"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${pathname === "/" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600 hover:bg-green-50"}`}
                  onClick={toggleMobileMenu}
                  title="Home"
                >
                  Home
                </Link>
              </motion.li>
              {/* Our Services link for SEO */}
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.02 }}
              >
                <Link
                  to="/services"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${pathname === "/services" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600 hover:bg-green-50"}`}
                  onClick={toggleMobileMenu}
                  title="Our Services"
                >
                  Our Services
                </Link>
              </motion.li>
              {/* About Us link for SEO */}
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.025 }}
              >
                <Link
                  to="/about-us"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${pathname === "/about-us" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600 hover:bg-green-50"}`}
                  onClick={toggleMobileMenu}
                  title="About Us"
                >
                  About Us
                </Link>
              </motion.li>
              {/* News Updates/Blogs link for SEO */}
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.03 }}
              >
                <Link
                  to="/blog"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${pathname === "/blog" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600 hover:bg-green-50"}`}
                  onClick={toggleMobileMenu}
                  title="News Updates/Blogs"
                >
                  <span className="flex items-center gap-2">
                    News Updates/Blogs
                    <Sparkles className="w-3 h-3 text-green-500" />
                  </span>
                </Link>
              </motion.li>
              {/* Career link for SEO */}
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.04 }}
              >
                <Link
                  to="/jobs"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${pathname === "/jobs" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600 hover:bg-green-50"}`}
                  onClick={toggleMobileMenu}
                  title="Career"
                >
                  Career
                </Link>
              </motion.li>
              {/* Contact Us link for SEO */}
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <Link
                  to="/contact-us"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${pathname === "/contact-us" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600 hover:bg-green-50"}`}
                  onClick={toggleMobileMenu}
                  title="Contact Us"
                >
                  Contact Us
                </Link>
              </motion.li>
              {/* Track Your Shipment link for SEO */}
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.06 }}
              >
                <Link
                  to="/track"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${pathname === "/track" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600 hover:bg-green-50"}`}
                  onClick={toggleMobileMenu}
                  title="Track Your Shipment"
                >
                  Track Your Shipment
                </Link>
              </motion.li>
            </ul>
            {/* Contact Us button - Mobile */}
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
                    Contact Us
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
            {/* External links: WMS and Bigdrop */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="https://globeflight.thinksynergyltd.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WMS Client Login"
                title="WMS Client Login"
                className="flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow hover:from-green-700 hover:to-green-600 transition-all duration-300 border border-green-100/60 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <span>WMS Login</span>
                {/* Lucide LogIn icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5m0 0l-5-5m5 5H3" /></svg>
              </a>
              <a
                href="https://bigdrop.co.ke/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bigdrop Ecommerce Platform"
                title="Bigdrop Ecommerce Platform"
                className="flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow hover:from-green-700 hover:to-green-600 transition-all duration-300 border border-green-100/60 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <span>Bigdrop</span>
                {/* Lucide ShoppingCart icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h15l-1.5 9h-13L4 6zm0 0V4a2 2 0 012-2h2a2 2 0 012 2v2" /></svg>
              </a>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

export default NavbarMobileMenu 