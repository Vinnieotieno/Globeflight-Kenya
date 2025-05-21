"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, ArrowRight, Clock, Plane, Ship, Package, ExternalLink } from "lucide-react"
import { whereWeWorkCards } from "@/constants/homepage"

const CountryCard = ({ card, index, onClick }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-500 border-0 bg-white rounded-xl">
        <div className="relative h-56 overflow-hidden">
          <img
            src={card.img || "/placeholder.svg"}
            alt={`${card.title} shipping destination`}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
            <img
              src={card.flag || "/placeholder.svg"}
              alt={`${card.title} flag`}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-sm font-semibold text-gray-800">{card.title}</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 text-white">
              <Plane className="h-4 w-4" />
              <span className="text-sm">Express Shipping Available</span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <span>{card.title}</span>
            <div className="ml-auto flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>24-48h</span>
            </div>
          </CardTitle>
          <CardDescription>International shipping and logistics services</CardDescription>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Plane className="h-4 w-4 text-green-500" />
              <span>Air Freight</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Ship className="h-4 w-4 text-blue-500" />
              <span>Sea Freight</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Package className="h-4 w-4 text-amber-500" />
              <span>Express</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-red-500" />
              <span>Door to Door</span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            variant="outline"
            onClick={() => onClick(card)}
            className="w-full border-green-500 text-green-600 hover:bg-green-50 group"
          >
            <span>Shipping Details</span>
            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:rotate-45" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const WhereWeShip = ({ title = "Where We Ship Worldwide", styles = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" }) => {
  const [selectedCard, setSelectedCard] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true, threshold: 0.5 })

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsDialogOpen(true)
  }

  // Add shipping rates and transit times
  const shippingInfo = {
    "United States": {
      rates: { express: "$45-60/kg", standard: "$25-35/kg" },
      transit: { express: "2-3 days", standard: "5-7 days" },
      hubs: ["New York", "Los Angeles", "Chicago", "Miami", "Dallas"],
    },
    "United Kingdom": {
      rates: { express: "$40-55/kg", standard: "$20-30/kg" },
      transit: { express: "2-3 days", standard: "4-6 days" },
      hubs: ["London", "Manchester", "Birmingham", "Glasgow"],
    },
    "South Africa": {
      rates: { express: "$35-50/kg", standard: "$18-28/kg" },
      transit: { express: "1-2 days", standard: "3-5 days" },
      hubs: ["Johannesburg", "Cape Town", "Durban", "Pretoria"],
    },
    India: {
      rates: { express: "$42-58/kg", standard: "$22-32/kg" },
      transit: { express: "2-3 days", standard: "5-7 days" },
      hubs: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
    },
    China: {
      rates: { express: "$45-60/kg", standard: "$25-35/kg" },
      transit: { express: "2-4 days", standard: "6-9 days" },
      hubs: ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"],
    },
    Dubai: {
      rates: { express: "$38-52/kg", standard: "$20-30/kg" },
      transit: { express: "1-2 days", standard: "3-5 days" },
      hubs: ["Dubai", "Abu Dhabi", "Sharjah"],
    },
  }

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div ref={titleRef} className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 text-sm font-semibold text-green-600 bg-green-50 rounded-full mb-3">
              Global Reach
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our extensive shipping network spanning across continents with reliable and efficient service
            </p>
          </motion.div>

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        </motion.div>

        <div className={`grid gap-8 ${styles}`}>
          {whereWeWorkCards.map((card, idx) => (
            <CountryCard key={idx} card={card} index={idx} onClick={handleCardClick} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>View All Destinations</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-xl">
            {selectedCard && (
              <>
                <div className="relative h-48">
                  <img
                    src={selectedCard.img || "/placeholder.svg"}
                    alt={selectedCard.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                      <img
                        src={selectedCard.flag || "/placeholder.svg"}
                        alt={`${selectedCard.title} flag`}
                        className="w-8 h-8 rounded-full object-cover border-2 border-white"
                      />
                      <h3 className="text-2xl font-bold">{selectedCard.title}</h3>
                    </div>
                    <p className="text-white/80">International shipping and logistics services</p>
                  </div>
                </div>

                <div className="p-6">
                  <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl">Shipping to {selectedCard.title}</DialogTitle>
                    <DialogDescription>
                      Comprehensive logistics solutions for your {selectedCard.title} shipments
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">SHIPPING RATES</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Express</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {shippingInfo[selectedCard.title]?.rates.express || "$40-60/kg"}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Standard</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {shippingInfo[selectedCard.title]?.rates.standard || "$20-35/kg"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">TRANSIT TIMES</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Express</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {shippingInfo[selectedCard.title]?.transit.express || "2-3 days"}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Standard</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {shippingInfo[selectedCard.title]?.transit.standard || "5-7 days"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">MAIN SHIPPING HUBS</h4>
                      <div className="flex flex-wrap gap-2">
                        {(shippingInfo[selectedCard.title]?.hubs || ["Major Cities"]).map((hub, i) => (
                          <span key={i} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                            {hub}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Get Shipping Quote</Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export default WhereWeShip
