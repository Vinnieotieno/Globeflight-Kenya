import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen mt-12 overflow-hidden">

      {/* Hero Content - Now on Top */}
      <div className="container relative z-20 px-4 mx-auto mt-12 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mt-12 bg-green-500/20 backdrop-blur-sm border-2 border-green-500/40 rounded-full px-6 py-3 mb-10 shadow-[0_0_40px_rgba(34,197,94,0.3)]"
          >
            <span className="relative flex w-3 h-3">
              <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span>
            </span>
            <span className="text-base font-bold text-green-400 animate-pulse">Trusted by 1000+ Companies</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-12 font-black text-white mb-8 leading-[1.1] tracking-tight"
          >
            <span className="block mb-2">Discover the</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
              Globeflight Advantage
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto mb-12 text-xl font-light leading-relaxed text-gray-200 sm:text-2xl md:text-3xl"
          >
            Your trusted partner in global logistics and supply chain solutions. 
            <span className="block mt-2 font-medium text-green-400">Delivering excellence across 175+ countries.</span>
          </motion.p>

          {/* CTA Buttons 
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col justify-center gap-6 sm:flex-row"
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="group black-white border-2 border-white/40 hover:green-white hover:text-black px-10 py-8 text-xl font-bold rounded-full backdrop-blur-sm transition-all duration-300 hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] transform hover:scale-105"
            >
              <Play className="w-6 h-6 mr-3" />
              Watch Our Story
            </Button>
          </motion.div>*/}
        </div>
      </div>

      {/* Video Background - Now Behind */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/video2.mp4" type="video/mp4" />
          <img src="/globe1.jpg" alt="Globeflight Logistics" className="object-cover w-full h-full" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent" />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center w-6 h-10 border-2 rounded-full border-white/30"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 mt-2 rounded-full bg-white/60"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
