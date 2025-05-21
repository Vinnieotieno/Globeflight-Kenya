"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Plane,
  Ship,
  Warehouse,
  FileCheck,
  ShoppingCart,
  Package,
  Globe,
  Clock,
  ArrowRight,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { logisticsServices } from "@/constants/servicepage"

const ServiceCard = ({ Icon, label, id, onClick, isActive }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(id)}
    className={`cursor-pointer ${isActive ? "ring-2 ring-green-500 ring-offset-2" : ""} rounded-lg overflow-hidden`}
  >
    <Card
      className={`flex items-center gap-4 p-4 transition-all hover:shadow-lg ${
        isActive ? "bg-green-50" : "hover:bg-gray-50"
      }`}
    >
      <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-full shadow-md">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-sm font-medium text-gray-800">{label}</div>
    </Card>
  </motion.div>
)

const LiveClock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md flex items-center space-x-2 z-10">
      <Clock className="h-4 w-4 text-green-600" />
      <span className="text-sm font-mono font-semibold">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </span>
    </div>
  )
}

const ShippingServices = () => {
  const navigate = useNavigate()
  const [activeService, setActiveService] = useState("air-freight")
  const [activeTab, setActiveTab] = useState("all")

  // Add Importer of Record service to the list
  const services = [
    { id: "air-freight", Icon: Plane, label: "Air Freight" },
    { id: "sea-freight", Icon: Ship, label: "Sea Freight" },
    { id: "warehouse-distribution", Icon: Warehouse, label: "Warehouse" },
    { id: "customs-clearance", Icon: FileCheck, label: "Custom Clearance" },
    { id: "ecommerce", Icon: ShoppingCart, label: "E-commerce" },
    { id: "consolidation", Icon: Package, label: "Consolidation" },
    { id: "importer-of-record", Icon: FileText, label: "Importer of Record (IOR)" },
    { id: "international-import", Icon: Globe, label: "International Import" },
  ]

  // Group services by category
  const serviceCategories = {
    all: services,
    freight: services.filter((s) => s.id.includes("freight")),
    logistics: services.filter((s) => ["warehouse-distribution", "consolidation"].includes(s.id)),
    customs: services.filter((s) => ["customs-clearance", "importer-of-record"].includes(s.id)),
    ecommerce: services.filter((s) => ["ecommerce", "international-import"].includes(s.id)),
  }

  const handleServiceClick = (id) => {
    setActiveService(id)
    // Navigate to service detail page
    // navigate(`/services/${id}`)
  }

  // Find the active service details from logisticsServices
  const activeServiceDetails = logisticsServices.find((s) => s.id === activeService) || {
    title: "Importer of Record (IOR)",
    desc: "Our Importer of Record (IOR) service enables businesses to import goods into countries where they don't have a legal entity. We handle all customs compliance, duties, and taxes, ensuring smooth international trade operations.",
    img: "/placeholder.svg",
  }

  return (
    <section
      className="w-full py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 -mt-12 relative z-10"
      aria-labelledby="shipping-services-heading"
    >
      {/* SEO-friendly hidden heading */}
      <h2 id="shipping-services-heading" className="sr-only">
        Globeflight Kenya Shipping and Logistics Services
      </h2>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium"
              >
                Comprehensive Solutions
              </motion.div>
              <h3 className="text-4xl font-bold tracking-tighter sm:text-5xl text-green-600">
                FOR ALL YOUR SHIPMENT SERVICES
              </h3>
              <div className="w-20 h-1 bg-green-600 rounded-full" />
              <p className="text-gray-600 md:text-lg leading-relaxed">
                Learn about Globeflight – the undisputed leader in international express shipping and logistics across
                East Africa. With over 25 years of experience, we deliver reliable and efficient solutions for all your
                shipping needs.
              </p>
            </div>

            <div className="space-y-6">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="freight">Freight</TabsTrigger>
                  <TabsTrigger value="logistics">Logistics</TabsTrigger>
                  <TabsTrigger value="customs">Customs</TabsTrigger>
                  <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
                </TabsList>

                {Object.keys(serviceCategories).map((category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {serviceCategories[category].map((service) => (
                        <ServiceCard
                          key={service.id}
                          Icon={service.Icon}
                          label={service.label}
                          id={service.id}
                          onClick={handleServiceClick}
                          isActive={activeService === service.id}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <Button
              size="lg"
              onClick={() => navigate("/services")}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white group"
            >
              <span>Explore All Globeflight Services</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <LiveClock />
            <Card className="overflow-hidden shadow-xl">
              <div className="relative h-[400px]">
                <img
                  alt={`Globeflight ${activeServiceDetails.title} service`}
                  className="w-full h-full object-cover"
                  src={activeServiceDetails.img || "/placeholder.svg"}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-green-800/40 to-green-400/20"></div>
              </div>

              <div className="p-6 bg-white">
                <h4 className="text-2xl font-bold mb-3 text-green-600">{activeServiceDetails.title}</h4>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{activeServiceDetails.desc}</p>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => navigate(`/services/${activeService}`)}
                >
                  Learn More
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ShippingServices
