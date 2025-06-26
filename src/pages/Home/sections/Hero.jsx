import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Volume2, VolumeX, ChevronDown, Truck, Package, Warehouse, Globe, ArrowRight, Plane, Ship, Clock } from "lucide-react"
import { Link, useLocation } from "react-router-dom";
const Hero = () => {
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const services = [
    {
      title: "Air Freight",
      description: "Lightning-fast air cargo solutions across continents",
      icon: <Plane className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Sea Freight",
      description: "Cost-effective ocean transportation worldwide",
      icon: <Ship className="w-6 h-6" />,
      color: "from-teal-500 to-blue-500",
    },
    {
      title: "Warehousing",
      description: "State-of-the-art storage facilities",
      icon: <Warehouse className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "E-commerce",
      description: "Seamless fulfillment for online businesses",
      icon: <Package className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section ref={containerRef} className="relative w-full min-h-screen mt-16 overflow-hidden bg-black">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-blue-900/30" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Video Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-900 to-blue-900">
            <motion.div
              className="w-20 h-20 border-4 border-green-500 rounded-full border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
        
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-40" : "opacity-0"
          }`}
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-green-500/10 to-blue-500/10 blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div style={{ opacity }} className="relative z-10 mt-12 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Live Clock */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute px-4 py-2 border rounded-full top-20 right-4 md:right-8 bg-white/10 backdrop-blur-md border-white/20"
        >
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="font-mono text-sm text-white">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto space-y-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-6 py-2 mt-12 space-x-2 border rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border-white/10"
          >
            <Globe className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium tracking-wider text-green-400">GLOBEFLIGHT KENYA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
              LOGISTICS
            </span>
            <br />
            <span className="text-white">24.SEVEN.365</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto text-xl text-gray-300 md:text-2xl"
          >
            Revolutionizing supply chain excellence across East Africa and beyond
          </motion.p>
        </motion.div>

        {/* Service Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-4xl mx-auto mt-16"
        >
          <div className="relative h-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="p-8 transition-all border bg-white/5 backdrop-blur-xl rounded-2xl border-white/10 hover:border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${services[activeService].color} shadow-lg`}>
                        {services[activeService].icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{services[activeService].title}</h3>
                        <p className="mt-1 text-gray-400">{services[activeService].description}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-white/50" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Service Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeService ? "w-8 bg-green-400" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-4 mt-12 sm:flex-row"
        >
          <button className="relative px-8 py-4 overflow-hidden font-semibold text-white transition-all group bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl hover:scale-105">
            <Link to="/contact-us">
            <span className="relative z-10 flex items-center">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </span>
            </Link>
            <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-green-600 to-emerald-600 group-hover:opacity-100" />
          </button>
          
          <button className="px-8 py-4 font-semibold text-white transition-all border-2 border-white/20 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:scale-105">
            <Link to="/services">
            Explore Services
            </Link>
          </button>
          
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <span className="mb-2 text-sm transition-colors text-white/60 group-hover:text-white">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 transition-colors text-white/60 group-hover:text-white" />
          </motion.div>
        </motion.div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="absolute p-3 transition-all border rounded-full top-20 left-4 md:left-8 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20"
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
        </button>
      </motion.div>
    </section>
  )
}

export default Hero