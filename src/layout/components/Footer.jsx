"use client"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { 
  X, 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  MessageSquare, 
  CheckCircle,
  ExternalLink,
  Globe,
  Truck,
  Shield,
  Clock,
  Heart,
  Cookie,
  Settings,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Cookies from "js-cookie"
import axios from "axios"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "@/lib/leafletIconFix"
import FooterNewsletter from "./FooterNewsletter"
import FooterLinks from "./FooterLinks"
import FooterContactInfo from "./FooterContactInfo"
import FooterMap from "./FooterMap"
import FooterBottom from "./FooterBottom"

// API Configuration
const API_BASE = (() => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:5000/api';
    } else {
      return 'https://globeflight.co.ke/api';
    }
  }
  return 'http://localhost:5000/api';
})();

const Footer = ({ data }) => {
  const [showFeedback, setShowFeedback] = useState(false)
  const [showCookieConsent, setShowCookieConsent] = useState(false)
  const [email, setEmail] = useState("")
  const [feedbackRating, setFeedbackRating] = useState(0)
  const [feedbackComment, setFeedbackComment] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  
  // Newsletter subscription states
  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [subscribeLoading, setSubscribeLoading] = useState(false)
  const [subscribeError, setSubscribeError] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const mapRef = React.useRef(null)
  const mapInstanceRef = React.useRef(null)

  useEffect(() => {
    // Check for cookie consent
    const cookieConsent = Cookies.get('cookie-consent')
    if (!cookieConsent) {
      setShowCookieConsent(true)
    }

    // Check for feedback submission
    const feedbackSubmitted = Cookies.get('feedback-submitted')
    if (!feedbackSubmitted) {
      setTimeout(() => setShowFeedback(true), 5000) // Show after 5 seconds
    }
  }, [])

  useEffect(() => {
    // Initialize map
    if (mapInstanceRef.current || !mapRef.current) return

    mapInstanceRef.current = L.map(mapRef.current).setView([-1.3195, 36.897], 15)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current)

    // Add a custom marker for Nextgen Mall
    const marker = L.marker([-1.3195, 36.897]).addTo(mapInstanceRef.current)
    marker.bindPopup(`
      <div class="text-center">
        <strong>Globeflight Kenya</strong><br>
        NEXTGEN MALL, 3rd Floor<br>
        Suite 39/40, Mombasa Road
      </div>
    `).openPopup()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Newsletter subscription handler (from BlogPage.jsx)
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subscribeEmail || !subscribeEmail.includes('@')) {
      setSubscribeError('Please enter a valid email address');
      return;
    }

    setSubscribeLoading(true);
    setSubscribeError('');
    
    try {
      const res = await axios.post(`${API_BASE}/blogs/newsletter/subscribe`, {
        email: subscribeEmail
      });
      
      if (res.data.success) {
        setShowSuccessMessage(true);
        setSubscribeEmail('');
        setTimeout(() => setShowSuccessMessage(false), 5000);
      }
    } catch (err) {
      setSubscribeError(err.response?.data?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setSubscribeLoading(false);
    }
  };

  const handleCookieAccept = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 })
    setShowCookieConsent(false)
  }

  const handleCookieDecline = () => {
    Cookies.set('cookie-consent', 'declined', { expires: 365 })
    setShowCookieConsent(false)
  }

  const handleFeedbackSubmit = async () => {
    const feedbackData = {
      rating: feedbackRating,
      comment: feedbackComment,
      feedbackType: 'general', 
      userAgent: navigator.userAgent,
      pageUrl: window.location.href
    };

    try {
      // Send feedback to backend database
      const response = await axios.post(`${API_BASE}/feedback/submit`, feedbackData);
      
      if (response.data.success) {
        console.log("Feedback saved to database:", feedbackData);
        
        // Set cookie to prevent showing again for 30 days
        Cookies.set('feedback-submitted', 'true', { expires: 30 });
        setFeedbackSubmitted(true);
        
        setTimeout(() => {
          setShowFeedback(false);
          setFeedbackSubmitted(false);
          setFeedbackRating(0);
          setFeedbackComment("");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to save feedback:", error);
      
      // Fallback: still show success message and set cookie
      Cookies.set('feedback-submitted', 'true', { expires: 30 });
      setFeedbackSubmitted(true);
      
      setTimeout(() => {
        setShowFeedback(false);
        setFeedbackSubmitted(false);
        setFeedbackRating(0);
        setFeedbackComment("");
      }, 2000);
    }
  };

  const handlePhoneClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`
  }

  return (
    <>
      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showCookieConsent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Cookie className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">We use cookies</h3>
                    <p className="text-sm text-gray-600">
                      We use cookies to enhance your experience and analyze site traffic. 
                      By continuing to use our site, you consent to our use of cookies.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCookieDecline}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleCookieAccept}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Newsletter Section */}
          <FooterNewsletter
            subscribeEmail={subscribeEmail}
            setSubscribeEmail={setSubscribeEmail}
            subscribeLoading={subscribeLoading}
            subscribeError={subscribeError}
            showSuccessMessage={showSuccessMessage}
            handleSubscribe={handleSubscribe}
          />

          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Company Info */}
              <div className="space-y-6">
                {/*<Link to="/" className="inline-block">
                  <img 
                    src={data.brand || "./logo.png"} 
                    className="w-40 h-20 object-contain filter brightness-0 invert" 
                    alt="Globeflight" 
                  />
                </Link>*/}
                <p className="text-gray-300 leading-relaxed">
                  {data.text1 || "Your trusted partner in global logistics and shipping solutions. We connect Kenya to the world with reliable, efficient, and cost-effective shipping services."}
                </p>
                <div className="flex space-x-4">
                  {data.socials?.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      {React.createElement(social.icon, { size: "18" })}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <FooterLinks />

              {/* Contact Information */}
              <FooterContactInfo handlePhoneClick={handlePhoneClick} />

              {/* Location Map */}
              <FooterMap />
            </div>

            {/* Bottom Section */}
            <FooterBottom />
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
