import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Navigation, Headphones, Globe, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TrackHero({ trackingNumber, setTrackingNumber, handleTrack, loading }) {
  return (
    <div className="relative">
      {/* Animated Gradient Blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-400/30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] bg-blue-400/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-green-600 to-emerald-700 opacity-95 z-0" />
      <div className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center mt-12 gap-2 px-4 py-2 mb-6 border rounded-full bg-white/10 backdrop-blur-md border-white/20">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full bg-white rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-2 h-2 bg-white rounded-full"></span>
            </span>
            <span className="text-sm font-medium text-white">Real-time Tracking Available</span>
          </div>
          <h1 className="mb-6 text-5xl font-black tracking-tight text-white md:text-7xl">
            Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Shipment</span>
          </h1>
          <p className="mb-12 text-xl font-light md:text-2xl text-white/90">
            Enter your consignment number to get instant updates on your package location
          </p>
          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="max-w-2xl mx-auto border border-green-100 shadow-2xl bg-white/95 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="relative">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-grow">
                      <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                      <Input
                        type="text"
                        placeholder="Enter consignment number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && trackingNumber && handleTrack(e)}
                        className="py-6 pl-12 pr-4 text-lg transition-colors border-2 border-gray-200 focus:border-green-500 rounded-xl"
                      />
                    </div>
                    <Button 
                      onClick={handleTrack}
                      className="px-8 py-6 text-lg font-bold text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl hover:shadow-xl hover:scale-105" 
                      disabled={loading || !trackingNumber}
                    >
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Tracking...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Track Now
                          <Navigation className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
                >
                  {/* 24/7 Support - Clickable WhatsApp Card */}
                  <a
                    href="https://wa.me/254729341277"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact 24/7 support on WhatsApp"
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-green-50 border border-green-100 shadow transition transform hover:scale-105 hover:bg-green-100 cursor-pointer focus:ring-2 focus:ring-green-400"
                  >
                    <Headphones className="w-7 h-7 text-green-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">Support Available</div>
                  </a>
                  {/* Countries Served */}
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 border border-blue-100 shadow">
                    <Globe className="w-7 h-7 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">175+</div>
                    <div className="text-sm text-gray-600">Countries Served</div>
                  </div>
                  {/* Delivery Success */}
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-emerald-50 border border-emerald-100 shadow">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">99.9%</div>
                    <div className="text-sm text-gray-600">Delivery Success</div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 