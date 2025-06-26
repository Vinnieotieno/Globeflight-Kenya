"use client"

import { useState, useEffect } from "react"
import { 
  MapPin, 
  Plane, 
  Ship, 
  Package, 
  Globe, 
  TrendingUp, 
  Users, 
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Truck,
  Navigation
} from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import { motion, AnimatePresence } from "framer-motion"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "@/lib/leafletIconFix"

const createCustomIcon = (color, isActive = false) =>
  L.divIcon({
    html: `
      <div style="position: relative;">
        <div style="position:absolute;width:${isActive ? '40px' : '30px'};height:${isActive ? '40px' : '30px'};background:${color};border-radius:50%;border:3px solid white;box-shadow:0 4px 20px rgba(0,0,0,0.3);top:${isActive ? '-20px' : '-15px'};left:${isActive ? '-20px' : '-15px'};display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;z-index:${isActive ? '1000' : '100'};">
          <div style="width:${isActive ? '12px' : '8px'};height:${isActive ? '12px' : '8px'};background:white;border-radius:50%;"></div>
        </div>
        <div style="position:absolute;width:${isActive ? '80px' : '60px'};height:${isActive ? '80px' : '60px'};background:${color};border-radius:50%;opacity:0.3;top:${isActive ? '-40px' : '-30px'};left:${isActive ? '-40px' : '-30px'};animation:pulse 2s infinite;"></div>
      </div>
      <style>
        @keyframes pulse {
          0% { transform: scale(0.5); opacity: 0.5; }
          50% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(0.5); opacity: 0.5; }
        }
      </style>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, -20],
    className: "custom-marker",
  })

const createArrowHead = ([from, to]) => {
  const angle = Math.atan2(to[0] - from[0], to[1] - from[1])
  const arrowSize = 2
  const tipLat = to[0]
  const tipLng = to[1]
  const leftLat = tipLat - arrowSize * Math.cos(angle - Math.PI / 6)
  const leftLng = tipLng - arrowSize * Math.sin(angle - Math.PI / 6)
  const rightLat = tipLat - arrowSize * Math.cos(angle + Math.PI / 6)
  const rightLng = tipLng - arrowSize * Math.sin(angle + Math.PI / 6)

  return [
    [leftLat, leftLng],
    [tipLat, tipLng],
    [rightLat, rightLng],
  ]
}

const connectionLines = [
  { from: [40, -100], to: [54, -3], color: "#10b981", label: "US → UK" },
  { from: [54, -3], to: [24, 54], color: "#3b82f6", label: "UK → UAE" },
  { from: [24, 54], to: [20, 78], color: "#ef4444", label: "UAE → India" },
  { from: [20, 78], to: [1.3, 103.8], color: "#ef4444", label: "India → Singapore" },
  { from: [1.3, 103.8], to: [-27, 133], color: "#06b6d4", label: "Singapore → Australia" },
  { from: [40, -100], to: [-10, -52], color: "#10b981", label: "US → Brazil" },
  { from: [-10, -52], to: [-30, 25], color: "#f59e0b", label: "Brazil → South Africa" },
  { from: [-30, 25], to: [24, 54], color: "#f59e0b", label: "South Africa → UAE" },
  { from: [51, 10], to: [35, 105], color: "#3b82f6", label: "Germany → China" },
  { from: [35, 105], to: [36, 138], color: "#ef4444", label: "China → Japan" },
  { from: [-1, 37], to: [24, 54], color: "#f59e0b", label: "Kenya → UAE" },
]

const shippingDestinations = [
  { 
    id: "us", 
    name: "United States", 
    coordinates: [40, -100], 
    color: "#10b981",
    flag: "🇺🇸",
    stats: { shipments: "2.5K+", time: "3-5 days", coverage: "98%" }
  },
  { 
    id: "uk", 
    name: "United Kingdom", 
    coordinates: [54, -3], 
    color: "#3b82f6",
    flag: "🇬🇧",
    stats: { shipments: "1.8K+", time: "2-4 days", coverage: "95%" }
  },
  { 
    id: "ae", 
    name: "UAE", 
    coordinates: [24, 54], 
    color: "#ef4444",
    flag: "🇦🇪",
    stats: { shipments: "3.2K+", time: "1-2 days", coverage: "99%" }
  },
  { 
    id: "in", 
    name: "India", 
    coordinates: [20, 78], 
    color: "#ef4444",
    flag: "🇮🇳",
    stats: { shipments: "4.1K+", time: "2-3 days", coverage: "97%" }
  },
  { 
    id: "sg", 
    name: "Singapore", 
    coordinates: [1.3, 103.8], 
    color: "#ef4444",
    flag: "🇸🇬",
    stats: { shipments: "2.9K+", time: "1-2 days", coverage: "99%" }
  },
  { 
    id: "au", 
    name: "Australia", 
    coordinates: [-27, 133], 
    color: "#06b6d4",
    flag: "🇦🇺",
    stats: { shipments: "1.6K+", time: "4-6 days", coverage: "94%" }
  },
  { 
    id: "br", 
    name: "Brazil", 
    coordinates: [-10, -52], 
    color: "#10b981",
    flag: "🇧🇷",
    stats: { shipments: "1.2K+", time: "3-5 days", coverage: "92%" }
  },
  { 
    id: "za", 
    name: "South Africa", 
    coordinates: [-30, 25], 
    color: "#f59e0b",
    flag: "🇿🇦",
    stats: { shipments: "800+", time: "2-4 days", coverage: "90%" }
  },
  { 
    id: "de", 
    name: "Germany", 
    coordinates: [51, 10], 
    color: "#3b82f6",
    flag: "🇩🇪",
    stats: { shipments: "2.1K+", time: "2-3 days", coverage: "96%" }
  },
  { 
    id: "cn", 
    name: "China", 
    coordinates: [35, 105], 
    color: "#ef4444",
    flag: "🇨🇳",
    stats: { shipments: "5.2K+", time: "2-4 days", coverage: "98%" }
  },
  { 
    id: "jp", 
    name: "Japan", 
    coordinates: [36, 138], 
    color: "#ef4444",
    flag: "🇯🇵",
    stats: { shipments: "1.9K+", time: "2-3 days", coverage: "95%" }
  },
  { 
    id: "ke", 
    name: "Kenya", 
    coordinates: [-1, 37], 
    color: "#f59e0b",
    flag: "🇰🇪",
    stats: { shipments: "6.5K+", time: "Same day", coverage: "100%" }
  },
]

const stats = [
  { icon: Globe, label: "Countries Served", value: "175+", color: "text-blue-600" },
  { icon: Package, label: "Monthly Shipments", value: "25K+", color: "text-green-600" },
  { icon: Clock, label: "Avg Delivery Time", value: "2.5 days", color: "text-purple-600" },
  { icon: Shield, label: "Success Rate", value: "99.2%", color: "text-red-600" },
]

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Express delivery in 24-48 hours" },
  { icon: Shield, title: "Secure & Insured", description: "Full coverage for all shipments" },
  { icon: Navigation, title: "Real-time Tracking", description: "Track your package anywhere" },
  { icon: Truck, title: "Door-to-Door", description: "Complete logistics solution" },
]

export default function WorldShippingMap() {
  const [activeDestination, setActiveDestination] = useState(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(0)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setIsMapLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto-rotate features
    const interval = setInterval(() => {
      setSelectedFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Header Section */}
      <section className="relative z-10 max-w-7xl px-4 mx-auto pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold tracking-wide text-green-600 uppercase bg-green-100 rounded-full border border-green-200"
          >
            <Globe className="w-4 h-4" />
            Trusted Worldwide
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6"
          >
            Ship Anywhere, Anytime with{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Globeflight World Express
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From small parcels to global freight — our smart logistics network ensures fast, secure, and trackable delivery to over 175 countries worldwide.
          </motion.p>
        </motion.div>

        {/* Stats Section 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>*/}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  selectedFeature === index
                    ? "border-green-500 bg-green-50 shadow-lg"
                    : "border-gray-200 bg-white/80 backdrop-blur-sm hover:border-green-300 hover:bg-green-50/50"
                }`}
                onClick={() => setSelectedFeature(index)}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl ${
                    selectedFeature === index ? "bg-green-100" : "bg-gray-100"
                  } transition-colors duration-300`}>
                    <feature.icon className={`w-5 h-5 ${
                      selectedFeature === index ? "text-green-600" : "text-gray-600"
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
                {selectedFeature === index && (
                  <motion.div
                    layoutId="activeFeature"
                    className="absolute inset-0 border-2 border-green-500 rounded-2xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="relative z-10 max-w-7xl px-4 mx-auto pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isMapLoaded ? 1 : 0, scale: isMapLoaded ? 1 : 0.95 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Map Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Global Shipping Network</h3>
                <p className="text-green-100">Interactive map showing our worldwide coverage</p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Active Routes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Major Hubs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative h-[500px] md:h-[600px]">
            <MapContainer 
              center={[20, 0]} 
              zoom={2} 
              scrollWheelZoom={false} 
              style={{ height: "100%", width: "100%" }}
              className="rounded-b-3xl"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Shipment Lines + Arrows */}
              {connectionLines.map((line, idx) => (
                <motion.div key={`route-${idx}`}>
                  <Polyline
                    positions={[line.from, line.to]}
                    color={line.color}
                    weight={3}
                    opacity={0.6}
                    dashArray="15, 15"
                  />
                  <Polyline
                    positions={createArrowHead([line.from, line.to])}
                    color={line.color}
                    weight={3}
                    opacity={0.9}
                  />
                </motion.div>
              ))}

              {/* Location Markers */}
              {shippingDestinations.map((loc) => (
                <Marker 
                  key={loc.id} 
                  position={loc.coordinates} 
                  icon={createCustomIcon(loc.color, activeDestination === loc.id)}
                  eventHandlers={{
                    click: () => setActiveDestination(activeDestination === loc.id ? null : loc.id),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-4 min-w-[200px]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{loc.flag}</span>
                        <h3 className="font-bold text-gray-900">{loc.name}</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Shipments:</span>
                          <span className="font-semibold text-green-600">{loc.stats.shipments}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery Time:</span>
                          <span className="font-semibold text-blue-600">{loc.stats.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Coverage:</span>
                          <span className="font-semibold text-purple-600">{loc.stats.coverage}</span>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Controls Overlay */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200">
              <div className="text-xs text-gray-600 mb-2 font-medium">Legend</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs">Americas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs">Europe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs">Asia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">Africa</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-8"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Ship Worldwide?</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Globeflight for their international shipping needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact-us"
                className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                Get Quote Now
              </a>
              <a 
                href="/track"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Track Package
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
