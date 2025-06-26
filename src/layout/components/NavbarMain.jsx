import React from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "../../components/ui/button"

const NavbarMain = ({ data, pathname, isSticky, toggleMobileMenu, isMobileMenuOpen }) => (
  <motion.nav 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className={`relative py-4 transition-all duration-500 ${
      isSticky 
        ? "bg-white/90 backdrop-blur-md shadow-2xl" 
        : "bg-white shadow-sm"
    }`}
  >
    <div className="container flex items-center justify-between mx-auto px-4">
      {/* Logo with hover effect */}
      <Link to="/" className="group">
        <motion.img 
          src={data.logo} 
          className="object-cover h-12 sm:h-16 md:h-20 w-auto transition-all duration-300 group-hover:scale-105" 
          alt="globeflight.co.ke"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
      </Link>
      {/* Desktop menu with enhanced styling */}
      <ul className="hidden lg:flex items-center space-x-8">
        {data.navItems.map(({ link, path, external }, index) => (
          <motion.li 
            key={path} 
            className="relative group"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
          >
            {external ? (
              <a
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2"
              >
                <span className="relative z-10">{link}</span>
                <span className="absolute inset-0 bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></span>
              </a>
            ) : (
              <Link
                to={path}
                className={`relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3 ${
                  pathname === path ? "text-green-600" : ""
                }`}
              >
                <span className="relative z-10">{link}</span>
                <span className="absolute inset-0 bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></span>
                {pathname === path && (
                  <motion.span 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )}
          </motion.li>
        ))}
        {/* Additional menu items */}
        <motion.li 
          className="relative group"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Link
            to="/track"
            className={`relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3 ${
              pathname === "/track" ? "text-green-600" : ""
            }`}
          >
            <span className="relative z-10">Track</span>
            <span className="absolute inset-0 bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></span>
            {pathname === "/track" && (
              <motion.span 
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
              />
            )}
          </Link>
        </motion.li>
        <motion.li 
          className="relative group"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://bigdrop.co.ke/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3"
          >
            <span className="relative z-10">Bigdrop</span>
            <span className="absolute inset-0 bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></span>
          </a>
        </motion.li>
        <motion.li 
          className="relative group"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Link
            to="/blog"
            className={`relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3 ${
              pathname === "/blog" ? "text-green-600" : ""
            }`}
          >
            <span className="relative z-10 flex items-center gap-1">
              Blog
              <Sparkles className="w-3 h-3 text-green-500" />
            </span>
            <span className="absolute inset-0 bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></span>
            {pathname === "/blog" && (
              <motion.span 
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
              />
            )}
          </Link>
        </motion.li>
        <motion.li 
          className="relative group"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            to="/jobs"
            className={`relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3 ${
              pathname === "/jobs" ? "text-green-600" : ""
            }`}
          >
            <span className="relative z-10">Careers</span>
            <span className="absolute inset-0 bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></span>
            {pathname === "/jobs" && (
              <motion.span 
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
              />
            )}
          </Link>
        </motion.li>
      </ul>
      {/* Get a Quote button - Desktop */}
      <motion.div 
        className="hidden lg:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button 
          asChild 
          className="relative group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3 overflow-hidden"
        >
          <Link to="/contact-us">
            <span className="relative z-10 flex items-center gap-2 font-semibold">
              Get A Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Link>
        </Button>
      </motion.div>
      {/* Mobile menu button */}
      <motion.button
        className="lg:hidden relative w-10 h-10 text-gray-700 focus:outline-none rounded-lg hover:bg-gray-100 transition-colors duration-300"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isMobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  </motion.nav>
)

export default NavbarMain 