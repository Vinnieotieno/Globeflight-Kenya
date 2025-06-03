'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock, Package2, Truck, MapPin, FileDown } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_BASE = "http://localhost:5000/api"

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
    e.preventDefault()
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
    <div className="relative flex items-center justify-center min-h-screen px-4 py-20 overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-pattern opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
      
      <div className="container flex items-center justify-center mx-auto">
        <div className="relative z-10 w-full max-w-2xl space-y-8">
          <div className="mt-8 space-y-4 text-center">
            <h1 className="text-4xl font-extrabold text-white md:text-5xl drop-shadow-lg">
              Track Your Shipment
            </h1>
            <div className="flex items-center justify-center gap-2 text-white">
              <Clock className="w-6 h-6 animate-pulse" />
              <span className="text-lg font-medium md:text-xl">We're Here for You 24/7!</span>
            </div>
          </div>

          <Card className="overflow-hidden transition-all transform shadow-2xl bg-white/95 backdrop-blur-lg rounded-xl hover:scale-105">
            <CardContent className="p-6">
              <form onSubmit={handleTrack} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Input
                  type="text"
                  placeholder="Enter consignment number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  required
                  className="flex-grow text-lg placeholder:text-gray-400 focus:ring-2 focus:ring-green-500"
                />
                <Button 
                  type="submit" 
                  className="px-6 py-2 font-semibold text-white transition-colors duration-300 ease-in-out transform bg-green-500 rounded-lg hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Tracking...
                    </span>
                  ) : (
                    'Track Now'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive" className="max-w-3xl mx-auto animate-fadeIn">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {trackingData && (
            <Card className="mt-6 overflow-hidden shadow-2xl bg-white/95 backdrop-blur-lg rounded-xl animate-fadeIn">
              <CardHeader className="text-white bg-green-500">
                <CardTitle className="text-2xl font-bold text-center">Tracking Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-3">
                    <Package2 className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Consignment Number</p>
                      <p className="font-semibold">{trackingData.trackingNumber || trackingData.shipment_number}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-semibold">{trackingData.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Origin</p>
                      <p className="font-semibold">{trackingData.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-semibold">{trackingData.destination}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="relative pt-1">
                    <div className="flex h-2 mb-4 overflow-hidden text-xs bg-green-200 rounded">
                      <div
                        style={{ width: `${getProgress()}%` }}
                        className="flex flex-col justify-center text-center text-white transition-all duration-500 ease-in-out bg-green-500 shadow-none whitespace-nowrap"
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    {(trackingData.updates || []).map((update, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center ${
                          trackingData.status === update.status ? 'text-green-500' : 'text-gray-400'
                        }`}
                      >
                        <Package2 className={`h-6 w-6 mb-2 ${
                          trackingData.status === update.status ? 'text-green-500' : 'text-gray-400'
                        }`} />
                        <span className="hidden text-xs text-center sm:block">
                          {update.status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          <br />
                          <span className="text-[10px]">{new Date(update.createdAt).toLocaleString()}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button
                    className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={() => handleDownload('waybill')}
                  >
                    <FileDown className="w-5 h-5" /> Download Waybill
                  </Button>
                  <Button
                    className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={() => handleDownload('invoice')}
                  >
                    <FileDown className="w-5 h-5" /> Download Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {trackingData && latestUpdateWithLocation && (
            <div style={{ height: 300, width: "100%", marginTop: 24, borderRadius: 16, overflow: "hidden" }}>
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
                    {latestUpdateWithLocation.status} <br />
                    {latestUpdateWithLocation.location}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}