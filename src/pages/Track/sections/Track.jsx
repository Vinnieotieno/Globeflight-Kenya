import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock, Package } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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

    try {
      const response = await fetch(`https://globeflight.co.ke/wp-json/wpcargo/v1/track?consignment_number=${trackingNumber}`)
      if (!response.ok) {
        throw new Error('Failed to fetch tracking data')
      }
      const data = await response.json()
      if (data && data.length > 0) {
        setTrackingData(data[0])
      } else {
        throw new Error('No tracking data found')
      }
    } catch (err) {
      console.error('Error fetching tracking information:', err)
      setError('You have entered a wrong tracking information. Please check your consignment number.')
    } finally {
      setLoading(false)
    }
  }

  const getProgress = () => {
    if (!trackingData) return 0
    const currentStage = stages.findIndex(stage => stage.toLowerCase() === trackingData.status.toLowerCase())
    return ((currentStage + 1) / stages.length) * 100
  }

  return (
    <div className="min-h-screen bg-green-300 flex items-center justify-center py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/')] opacity-10" />
      
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="w-full max-w-2xl space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-zinc-900">
            Track Your Shipment
          </h1>
          
          <div className="flex justify-center items-center gap-2 text-zinc-800">
            <Clock className="h-5 w-5" />
            <span className="font-medium text-sm md:text-base">WE'RE HERE FOR YOU 24/7!</span>
          </div>

          <Card className="bg-white/95 backdrop-blur-lg shadow-2xl p-8 rounded-lg">
            <CardContent>
              <form onSubmit={handleTrack} className="flex space-x-4">
                <Input
                  type="text"
                  placeholder="Enter consignment number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Button type="submit" className="bg-green-500 hover:bg-orange-600" disabled={loading}>
                  {loading ? 'Tracking...' : 'Track'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive" className="max-w-3xl mx-auto">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {trackingData && (
            <Card className="bg-white/95 backdrop-blur-lg shadow-2xl p-8 rounded-lg mt-6">
              <CardHeader>
                <CardTitle className="text-xl text-center">Tracking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-bold">Consignment Number:</span>
                    <span>{trackingData.shipment_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Status:</span>
                    <span>{trackingData.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Origin:</span>
                    <span>{trackingData.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Destination:</span>
                    <span>{trackingData.destination}</span>
                  </div>
                  <div className="mt-6">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200">
                        <div
                          style={{ width: `${getProgress()}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      {stages.map((stage, index) => (
                        <div
                          key={index}
                          className={`flex flex-col items-center ${
                            trackingData.status.toLowerCase() === stage.toLowerCase() ? 'text-orange-500' : 'text-gray-500'
                          }`}
                        >
                          <Package className="h-6 w-6 mb-2" />
                          <span className="text-xs text-center">{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
