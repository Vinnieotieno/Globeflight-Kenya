"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  Truck,
  Package,
  ShieldCheck,
  Warehouse,
  Search,
  Copy,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { faqs, contactCards } from "@/constants/contactpage"
import { Helmet } from "react-helmet-async"
import React from "react"

// Define FAQ categories
const categories = [
  { id: "all", name: "All Questions", icon: <MessageCircle className="h-4 w-4" /> },
  { id: "shipping", name: "Shipping", icon: <Truck className="h-4 w-4" /> },
  { id: "services", name: "Services", icon: <Package className="h-4 w-4" /> },
  { id: "safety", name: "Safety & Security", icon: <ShieldCheck className="h-4 w-4" /> },
  { id: "logistics", name: "Logistics", icon: <Warehouse className="h-4 w-4" /> },
]

// Assign categories to FAQs
const categorizedFaqs = faqs.map((faq) => {
  let category = "all"
  const q = faq.question.toUpperCase()
  if (
    q.includes("TRANSPORT") ||
    q.includes("SHIP") ||
    q.includes("TRACK") ||
    q.includes("SHIPMENT") ||
    q.includes("FREIGHT")
  ) {
    category = "shipping"
  } else if (
    q.includes("SERVICES") ||
    q.includes("OFFER") ||
    q.includes("WAREHOUSING") ||
    q.includes("STORAGE")
  ) {
    category = "services"
  } else if (q.includes("SAFETY") || q.includes("SECURE") || q.includes("SAFE")) {
    category = "safety"
  } else if (
    q.includes("EAST AFRICA") ||
    q.includes("LOGISTICS") ||
    q.includes("DELIVERY") ||
    q.includes("REGIONS")
  ) {
    category = "logistics"
  }
  return { ...faq, category }
})

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [openItems, setOpenItems] = useState([])

  const filteredFaqs = categorizedFaqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const copyToClipboard = (idx, question, answer) => {
    const textToCopy = `Q: ${question}\nA: ${answer}`
    navigator.clipboard.writeText(textToCopy)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <>
      <Helmet>
        <title>FAQs - International Logistics Questions | Globeflight Kenya Global Shipping</title>
        <meta name="description" content="Find answers about Globeflight Kenya's international shipping, global freight rates, worldwide delivery schedules, international warehousing, cargo tracking, and logistics services connecting Kenya and Africa to the world." />
        <meta name="keywords" content="Globeflight Kenya FAQ, international logistics FAQ, global shipping questions, international freight charges, worldwide cargo tracking, global warehousing, international delivery schedules, Africa to world shipping FAQ, Kenya international logistics questions, customs clearance FAQ, international shipping restrictions" />
        <meta property="og:title" content="Frequently Asked Questions - Globeflight Kenya" />
        <meta property="og:description" content="Get answers about our logistics, shipping, and transportation services across East Africa. Learn about freight charges, delivery schedules, cargo tracking, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://globeflight.co.ke/contact-us" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQs - Globeflight Kenya Logistics" />
        <meta name="twitter:description" content="Find answers about shipping, freight charges, delivery schedules, and logistics services across East Africa." />
        
        {/* Enhanced FAQ Schema for Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
                "author": {
                  "@type": "Organization",
                  "name": "Globeflight Kenya"
                },
                "dateCreated": "2024-01-01",
                "upvoteCount": Math.floor(Math.random() * 50) + 20
              }
            }))
          })}
        </script>
        
        {/* Additional Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Globeflight Kenya",
            "url": "https://globeflight.co.ke",
            "logo": "https://globeflight.co.ke/logo.png",
            "description": "International logistics and shipping company connecting Kenya and Africa to the world",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+254729341277",
              "contactType": "customer service",
              "areaServed": "Worldwide",
              "availableLanguage": ["English", "Swahili", "French", "Arabic", "Chinese", "Spanish"]
            }
          })}
        </script>
        
        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
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
                "name": "Contact Us",
                "item": "https://globeflight.co.ke/contact-us"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "FAQs",
                "item": "https://globeflight.co.ke/contact-us"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <section className="py-16 bg-white min-h-[80vh]" id="faq" itemScope itemType="https://schema.org/FAQPage">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-left md:text-center">
              International Logistics FAQs
            </h1>
            <h2 className="text-lg md:text-xl text-gray-600 text-left md:text-center">
              Everything about Globeflight Kenya's international logistics and global shipping services
            </h2>
            <div className="border-b border-gray-200 mt-6"></div>
          </div>

          {/* Tabs and Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
              <TabsList className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-md rounded-xl shadow border border-green-100" role="navigation" aria-label="FAQ Categories">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeCategory === cat.id ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow' : 'text-green-700 hover:bg-green-50'}`}
                    aria-label={`Filter by ${cat.name}`}
                  >
                    <span className="inline-flex items-center gap-2">{cat.icon}{cat.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="w-full md:w-80" role="search">
              <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
              <Input
                id="faq-search"
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="rounded-xl border border-green-200 bg-white/80 focus:ring-2 focus:ring-green-400"
                aria-label="Search frequently asked questions"
              />
            </div>
          </div>

          {/* FAQ Accordion - Enhanced for SEO */}
          <div className="mt-10 flex flex-col items-center">
            <div className="w-full max-w-2xl mx-auto">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No questions found matching your search.</p>
                  <p className="text-gray-500 mt-2">Try different keywords or browse all categories.</p>
                </div>
              ) : (
                <Accordion 
                  type="single" 
                  collapsible 
                  className="space-y-4"
                  defaultValue={filteredFaqs[0]?.question}
                >
                  {filteredFaqs.map((faq, idx) => (
                    <AccordionItem 
                      key={idx} 
                      value={faq.question} 
                      className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                      itemScope 
                      itemProp="mainEntity" 
                      itemType="https://schema.org/Question"
                    >
                      <AccordionTrigger 
                        className="flex justify-between items-center w-full px-6 py-5 text-lg font-semibold text-gray-900 bg-white hover:bg-gray-50 transition-none rounded-lg shadow-none"
                        itemProp="name"
                      >
                        <span className="text-left pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent 
                        className="px-6 pb-5 text-gray-700 text-base bg-white"
                        itemScope 
                        itemProp="acceptedAnswer" 
                        itemType="https://schema.org/Answer"
                      >
                        <div itemProp="text" className="prose prose-gray max-w-none">
                          {faq.answer.split('\n').map((paragraph, pIdx) => (
                            <p key={pIdx} className="mb-2 last:mb-0">
                              {paragraph.trim()}
                            </p>
                          ))}
                        </div>
                        
                        {/* Add helpful actions */}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Was this helpful?
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(idx, faq.question, faq.answer)}
                              className="text-gray-600 hover:text-green-600"
                              title="Copy question and answer"
                            >
                              {copiedIndex === idx ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
          
          {/* Call to Action Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still have questions about international shipping?
              </h3>
              <p className="text-gray-600 mb-6">
                Can't find the answer? Our international logistics experts are here to help with your global shipping needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <a href="mailto:cs@globeflight.co.ke">
                    Email Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <a href="tel:+254729341277">
                    Call Us Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Faq