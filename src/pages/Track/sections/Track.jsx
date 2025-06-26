'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock, Package2, Truck, MapPin, FileDown, Search, CheckCircle2, CircleDot, AlertCircle, Navigation } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import 'leaflet/dist/leaflet.css'
import '@/lib/leafletIconFix'

const API_BASE = "http://globeflight.co.ke/api"

export default function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingData, setTrackingData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const stages = [
    'Created',
    'Collected',
    'Departed',
    'In Transit',
    'Arrived at Destination',
    'Out for Delivery',
    'Delivered',
  ]

  const handleTrack = async (e) => {
    if (e) e.preventDefault()
    if (!trackingNumber) return
    
    setLoading(true)
    setError(null)
    setTrackingData(null)
    try {
      const response = await fetch(`${API_BASE}/tracking/public/${trackingNumber}`)
      if (!response.ok) {
        if (response.status === 404) {
          setError('No shipment found for this consignment number.')
        } else {
          setError('An error occurred while fetching tracking data. Please try again later.')
        }
        setLoading(false)
        return
      }
      const res = await response.json()
      if (res && res.data) {
        setTrackingData(res.data)
      } else {
        setError('No shipment found for this consignment number.')
      }
    } catch (err) {
      // Optionally log error in development
      // console.error(err)
      setError('An error occurred while fetching tracking data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Progress calculation based on updates
  const getProgress = () => {
    if (!trackingData || !trackingData.updates) return 0
    const total = trackingData.updates.length
    if (trackingData.status === "delivered") return 100
    if (total === 0) return 10
    return Math.min(90, total * 25)
  }

  // Download PDF helper
  const handleDownload = async (type) => {
    if (!trackingData) return
    try {
      const res = await fetch(`${API_BASE}/tracking/${trackingData.id}/${type}`, {
        method: 'GET',
      })
      if (!res.ok) throw new Error('Failed to download')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${type}-${trackingData.trackingNumber || trackingNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError(`Failed to download ${type}`)
    }
  }

  // Get latest update with location
  const latestUpdateWithLocation = trackingData?.updates
    ? [...trackingData.updates].reverse().find(u => u.latitude && u.longitude)
    : null;

  return (
    <div className="relative min-h-screen mt-16 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #10b981 0, #10b981 1px, transparent 1px, transparent 20px),
                           repeating-linear-gradient(-45deg, #10b981 0, #10b981 1px, transparent 1px, transparent 20px)`
        }} />
      </div>
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-green-600 to-emerald-700 opacity-95" />
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
            <Card className="max-w-2xl mx-auto border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
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
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">Support Available</div>
                  </div>
                  <div className="text-center border-gray-200 border-x">
                    <div className="text-3xl font-bold text-gray-900">175+</div>
                    <div className="text-sm text-gray-600">Countries Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">99.9%</div>
                    <div className="text-sm text-gray-600">Delivery Success</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Results Section */}
      <div className="relative z-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="mb-8 border-red-200 bg-red-50">
                  <AlertCircle className="w-5 h-5" />
                  <AlertTitle className="text-lg font-bold">Tracking Error</AlertTitle>
                  <AlertDescription className="text-base">{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {trackingData && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Shipment Overview Card */}
                <Card className="overflow-hidden bg-white border-0 shadow-xl">
                  <CardHeader className="p-8 text-white bg-gradient-to-r from-green-500 to-emerald-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="mb-2 text-3xl font-bold">Shipment Details</CardTitle>
                        <p className="text-green-100">Tracking #{trackingData.trackingNumber || trackingData.shipment_number}</p>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md">
                          <CircleDot className="w-5 h-5" />
                          <span className="text-lg font-semibold capitalize">{trackingData.status}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-5 border border-gray-100 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-green-100 rounded-lg">
                            <Package2 className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="mb-1 text-sm text-gray-600">Consignment</p>
                            <p className="font-bold text-gray-900">{trackingData.trackingNumber || trackingData.shipment_number}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-5 border border-gray-100 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <MapPin className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="mb-1 text-sm text-gray-600">Origin</p>
                            <p className="font-bold text-gray-900">{trackingData.origin}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-5 border border-gray-100 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-purple-100 rounded-lg">
                            <MapPin className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="mb-1 text-sm text-gray-600">Destination</p>
                            <p className="font-bold text-gray-900">{trackingData.destination}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-5 border border-gray-100 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-orange-100 rounded-lg">
                            <Truck className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <p className="mb-1 text-sm text-gray-600">Status</p>
                            <p className="font-bold text-gray-900 capitalize">{trackingData.status}</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Progress Tracker */}
                    <div className="mb-8">
                      <h3 className="mb-6 text-xl font-bold text-gray-900">Shipment Progress</h3>
                      <div className="relative">
                        {/* Progress Bar Background */}
                        <div className="absolute left-0 right-0 h-1 bg-gray-200 rounded-full top-5" />
                        
                        {/* Progress Bar Fill */}
                        <div 
                          className="absolute left-0 h-1 transition-all duration-1000 ease-out rounded-full top-5 bg-gradient-to-r from-green-500 to-emerald-600"
                          style={{ width: `${getProgress()}%` }}
                        />

                        {/* Timeline Steps */}
                        <div className="relative flex justify-between">
                          {(trackingData.updates || []).map((update, index) => {
                            const isActive = trackingData.updates.findIndex(u => u.status === trackingData.status) >= index;
                            const isCurrent = update.status === trackingData.status;
                            
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col items-center"
                              >
                                <div className={`
                                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                                  ${isCurrent ? 'bg-green-500 scale-125 shadow-lg shadow-green-500/30' : 
                                    isActive ? 'bg-green-500' : 'bg-gray-300'}
                                `}>
                                  {isActive ? (
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                  ) : (
                                    <div className="w-3 h-3 bg-white rounded-full" />
                                  )}
                                </div>
                                <div className="mt-3 text-center">
                                  <p className={`text-sm font-semibold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {update.status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  </p>
                                  <p className="mt-1 text-xs text-gray-500">
                                    {new Date(update.createdAt).toLocaleDateString()}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {new Date(update.createdAt).toLocaleTimeString()}
                                  </p>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Download Actions */}
                    <div className="flex flex-wrap gap-4">
                      <Button
                        onClick={() => handleDownload('waybill')}
                        className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-200 transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg hover:scale-105"
                      >
                        <FileDown className="w-5 h-5" />
                        Download Waybill
                      </Button>
                      <Button
                        onClick={() => handleDownload('invoice')}
                        className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-200 transform bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg hover:scale-105"
                      >
                        <FileDown className="w-5 h-5" />
                        Download Invoice
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Section */}
                {latestUpdateWithLocation && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-xl">
                      <CardHeader className="border-b bg-gray-50">
                        <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                          <Navigation className="w-6 h-6 text-green-600" />
                          Current Location
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div style={{ height: 400, width: "100%" }}>
                          <MapContainer
                            center={[latestUpdateWithLocation.latitude, latestUpdateWithLocation.longitude]}
                            zoom={13}
                            style={{ height: "100%", width: "100%" }}
                          >
                            <TileLayer
                              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[latestUpdateWithLocation.latitude, latestUpdateWithLocation.longitude]}>
                              <Popup>
                                <div className="font-semibold">{latestUpdateWithLocation.status}</div>
                                <div className="text-sm text-gray-600">{latestUpdateWithLocation.location}</div>
                              </Popup>
                            </Marker>
                          </MapContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}