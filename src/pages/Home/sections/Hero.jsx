"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Volume2, VolumeX, ChevronDown, Truck, Package, Warehouse, Globe, ArrowRight } from "lucide-react"
import aeroplane from "@/assets/aeroplane.png"
import video from "@/assets/herovid.mp4"

// SEO-friendly metadata component
const HeroMetadata = () => (
  <>
    <h1 className="sr-only">
      Globeflight Kenya - Your Trusted Logistics, Warehousing & Fulfillment Partner in East Africa
    </h1>
    <meta
      name="description"
      content="Globeflight Kenya offers 24/7/365 logistics, warehousing and fulfillment services across East Africa. Reliable, efficient and professional cargo solutions."
    />
  </>
)

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true)
  const [showValues, setShowValues] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const videoRef = useRef(null)
  const servicesRef = useRef(null)

  const services = [
    {
      title: "Air Freight",
      description: "Fast and reliable air freight services across East Africa and beyond",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Road Transport",
      description: "Efficient road transportation solutions for your logistics needs",
      icon: <Truck className="h-6 w-6" />,
    },
    {
      title: "Warehousing",
      description: "Secure storage and warehousing facilities for your goods",
      icon: <Warehouse className="h-6 w-6" />,
    },
    {
      title: "Fulfillment",
      description: "Complete order fulfillment and distribution services",
      icon: <Package className="h-6 w-6" />,
    },
  ]

  useEffect(() => {
    // Rotate through services automatically
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [services.length])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden" aria-label="Hero section">
      <HeroMetadata />

      {/* Video Background Section with Preload Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-blue-900">
        {/* Video placeholder before video loads */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={handleVideoLoad}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 mt-12 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2 text-green-400 font-semibold tracking-wider text-center"
        >
          WELCOME TO GLOBEFLIGHT KENYA
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-center mb-4 leading-tight"
        >
          <span className="text-green-400">LOGISTICS</span> 24.SEVEN.365
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-20 h-1 bg-green-400 mb-8"
        ></motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-xl sm:text-2xl md:text-3xl font-medium text-center mb-6 max-w-3xl leading-relaxed"
        >
          Your Trusted & Credible Logistics, Warehousing & Fulfillment Partner
        </motion.h3>

        {/* Rotating Services Showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10 h-24 relative w-full max-w-lg"
          ref={servicesRef}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full mb-3">{services[activeService].icon}</div>
              <h4 className="text-green-400 font-semibold mb-1">{services[activeService].title}</h4>
              <p className="text-white/80 text-sm max-w-md">{services[activeService].description}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          {/*<Button
            size="lg"
            variant="outline"
            onClick={scrollToServices}
            className="w-full sm:w-auto text-lg border-white text-white hover:bg-white hover:text-green-700 transition-all duration-300"
          >
            Explore Services
          </Button>
          <Button
            size="lg"
            variant="default"
            asChild
            className="w-full sm:w-auto text-lg bg-green-500 hover:bg-green-600 transition-all duration-300"
          >
            <Link to="/contact">
              Contact Us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>*/}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowValues(!showValues)}
            className="text-white hover:text-green-400 transition-colors animate-bounce"
            aria-label={showValues ? "Hide our values" : "Show our values"}
          >
            <ChevronDown className="h-8 w-8" />
          </Button>
          <span className="text-white text-sm mt-2">Our Values</span>
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="absolute top-4 right-4 text-white hover:text-green-400 transition-colors bg-black/30 backdrop-blur-sm rounded-full"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </Button>
      </div>

      {/* Values Card Section */}
      <AnimatePresence>
        {showValues && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="absolute bottom-0 left-0 right-0 z-20"
          >
            <Card className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-xl p-6 mx-auto w-[90%] sm:w-[85%] md:w-[75%] lg:w-[60%] xl:w-[55%] border-t-4 border-white">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="bg-white text-green-600 font-bold px-4 py-2 rounded-md">OUR VALUES</div>
                  <motion.img
                    src={aeroplane}
                    alt="Aeroplane"
                    className="w-12 h-12 object-contain"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Our Commitment to Excellence</p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {["Reliability", "Integrity", "Efficiency", "Innovation", "Professionalism"].map((value, index) => (
                      <motion.span
                        key={value}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {value}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Hero
