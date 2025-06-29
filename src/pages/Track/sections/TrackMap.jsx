import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Navigation } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function TrackMap({ latestUpdateWithLocation }) {
  return (
    <div className="relative mt-8">
      {/* Animated Gradient Blob */}
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse z-0" />
      <Card className="overflow-hidden border border-green-100 shadow-2xl relative z-10">
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
    </div>
  )
} 