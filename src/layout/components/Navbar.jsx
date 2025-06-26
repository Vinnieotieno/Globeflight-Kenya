import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Mail, Phone, MapPin, Menu, X, ArrowRight, Sparkles, PhoneCall, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import NavbarTopBar from "./NavbarTopBar"
import NavbarProgressBar from "./NavbarProgressBar"
import NavbarMain from "./NavbarMain"
import NavbarMobileMenu from "./NavbarMobileMenu"

export default function Navbar({ data }) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 50);
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = (scrollY / documentHeight) * 100;
      setScrollProgress(progress);

      // Hide/show top bar based on scroll direction
      if (scrollY > lastScrollY && scrollY > 100) {
        setShowTopBar(false);
      } else if (scrollY < lastScrollY) {
        setShowTopBar(true);
      }
      
      setLastScrollY(scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handlePhoneClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-[999]">
      {/* Top contact bar with hide/show animation */}
      <NavbarTopBar showTopBar={showTopBar} handlePhoneClick={handlePhoneClick} />
      {/* Progress bar */}
      <NavbarProgressBar scrollProgress={scrollProgress} />
      {/* Main navigation bar */}
      <NavbarMain
        data={data}
        pathname={pathname}
        isSticky={isSticky}
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      {/* Mobile menu with enhanced animations */}
      <NavbarMobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        data={data}
        pathname={pathname}
        handlePhoneClick={handlePhoneClick}
      />
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            transform: translateX(0%);
          }
          50% {
            transform: translateX(-100%);
          }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </header>
  );
}