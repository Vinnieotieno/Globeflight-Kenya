import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Mail, Phone, MapPin, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export default function Navbar({ data }) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-[999]">
      {/* Top contact bar */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm md:flex-nowrap">
          <div className="flex items-center space-x-4">
            <a href="mailto:saleskenya@globeflight.co.ke" className="flex items-center hover:text-green-200 transition-colors duration-200">
              <Mail className="w-4 h-4 mr-2" />
              saleskenya@globeflight.co.ke
            </a>
            <a href="tel:+254729341277" className="flex items-center hover:text-green-200 transition-colors duration-200">
              <Phone className="w-4 h-4 mr-2" />
              +254729341277
            </a>
          </div>
          <div className="flex items-center mt-2 md:mt-0 hover:text-green-200 transition-colors duration-200">
            <MapPin className="w-4 h-4 mr-2" />
            NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav className={`py-4 bg-white transition-all duration-300 ${isSticky ? "shadow-lg" : ""}`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img src={data.logo} className="w-33 h-20 object-cover" alt="globeflight.co.ke" />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6">
            {data.navItems.map(({ link, path, external }) => (
              <li key={path} className="relative group">
                {external ? (
                  <a
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-green-500 transition-colors duration-200"
                  >
                    {link}
                  </a>
                ) : (
                  <Link
                    to={path}
                    className={`text-gray-700 hover:text-green-500 transition-colors duration-200 ${
                      pathname === path ? "font-bold text-green-500" : ""
                    }`}
                  >
                    {link}
                  </Link>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
            <li className="relative group">
              <Link
                to="/track"
                className={`text-gray-700 hover:text-green-500 transition-colors duration-200 ${
                  pathname === "/track" ? "font-bold text-green-500" : ""
                }`}
              >
                Track
              </Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative group">
              <a
                href="https://bigdrop.co.ke/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-green-500 transition-colors duration-200"
              >
                Bigdrop
              </a>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative group">
              <Link
                to="/blog"
                className={`text-gray-700 hover:text-green-500 transition-colors duration-200 ${
                  pathname === "/blog" ? "font-bold text-green-500" : ""
                }`}
              >
                Blog
              </Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>

          {/* Get a Quote button - Desktop */}
          <Button asChild className="hidden md:inline-flex bg-green-500 text-white hover:bg-green-600 transition-colors duration-200">
            <Link to="/contact-us">Get A Quote</Link>
          </Button>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none focus:text-green-500"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto py-4">
              <ul className="space-y-4">
                {data.navItems.map(({ link, path, external }) => (
                  <li key={path}>
                    {external ? (
                      <a
                        href={path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-700 hover:text-green-500 transition-colors duration-200"
                        onClick={toggleMobileMenu}
                      >
                        {link}
                      </a>
                    ) : (
                      <Link
                        to={path}
                        className={`block text-gray-700 hover:text-green-500 transition-colors duration-200 ${
                          pathname === path ? "font-bold text-green-500" : ""
                        }`}
                        onClick={toggleMobileMenu}
                      >
                        {link}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <Link
                    to="/track"
                    className={`block text-gray-700 hover:text-green-500 transition-colors duration-200 ${
                      pathname === "/track" ? "font-bold text-green-500" : ""
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    Track
                  </Link>
                </li>
                <li>
                  <a
                    href="https://bigdrop.co.ke/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-green-500 transition-colors duration-200"
                    onClick={toggleMobileMenu}
                  >
                    Bigdrop
                  </a>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className={`block text-gray-700 hover:text-green-500 transition-colors duration-200 ${
                      pathname === "/blog" ? "font-bold text-green-500" : ""
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Button asChild className="w-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200">
                    <Link to="/contact-us" onClick={toggleMobileMenu}>
                      Get A Quote
                    </Link>
                  </Button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}