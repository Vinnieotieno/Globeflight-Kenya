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
import TrackHero from './TrackHero'
import TrackResults from './TrackResults'
import TrackMap from './TrackMap'

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
      {/* Hero/Search Section */}
      <TrackHero
        trackingNumber={trackingNumber}
        setTrackingNumber={setTrackingNumber}
        handleTrack={handleTrack}
        loading={loading}
      />
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
              <TrackResults
                trackingData={trackingData}
                getProgress={getProgress}
                handleDownload={handleDownload}
              />
            )}
            {trackingData && latestUpdateWithLocation && (
              <TrackMap latestUpdateWithLocation={latestUpdateWithLocation} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}