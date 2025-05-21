"use client"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Send, MapPin, Phone, Mail } from "lucide-react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const Footer = ({ data }) => {
  const [showFeedback, setShowFeedback] = useState(true)
  const [email, setEmail] = useState("")

  const mapRef = React.useRef(null)
  const mapInstanceRef = React.useRef(null)

  useEffect(() => {
    // Check if map is already initialized or if the container doesn't exist yet
    if (mapInstanceRef.current || !mapRef.current) return

    // Initialize the map
    mapInstanceRef.current = L.map(mapRef.current).setView([-1.3195, 36.897], 15)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current)

    // Add a marker for Nextgen Mall
    const marker = L.marker([-1.3195, 36.897]).addTo(mapInstanceRef.current)
    marker.bindPopup("Globeflight - Nextgen Mall").openPopup()

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Subscribed with email:", email)
    setEmail("")
  }

  return (
    <footer className="bg-gradient-to-br from-green-600 to-green-800 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      {showFeedback && (
        <Card className="fixed bottom-4 right-4 z-50 w-full max-w-sm bg-white text-green-800 shadow-xl rounded-lg overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">We Value Your Opinion</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFeedback(false)}
                className="text-green-800 hover:text-green-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm mb-4">What do you think of Globeflight?</p>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
              onClick={() => (window.location.href = "/contact-us")}
            >
              Give Feedback Now!
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src={data.brand || "/placeholder.svg"} className="w-40 h-20 object-contain" alt="Globeflight" />
            </Link>
            <p className="text-sm">{data.text1}</p>
            <p className="text-sm">&copy; {data.text2}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="hover:underline transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:underline transition-colors duration-300">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:underline transition-colors duration-300">
                  Track Shipment
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:underline transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Information</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <span>+254729341277</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <span>info@globeflight.co.ke</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Our Location</h3>
            <div ref={mapRef} className="h-48 rounded-lg shadow-md"></div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-green-400">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              {data.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-green-600 hover:bg-green-100 p-2 rounded-full transition-colors duration-300"
                >
                  {React.createElement(social.icon, { size: "20" })}
                </a>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-r-none bg-white text-green-800"
                required
              />
              <Button
                type="submit"
                className="rounded-l-none bg-white text-green-600 hover:bg-green-100 transition-colors duration-300"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
