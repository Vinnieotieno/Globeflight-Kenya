'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

const Hero = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleQuickContact = async (e) => {
    e.preventDefault()
    
    if (!email.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      console.log('Quick contact:', { email, message })
      
      // Use the backend API endpoint with fallback
      const apiEndpoint = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/contacts/public`
        : 'https://globeflight.co.ke/admin/api/contacts/public'
      
      console.log('Using API endpoint:', apiEndpoint)
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Quick Contact User',
          email: email,
          mobileNumber: '',
          services: [],
          inquiryType: 'feedback',
          message: message
        }),
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API error response text:', errorText)
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch (e) {
          errorData = { message: `HTTP ${response.status}: ${errorText}` }
        }
        throw new Error(errorData.message || `Failed to send message. Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API response:', data)
      
      toast({
        title: "Message Sent!",
        description: data.message || "We'll get back to you as soon as possible.",
      })
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('Error sending quick contact:', error)
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Scroll to main contact form
  const scrollToContactForm = () => {
    const formSection = document.getElementById('main-contact-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative pt-20 pb-10 overflow-hidden">
      {/* Background Image with Scaling Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: "url('https://www.detrack.com/wp-content/uploads/2015/05/retail-shipping.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
      <div className="relative z-20 container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-3xl mt-12 sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center lg:text-left">
              Contact Globeflight
            </h1>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 text-center lg:text-left">
              For More Personalise Information about Logistics Services
            </p>
            <div className="space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start text-white">
                <Phone className="w-6 h-6 mr-3 text-green-400" />
                <span>+254 729 341 277</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start text-white">
                <Mail className="w-6 h-6 mr-3 text-green-400" />
                <span>cs@globeflightkenya.com</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start text-white">
                <MapPin className="w-6 h-6 mr-3 text-green-400" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
            {/*
            <div className="mt-6 text-center">
              <span className="text-gray-500 text-sm">Want a detailed response? <br />
                <Button variant="link" className="text-green-600 p-0 h-auto min-h-0" onClick={scrollToContactForm}>
                  Scroll down for the full contact form
                  <ArrowDown className="inline ml-1 animate-bounce" />
                </Button>
              </span>
            </div>*/}
          </motion.div>

          {/* Quick Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto lg:mx-0"
            id="main-contact-form"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 text-center lg:text-left">Quick Contact</h2>
            <form onSubmit={handleQuickContact}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator Button */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Button
          variant="outline"
          size="lg"
          className="text-black border-white hover:bg-white hover:text-green mb-2"
          onClick={scrollToContactForm}
        >
          Scroll to Full Contact Form
          <ArrowDown className="ml-2 animate-bounce" />
        </Button>
       
      </motion.div>
    </div>
  )
}

export default Hero
