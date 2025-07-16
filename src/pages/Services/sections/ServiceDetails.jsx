'use client'

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
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

const API_URL = "https://globeflight.co.ke/admin/api/services/public";

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
        let res = await fetch(`https://globeflight.co.ke/admin/api/services/public/${slug}`);
        let data = await res.json();
        if (data.success && data.data) {
          setService(data.data);
          // Fetch all services for related
          const allRes = await fetch('https://globeflight.co.ke/admin/api/services/public?limit=100');
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

  // Helper to create slug from title
  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  // Generate structured data for the service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Globeflight Kenya",
      "url": "https://globeflight.co.ke",
      "logo": "https://globeflight.co.ke/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254729341277",
        "contactType": "customer service",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Swahili", "French", "Arabic"]
      }
    },
    "areaServed": [
      {
        "@type": "Place", 
        "name": "Worldwide"
      },
      {
        "@type": "Continent",
        "name": "Africa"
      },
      {
        "@type": "Country",
        "name": "Kenya"
      },
      {
        "@type": "Country",
        "name": "Tanzania"
      },
      {
        "@type": "Country",
        "name": "Uganda"
      },
      {
        "@type": "Country",
        "name": "Rwanda"
      },
      {
        "@type": "Country",
        "name": "Ethiopia"
      },
      {
        "@type": "Continent",
        "name": "Europe"
      },
      {
        "@type": "Continent",
        "name": "Asia"
      },
      {
        "@type": "Continent",
        "name": "North America"
      }
    ],
    "serviceType": ["International Logistics", "Global Shipping", "Freight Forwarding"],
    "image": service.imageUrl,
    "url": `https://globeflight.co.ke/services/${slug}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://globeflight.co.ke"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://globeflight.co.ke/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://globeflight.co.ke/services/${slug}`
      }
    ]
  };

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <Helmet>
        <title>{service.title} | International Logistics Services - Globeflight Kenya</title>
        <meta name="description" content={`${service.description || service.shortDescription}. Professional international ${service.title} services from Kenya to worldwide destinations. Global logistics solutions by Globeflight Kenya.`} />
        <meta name="keywords" content={`${service.title}, ${service.title} Kenya, international ${service.title}, global ${service.title} services, ${service.title} Africa, ${service.title} worldwide, Globeflight ${service.title}, Kenya to world ${service.title}, Africa logistics, international shipping ${service.title}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${service.title} - Globeflight Kenya`} />
        <meta property="og:description" content={service.description || service.shortDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://globeflight.co.ke/services/${slug}`} />
        <meta property="og:image" content={service.imageUrl} />
        <meta property="article:publisher" content="https://www.facebook.com/globeflightkenya" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${service.title} - Globeflight Kenya`} />
        <meta name="twitter:description" content={service.shortDescription || service.description} />
        <meta name="twitter:image" content={service.imageUrl} />
        <meta name="twitter:site" content="@globeflight_ke" />
        
        <link rel="canonical" href={`https://globeflight.co.ke/services/${slug}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Hero />
        
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div 
            className="h-full bg-green-500 transition-all duration-300 ease-out"
            style={{ width: `${readingProgress}%` }}
            role="progressbar"
            aria-valuenow={readingProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/" className="text-gray-600 hover:text-green-600">Home</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><Link to="/services" className="text-gray-600 hover:text-green-600">Services</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-green-600 font-semibold" aria-current="page">{service.title}</li>
          </ol>
        </nav>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sticky Table of Contents */}
            <aside className="lg:w-1/4" role="navigation" aria-label="Table of contents">
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
                        aria-current={activeSection === item.id ? 'location' : undefined}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:w-3/4">
              <article itemScope itemType="https://schema.org/Service">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <header>
                    <h1 className="text-4xl font-bold text-gray-800 mb-6" itemProp="name">
                      {service.title} - International Logistics Services
                    </h1>
                  </header>
                  
                  <section id="overview" className="mb-12">
                    {service.imageUrl && (
                      <img 
                        src={service.imageUrl.startsWith('/uploads/')
                          ? `http://globeflight.co.ke${service.imageUrl}`
                          : service.imageUrl}
                        alt={`${service.title} services by Globeflight Kenya`}
                        className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
                        itemProp="image"
                      />
                    )}
                    <div itemProp="description">
                      <p className="text-lg text-gray-700 leading-relaxed mb-2">
                        {service.shortDescription}
                      </p>
                      <p className="text-base text-gray-600">
                        {service.description}
                      </p>
                    </div>
                    {service.keyBenefits && service.keyBenefits.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-3">Key Benefits of Our {service.title} Service:</h3>
                        <ul className="list-disc ml-6 space-y-2">
                          {service.keyBenefits.map((b, i) => (
                            <li key={i} className="text-gray-700">{b}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>

                  <section id="details" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us for {service.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card itemScope itemType="https://schema.org/ContactPoint">
                        <CardContent className="flex items-center p-4">
                          <MapPin className="h-6 w-6 text-green-500 mr-4" />
                          <div>
                            <h3 className="font-semibold">Location</h3>
                            <p itemProp="address">NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="flex items-center p-4">
                          <Clock className="h-6 w-6 text-green-500 mr-4" />
                          <div>
                            <h3 className="font-semibold">Processing Time</h3>
                            <p>30min - 1hour for {service.title}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card itemScope itemType="https://schema.org/ContactPoint">
                        <CardContent className="flex items-center p-4">
                          <Phone className="h-6 w-6 text-green-500 mr-4" />
                          <div>
                            <h3 className="font-semibold">Call Us</h3>
                            <p itemProp="telephone">+254729341277</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card itemScope itemType="https://schema.org/ContactPoint">
                        <CardContent className="flex items-center p-4">
                          <Mail className="h-6 w-6 text-green-500 mr-4" />
                          <div>
                            <h3 className="font-semibold">Email</h3>
                            <p itemProp="email">saleskenya@globeflight.co.ke</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  <section id="gallery" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{service.title} Photo Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {galleryImages.length > 0 ? (
                        galleryImages.map((imgUrl, i) => (
                          <img
                            key={i}
                            src={imgUrl.startsWith('/uploads/')
                              ? `http://globeflight.co.ke${imgUrl}`
                              : imgUrl}
                            alt={`${service.title} service image ${i + 1} - Globeflight Kenya`}
                            className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            loading="lazy"
                          />
                        ))
                      ) : (
                        <div className="col-span-3 text-gray-400 text-center">No gallery images available.</div>
                      )}
                    </div>
                  </section>

                  <section id="faq" className="mb-12" itemScope itemType="https://schema.org/FAQPage">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Frequently Asked Questions about {service.title}
                    </h2>
                    {faqs.length > 0 ? (
                      <Accordion type="single" collapsible>
                        {faqs.map((faq, idx) => (
                          <AccordionItem 
                            value={`item-${idx}`} 
                            key={idx}
                            itemScope 
                            itemProp="mainEntity" 
                            itemType="https://schema.org/Question"
                          >
                            <AccordionTrigger itemProp="name">{faq.question}</AccordionTrigger>
                            <AccordionContent 
                              itemScope 
                              itemProp="acceptedAnswer" 
                              itemType="https://schema.org/Answer"
                            >
                              <span itemProp="text">{faq.answer}</span>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="text-gray-400">No FAQs available for this service.</div>
                    )}
                  </section>

                  <section id="related" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Related {service.title} Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedServices.length > 0 ? relatedServices.map((related) => (
                        <Card key={related.id} className="hover:shadow-lg transition-shadow duration-200">
                          <CardHeader>
                            {related.imageUrl && (
                              <img
                                src={related.imageUrl.startsWith('/uploads/')
                                  ? `http://globeflight.co.ke${related.imageUrl}`
                                  : related.imageUrl}
                                alt={`${related.title} - Related service to ${service.title}`}
                                className="w-full h-32 object-cover rounded-t-lg"
                                loading="lazy"
                              />
                            )}
                          </CardHeader>
                          <CardContent>
                            <CardTitle className="mb-2">{related.title}</CardTitle>
                            <p className="text-sm text-gray-600">{related.shortDescription || related.description?.slice(0, 100)}...</p>
                            <Link 
                              to={`/services/${related.slug || slugify(related.title)}`} 
                              className="mt-4 inline-block"
                              aria-label={`Learn more about ${related.title}`}
                            >
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
                      <Button 
                        onClick={() => setIsBookingModalOpen(true)} 
                        className="bg-green-500 hover:bg-green-600"
                        aria-label={`Book ${service.title} service now`}
                      >
                        <Calendar className="mr-2 h-4 w-4" /> Book {service.title} Now
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsSharingModalOpen(true)}
                        aria-label={`Share ${service.title} service`}
                      >
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </div>
                    <nav className="flex space-x-4" aria-label="Service navigation">
                      {previousService && (
                        <Link to={`/services/${previousService.slug || slugify(previousService.title)}`}>
                          <Button variant="outline">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                          </Button>
                        </Link>
                      )}
                      {nextService && (
                        <Link to={`/services/${nextService.slug || slugify(nextService.title)}`}>
                          <Button variant="outline">
                            Next <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </nav>
                  </div>
                </motion.div>
              </article>
            </main>
          </div>
        </div>

        <CallToActionSection />
        <ScrollOnSideSection />

        {/* Booking Modal */}
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogContent className="sm:max-w-[425px] mt-16">
            <DialogHeader>
              <DialogTitle>Book {service.title} Service</DialogTitle>
              <DialogDescription>
                Fill out the form below to inquire about our {service.title} services.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <Input placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Input type="tel" placeholder="Your Phone" required />
              <Textarea placeholder="Tell us about your requirements" required />
              <DialogFooter>
                <Button type="submit">Submit Inquiry</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Sharing Modal */}
        <Dialog open={isSharingModalOpen} onOpenChange={setIsSharingModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share {service.title} Service</DialogTitle>
              <DialogDescription>
                Share our {service.title} service with others who might need it.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              >
                <Facebook className="mr-2 h-4 w-4" /> Facebook
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out ${service.title} services by Globeflight Kenya`)}`, '_blank')}
              >
                <Twitter className="mr-2 h-4 w-4" /> Twitter
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              >
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}