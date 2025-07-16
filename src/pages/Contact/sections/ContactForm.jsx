'use client'

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Send, MapPin, Phone, Mail, Globe, Plane, Ship, FileCheck, Warehouse, ShoppingCart, Truck, Package, MessageSquare, HelpCircle } from "lucide-react"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@/lib/leafletIconFix'

const contactFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: yup.string().required("Mobile number is required"),
  services: yup.array().of(yup.string()),
  inquiryType: yup.string().required("Please select an inquiry type"),
  message: yup.string().required("Message is required"),
})

const services = [
  { id: "airFreight", label: "Air Freight", icon: Plane },
  { id: "seaFreight", label: "Sea Freight", icon: Ship },
  { id: "customsClearance", label: "Customs Clearance", icon: FileCheck },
  { id: "warehousing", label: "Warehousing", icon: Warehouse },
  { id: "ecommerce", label: "E-commerce Logistics", icon: ShoppingCart },
  { id: "roadTransport", label: "Road Transport", icon: Truck },
  { id: "projectCargo", label: "Project Cargo", icon: Package },
]

const inquiryTypes = [
  { id: "quote", label: "Request a Quote", icon: Truck },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
  { id: "support", label: "Customer Support", icon: HelpCircle },
]

const offices = [
  {
    country: "Kenya (HQ)",
    address: "NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road, Nairobi",
    phone: "+254729341277",
    email: "info@globeflight.co.ke",
    coordinates: [-1.3195, 36.8970]
  },
  {
    country: "USA",
    address: "Queens NY 11413",
    phone: "+1 (123) 456-7890",
    email: "usa@globeflight.com",
    coordinates: [40.6782, -73.7949]
  },
  {
    country: "South Africa",
    address: "Kempton Park",
    phone: "+27 (11) 123-4567",
    email: "sa@globeflight.com",
    coordinates: [-26.1087, 28.2322]
  },
  {
    country: "China",
    address: "Guang Dong Sheng 510091",
    phone: "+86 (20) 1234-5678",
    email: "china@globeflight.com",
    coordinates: [23.1291, 113.2644]
  },
  {
    country: "UK",
    address: "London",
    phone: "+44 (20) 1234-5678",
    email: "uk@globeflight.com",
    coordinates: [51.5074, -0.1278]
  }
]

export default function GlobalflightContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const mapRef = useRef(null)
  const [activeOffice, setActiveOffice] = useState("Kenya (HQ)")
  const form = useForm({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      services: [],
      inquiryType: "",
      message: "",
    },
    mode: "onSubmit",
  })

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([0, 0], 2)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)
    }

    const markers = offices.map(office => {
      const marker = L.marker(office.coordinates)
        .addTo(mapRef.current)
        .bindPopup(`<b>${office.country}</b><br>${office.address}`)
      
      if (office.country === activeOffice) {
        marker.openPopup()
        mapRef.current.setView(office.coordinates, 5)
      }
      
      return marker
    })

    return () => {
      markers.forEach(marker => marker.remove())
    }
  }, [activeOffice])

  async function onSubmit(values) {
  setIsSubmitting(true)
  try {
    console.log("Submitting form with values:", values)
    
    // Use the backend API endpoint with fallback
    const apiEndpoint = import.meta.env.VITE_API_URL 
      ? `${import.meta.env.VITE_API_URL}/contacts/public`
      : 'https://globeflight.co.ke/admin/api/contacts/public'
    
    console.log("Using API endpoint:", apiEndpoint)
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", response.headers)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API error response text:", errorText)
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        errorData = { message: `HTTP ${response.status}: ${errorText}` }
      }
      throw new Error(errorData.message || `Failed to send message. Status: ${response.status}`)
    }

    const data = await response.json()
    console.log("API response:", data)

    console.log("Showing success toast")
    toast({
      title: "Message Sent Successfully!",
      description: data.message || "Thank you for contacting Globeflight Worldwide Express. We'll get back to you shortly.",
      duration: 5000,
    })
    form.reset()
  } catch (error) {
    console.error("Error submitting form:", error)
    console.log("Showing error toast")
    toast({
      title: "Error",
      description: error.message || "There was a problem sending your message. Please try again or contact us directly.",
      variant: "destructive",
      duration: 5000,
    })
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-4xl font-bold text-center text-green-600 md:text-5xl">Contact Globeflight</h1>
          <p className="mb-12 text-xl text-center text-gray-600">Let us know how we can assist with your logistics needs</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card className="transition-shadow duration-300 shadow-lg lg:col-span-2 hover:shadow-xl">
            <CardHeader className="text-white bg-green-600 rounded-t-lg">
              <CardTitle className="text-2xl font-bold">Get in Touch</CardTitle>
              <CardDescription className="text-green-100">Fill out the form below and we'll respond promptly</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+254 700 000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Inquiry Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {inquiryTypes.map((type) => (
                              <FormItem className="flex items-center space-x-3 space-y-0" key={type.id}>
                                <FormControl>
                                  <RadioGroupItem value={type.id} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {React.createElement(type.icon, { className: "mr-2 h-4 w-4 inline" })}
                                  {type.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Controller
                    name="services"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Services of Interest (Optional)</FormLabel>
                        <FormDescription>
                          Select the services you'd like to know more about
                        </FormDescription>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                          {services.map((service) => (
                            <FormItem
                              key={service.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(service.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...(field.value || []), service.id]
                                      : field.value?.filter((value) => value !== service.id) || [];
                                    field.onChange(updatedValue);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="flex items-center font-normal cursor-pointer">
                                {React.createElement(service.icon, { className: "mr-2 h-4 w-4" })}
                                {service.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about your inquiry or feedback"
                            className="resize-none"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="transition-shadow duration-300 shadow-lg hover:shadow-xl">
              <CardHeader className="text-white bg-green-600 rounded-t-lg">
                <CardTitle className="text-xl font-bold">Our Global Offices</CardTitle>
                <CardDescription className="text-green-100">Serving you worldwide</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="Kenya (HQ)" onValueChange={(value) => setActiveOffice(value)}>
                  <TabsList className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
                    {offices.map((office) => (
                      <TabsTrigger key={office.country} value={office.country} className="text-sm">
                        {office.country}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {offices.map((office) => (
                    <TabsContent key={office.country} value={office.country} className="mt-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="mb-2 font-bold">{office.country}</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text- green-600" />
                              <span>{office.address}</span>
                            </li>
                            <li className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-green-600" />
                              <a href={`tel:${office.phone}`} className="text-green-600 hover:underline">{office.phone}</a>
                            </li>
                            <li className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-green-600" />
                              <a href={`mailto:${office.email}`} className="text-green-600 hover:underline">{office.email}</a>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="transition-shadow duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Globe className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">Global Network</CardTitle>
                      <CardDescription>Serving countries worldwide</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div id="map" className="h-64 mb-4 rounded-lg shadow-md"></div>
                  <div className="flex space-x-4">
                    <a href="/home" className="text-sm font-medium text-green-600 hover:underline">
                      Our Network
                    </a>
                    <a href="/track" className="text-sm font-medium text-green-600 hover:underline">
                      Track Shipment
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

