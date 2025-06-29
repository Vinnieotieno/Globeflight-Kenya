'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Info, VolumeX, Volume2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Helmet } from 'react-helmet-async'

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const playVideo = () => {
    setIsVideoPlaying(true)
  }

  return (
    <section className="relative mt-16 w-full min-h-[90vh] overflow-hidden bg-black">
      <Helmet>
        <title>Logistics & Shipping Services | Globeflight Kenya</title>
        <meta name="description" content="Discover modern, efficient, and secure logistics and shipping services with Globeflight Kenya. Air, sea, warehousing, customs, and more." />
        <meta property="og:title" content="Logistics & Shipping Services | Globeflight Kenya" />
        <meta property="og:description" content="Discover modern, efficient, and secure logistics and shipping services with Globeflight Kenya. Air, sea, warehousing, customs, and more." />
        <meta property="og:image" content="/service.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://globeflight.co.ke/services" />
        <link rel="canonical" href="https://globeflight.co.ke/services" />
      </Helmet>
      {/* Animated Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-[40vw] h-[40vw] bg-green-400/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-[40vw] h-[40vw] bg-blue-400/20 rounded-full blur-3xl animate-pulse z-0" />
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {isVideoPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/Yj-Urdb6GEE?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=Yj-Urdb6GEE`}
            title="Globeflight Kenya Logistics Services"
            className="w-full h-full object-cover"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/service.jpg"
            className="w-full h-full object-cover opacity-70"
          >
            <source src="/herovid.mp4" type="video/mp4" />
            <source src="/video1.mp4" type="video/mp4" />
          </video>
        )}
        {/* Strong Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8 min-h-[70vh] max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 drop-shadow-2xl"
          style={{ textShadow: '0 6px 32px rgba(0,0,0,0.85)' }}
        >
          Experience Seamless Logistics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl text-center mb-8 max-w-3xl drop-shadow-2xl"
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.85)' }}
        >
          Globeflight Kenya: Your Trusted Partner in Global Shipping and Logistics
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {!isVideoPlaying && (
            <Button 
              size="lg" 
              onClick={playVideo}
              className="bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300 font-bold shadow-lg"
            >
              <Play className="mr-2 h-5 w-5" /> Watch Video
            </Button>
          )}
          {isVideoPlaying && (
            <Button 
              size="lg" 
              onClick={() => setIsMuted(!isMuted)}
              className="bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300 font-bold shadow-lg"
            >
              {isMuted ? <VolumeX className="mr-2 h-5 w-5" /> : <Volume2 className="mr-2 h-5 w-5" />}
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
          )}
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-colors duration-300 font-bold shadow-lg"
          >
            <Info className="mr-2 h-5 w-5" /> Learn More
          </Button>
        </motion.div>
      </div>
      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>
      {/* Info Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="top-[45vh] mt-28 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>About Globeflight Kenya</DialogTitle>
            <DialogDescription>
              Globeflight Kenya is a leading logistics company providing comprehensive shipping and supply chain solutions. With our global network and cutting-edge technology, we ensure your goods reach their destination efficiently and securely.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Our Services:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>International Air Freight</li>
              <li>Sea Freight</li>
              <li>Customs Clearance</li>
              <li>Warehousing and Distribution</li>
              <li>E-commerce</li>
              <li>Regional Transport</li>
              <li>Consolidation</li>
            </ul>
          </div>
          <div className="mt-4">
            <Button onClick={() => setIsModalOpen(false)} className="w-full">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
