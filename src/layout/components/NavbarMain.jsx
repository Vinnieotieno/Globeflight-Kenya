import React from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "../../components/ui/dropdown-menu"
import { Helmet } from "react-helmet-async"

const NavbarMain = ({ data, pathname, isSticky, toggleMobileMenu, isMobileMenuOpen }) => {
  const { logo, navItems } = data

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": navItems.filter(item => !item.external).map(item => item.link),
    "url": navItems.filter(item => !item.external).map(item => `https://globeflight.co.ke${item.path}`)
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative py-4 transition-all duration-500 ${
        isSticky 
          ? "bg-white/90 backdrop-blur-md shadow-2xl" 
          : "bg-white shadow-sm"
      }`}
      aria-label="Main navigation"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(navigationSchema)}
        </script>
      </Helmet>
      <div className="w-full flex items-center justify-between px-4 lg:px-12">
        {/* Logo with hover effect */}
        <Link to="/" className="group">
          <motion.img 
            src={logo} 
            className="object-cover h-12 sm:h-16 md:h-20 w-auto transition-all duration-300 group-hover:scale-105" 
            alt="globeflight.co.ke"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </Link>
        {/* Nav links: flex-1, centered, more space */}
        <ul className="hidden lg:flex flex-1 justify-center items-center space-x-12">
          {/* Home link for SEO */}
          <motion.li 
            className="relative group"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <Link
              to="/"
              className={`relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3 ${pathname === "/" ? "text-green-600" : ""}`}
              title="Home"
            >
              <span className="relative z-10">Home</span>
              <span className="absolute inset-0 bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></span>
              {pathname === "/" && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
                />
              )}
            </Link>
          </motion.li>
          {/* Our Services link for SEO */}
          <motion.li 
            className="relative group"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              to="/services"
              className={`relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3 ${pathname === "/services" ? "text-green-600" : ""}`}
              title="Our Services"
            >
              <span className="relative z-10">Services</span>
              <span className="absolute inset-0 bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></span>
              {pathname === "/services" && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
                />
              )}
            </Link>
          </motion.li>
          {/* About Us link for SEO */}
          <motion.li 
            className="relative group"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <Link
              to="/about-us"
              className={`relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3 ${pathname === "/about-us" ? "text-green-600" : ""}`}
              title="About Us"
            >
              <span className="relative z-10">About Us</span>
              <span className="absolute inset-0 bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></span>
              {pathname === "/about-us" && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
                />
              )}
            </Link>
          </motion.li>
          {/* Our Blogs link for SEO */}
          <motion.li 
            className="relative group"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              to="/blog"
              className={`relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3 ${pathname === "/blog" ? "text-green-600" : ""}`}
              title="News Updates/Blogs"
            >
              <span className="relative z-10 flex items-center gap-1">
                Updates
                
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
          {/* Career link for SEO */}
          <motion.li 
            className="relative group"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/jobs"
              className={`relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3 ${pathname === "/jobs" ? "text-green-600" : ""}`}
              title="Career"
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
          {/* Contact Us link for SEO */}
          <motion.li 
            className="relative group"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Link
              to="/contact-us"
              className={`relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3 ${pathname === "/contact-us" ? "text-green-600" : ""}`}
              title="Contact Us"
            >
              <span className="relative z-10">Contact Us</span>
              <span className="absolute inset-0 bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></span>
              {pathname === "/contact-us" && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
                />
              )}
            </Link>
          </motion.li>
          {/* Track Your Shipment link for SEO */}
          <motion.li 
            className="relative group"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to="/track"
              className={`relative text-gray-700 font-medium hover:text-green-600 transition-all duration-300 py-2 px-3 ${pathname === "/track" ? "text-green-600" : ""}`}
              title="Track Your Shipment"
            >
              <span className="relative z-10">Track Shipment</span>
              <span className="absolute inset-0 bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></span>
              {pathname === "/track" && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
                />
              )}
            </Link>
          </motion.li>
        </ul>
        {/* Contact Us button - Desktop (compact) */}
        <motion.div 
          className="hidden lg:block ml-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            asChild 
            size="sm"
            className="relative group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-5 py-2 overflow-hidden text-base"
          >
            <Link to="/contact-us">
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                Get Quote 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Link>
          </Button>
        </motion.div>
        {/* External links dropdown: Company Platforms */}
        <div className="hidden lg:flex items-center ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-full px-5 py-2 shadow border border-green-100/60 focus:outline-none focus:ring-2 focus:ring-green-400 text-base"
                size="sm"
              >
                Our Platforms
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[14rem]">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500">Our Platforms</div>
              <div className="border-b border-gray-100 mb-1"></div>
              <DropdownMenuItem asChild>
                <a
                  href="https://globeflight.thinksynergyltd.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  aria-label="WMS Client Login"
                  title="WMS Client Login"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5m0 0l-5-5m5 5H3" /></svg>
                  WMS Login
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://bigdrop.co.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  aria-label="Bigdrop Ecommerce Platform"
                  title="Bigdrop Ecommerce Platform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h15l-1.5 9h-13L4 6zm0 0V4a2 2 0 012-2h2a2 2 0 012 2v2" /></svg>
                  Bigdrop
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
}

export default NavbarMain 