'use client'

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import CallToActionSection from "@/components/CallToActionSection"
import ScrollOnSideSection from "@/components/ScrollOnSideSection"
import Hero from "@/pages/Services/sections/Hero"
import { ChevronLeft, ChevronRight, Calendar, Share2, Facebook, Twitter, Linkedin, MapPin, Clock, Phone, Mail } from 'lucide-react'

const API_URL = "http://localhost:5000/api/services/public";

export default function ServiceDetail() {
  const { slug } = useParams(); // <-- use slug, not id
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeSection, setActiveSection] = useState('')
  const [readingProgress, setReadingProgress] = useState(0)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false)
  const [allServices, setAllServices] = useState([])

  useEffect(() => {
    async function fetchService() {
      setLoading(true)
      setError("")
      try {
        // Fetch by slug (or id fallback)
        let res = await fetch(`http://localhost:5000/api/services/public/${slug}`);
        let data = await res.json();
        if (data.success && data.data) {
          setService(data.data);
          // Fetch all services for related
          const allRes = await fetch('http://localhost:5000/api/services/public?limit=100');
          const allData = await allRes.json();
          setAllServices(allData.success ? allData.data.services : []);
        } else {
          setError("Service not found");
        }
      } catch (err) {
        setError("Failed to fetch service");
      }
      setLoading(false);
    }
    fetchService();
  }, [slug])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(progress)

      const sections = document.querySelectorAll('section')
      let currentActiveSection = ''
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight - 50) {
          currentActiveSection = section.id
        }
      })
      setActiveSection(currentActiveSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) return <div className="py-20 text-center">Loading...</div>
  if (error) return <div className="py-20 text-center text-red-500">{error}</div>
  if (!service) return null

  // Find previous and next services
  const currentIndex = allServices.findIndex(s => String(s.id) === String(slug))
  const previousService = currentIndex > 0 ? allServices[currentIndex - 1] : null
  const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : null
  // Related: up to 3 others, not current, not prev/next
  const relatedServices = allServices
    .filter(s => String(s.id) !== String(slug) && s.id !== previousService?.id && s.id !== nextService?.id)
    .slice(0, 3)

  // Gallery images
  const galleryImages = Array.isArray(service.galleryUrls) && service.galleryUrls.length > 0
    ? service.galleryUrls
    : service.imageUrl ? [service.imageUrl] : []

  // FAQ
  const faqs = Array.isArray(service.faq) && service.faq.length > 0
    ? service.faq
    : []

  // Table of Contents
  const tableOfContents = [
    { id: 'overview', title: 'Overview' },
    { id: 'details', title: 'Service Details' },
    { id: 'gallery', title: 'Photo Gallery' },
    { id: 'faq', title: 'FAQ' },
    { id: 'related', title: 'Related Services' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Hero />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-green-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky Table of Contents */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Contents</h2>
              <ul className="space-y-2">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`block py-2 px-4 rounded transition-colors ${
                        activeSection === item.id
                          ? 'bg-green-500 text-white'
                          : 'hover:bg-green-100'
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-gray-800 mb-6">{service.title}</h1>
              
              <section id="overview" className="mb-12">
                {service.imageUrl && (
                  <img 
                    src={service.imageUrl.startsWith('/uploads/')
                      ? `http://localhost:5000${service.imageUrl}`
                      : service.imageUrl}
                    alt={service.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
                  />
                )}
                <p className="text-lg text-gray-700 leading-relaxed mb-2">{service.shortDescription}</p>
                <p className="text-base text-gray-600">{service.description}</p>
                {service.keyBenefits && service.keyBenefits.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Key Benefits:</h3>
                    <ul className="list-disc ml-6">
                      {service.keyBenefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              <section id="details" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Details Contact Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="flex items-center p-4">
                      <MapPin className="h-6 w-6 text-green-500 mr-4" />
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p>NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex items-center p-4">
                      <Clock className="h-6 w-6 text-green-500 mr-4" />
                      <div>
                        <h3 className="font-semibold">Processing Time</h3>
                        <p>30min - 1hour</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex items-center p-4">
                      <Phone className="h-6 w-6 text-green-500 mr-4" />
                      <div>
                        <h3 className="font-semibold">Reach us at</h3>
                        <p>+254729341277</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex items-center p-4">
                      <Mail className="h-6 w-6 text-green-500 mr-4" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p>saleskenya@globeflight.co.ke</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section id="gallery" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {galleryImages.length > 0 ? (
                    galleryImages.map((imgUrl, i) => (
                      <img
                        key={i}
                        src={imgUrl.startsWith('/uploads/')
                          ? `http://localhost:5000${imgUrl}`
                          : imgUrl}
                        alt={`${service.title} Image ${i + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      />
                    ))
                  ) : (
                    <div className="col-span-3 text-gray-400 text-center">No gallery images available.</div>
                  )}
                </div>
              </section>

              <section id="faq" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                {faqs.length > 0 ? (
                  <Accordion type="single" collapsible>
                    {faqs.map((faq, idx) => (
                      <AccordionItem value={`item-${idx}`} key={idx}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-gray-400">No FAQs available for this service.</div>
                )}
              </section>

              <section id="related" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedServices.length > 0 ? relatedServices.map((related) => (
                    <Card key={related.id} className="hover:shadow-lg transition-shadow duration-200">
                      <CardHeader>
                        {related.imageUrl && (
                          <img
                            src={related.imageUrl.startsWith('/uploads/')
                              ? `http://localhost:5000${related.imageUrl}`
                              : related.imageUrl}
                            alt={related.title}
                            className="w-full h-32 object-cover rounded-t-lg"
                          />
                        )}
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="mb-2">{related.title}</CardTitle>
                        <p className="text-sm text-gray-600">{related.shortDescription || related.description?.slice(0, 100)}...</p>
                        <Link to={`/services/${related.id}`} className="mt-4 inline-block">
                          <Button variant="outline">Learn More</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )) : (
                    <div className="col-span-3 text-gray-400 text-center">No related services found.</div>
                  )}
                </div>
              </section>

              {/* Navigation and Action Buttons */}
              <div className="flex justify-between items-center mt-12">
                <div className="flex space-x-4">
                  <Button onClick={() => setIsBookingModalOpen(true)} className="bg-green-500 hover:bg-green-600">
                    <Calendar className="mr-2 h-4 w-4" /> Book Now
                  </Button>
                  <Button variant="outline" onClick={() => setIsSharingModalOpen(true)}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
                <div className="flex space-x-4">
                  {previousService && (
                    <Link to={`/services/${previousService.id}`}>
                      <Button variant="outline">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                      </Button>
                    </Link>
                  )}
                  {nextService && (
                    <Link to={`/services/${nextService.id}`}>
                      <Button variant="outline">
                        Next <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <CallToActionSection />
      <ScrollOnSideSection />

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[425px] mt-16">
          <DialogHeader>
            <DialogTitle>Book {service.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below for inquiry about {service.title}.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <Input placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
            <Input type="tel" placeholder="Your Phone" />
            <Textarea placeholder="Additional Information" />
            <DialogFooter>
              <Button type="submit">Submit Booking</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sharing Modal */}
      <Dialog open={isSharingModalOpen} onOpenChange={setIsSharingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share this Service</DialogTitle>
            <DialogDescription>
              Choose a platform to share {service.title}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center space-x-4">
            <Button variant="outline">
              <Facebook className="mr-2 h-4 w-4" /> Facebook
            </Button>
            <Button variant="outline">
              <Twitter className="mr-2 h-4 w-4" /> Twitter
            </Button>
            <Button variant="outline">
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}