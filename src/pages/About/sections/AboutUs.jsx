import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Import sub-components
import {
  AboutHeader,
  CoreValuesSection,
  StatsSection,
  WhyChooseUsSection,
  ImageShowcaseSection,
  ServicesGridSection,
  SocialMediaSection,
  ImageModal
} from './components'

// About Section Component
const AboutUs = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  
  // Preload critical images
  useEffect(() => {
    const preloadImages = ['/3.jpg', '/1.jpg', '/2.jpg']
    preloadImages.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }
    
    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute rounded-full top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-green-200/30 to-blue-200/30 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
        {/* Section Header */}
        <AboutHeader />

        {/* Vision, Mission, Values Cards - MOVED TO FIRST */}
        <CoreValuesSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Why Choose Us Section */}
        <WhyChooseUsSection setSelectedImage={setSelectedImage} />

        {/* Modern Image Showcase Section */}
        <ImageShowcaseSection setSelectedImage={setSelectedImage} />

        {/* Final Image Showcase - Additional Services */}
        <ServicesGridSection setSelectedImage={setSelectedImage} />

        {/* Enhanced Social Media Section */}
        <SocialMediaSection />
      </div>

      {/* Image Zoom Modal */}
      <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
    </section>
  )
}

export default AboutUs
