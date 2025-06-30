import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Volume2, VolumeX, ChevronDown, Truck, Package, Warehouse, Globe, ArrowRight, Plane, Ship, Clock, Play } from "lucide-react"
import { Link, useLocation } from "react-router-dom";
const Hero = () => {
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isPlaying, setIsPlaying] = useState(true);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    if (video.paused) {
        setIsPlaying(false);
    }

    return () => {
        video.removeEventListener('play', onPlay);
        video.removeEventListener('pause', onPause);
    };
  }, [isVideoLoaded]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen mt-24 overflow-hidden bg-black">
      {/* Animated Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-[40vw] h-[40vw] bg-green-400/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-[40vw] h-[40vw] bg-blue-400/20 rounded-full blur-3xl animate-pulse z-0" />
      {/* Edge-to-Edge Video Background */}
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
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? "opacity-70" : "opacity-0"}`}
          poster="/herolanding.jpg"
        >
          <source src="/herovid.mp4" type="video/mp4" />
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        {/* Enhanced Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        
        {!isPlaying && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50" onClick={togglePlayPause}>
                <button className="p-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30">
                    <Play className="w-12 h-12 text-white" />
                </button>
            </div>
        )}
      </motion.div>
      {/* Main Content - Glassmorphism Card */}
      <motion.div style={{ opacity }} className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center"
        >
          {/* No glass card, just text and content directly over video */}
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-6 py-2 space-x-2 border rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border-white/10"
          >
            <Globe className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium tracking-wider text-green-400">GLOBEFLIGHT KENYA</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl"
            style={{ textShadow: '0 6px 32px rgba(0,0,0,0.85)' }}
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
            className="max-w-2xl mx-auto text-lg text-center text-white/90 md:text-xl drop-shadow-2xl"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.85)' }}
          >
            Revolutionizing supply chain excellence across East Africa and beyond
          </motion.p>
          {/* Service Carousel - Glassier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-2xl mx-auto mt-10"
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
                  <div className="p-6 transition-all border md:p-8 bg-white/20 backdrop-blur-2xl rounded-2xl border-white/20 hover:border-white/30 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 md:p-4 rounded-xl bg-gradient-to-br ${services[activeService].color} shadow-lg`}>{services[activeService].icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white md:text-2xl drop-shadow-lg">{services[activeService].title}</h3>
                          <p className="mt-1 text-sm text-white/80 md:text-base drop-shadow">{services[activeService].description}</p>
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
                  className={`h-2 rounded-full transition-all duration-300 ${index === activeService ? "w-8 bg-green-400" : "w-2 bg-white/30"}`}
                />
              ))}
            </div>
          </motion.div>
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-4 mt-10 sm:flex-row"
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
          {/* End hero content block */}
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