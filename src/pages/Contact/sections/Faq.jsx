"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ThumbsUp,
  ThumbsDown,
  Search,
  Share2,
  Printer,
  MessageCircle,
  Copy,
  CheckCircle,
  Truck,
  Package,
  ShieldCheck,
  Warehouse,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  RefreshCw,
} from "lucide-react"
import { faqs } from "@/constants/contactpage"
import Head from "next/head"

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

  if (
    faq.question.includes("TRANSPORT") ||
    faq.question.includes("SHIP") ||
    faq.question.includes("TRACK") ||
    faq.question.includes("SHIPMENT")
  ) {
    category = "shipping"
  } else if (
    faq.question.includes("SERVICES") ||
    faq.question.includes("OFFER") ||
    faq.question.includes("WAREHOUSING")
  ) {
    category = "services"
  } else if (faq.question.includes("SAFETY") || faq.question.includes("SECURE") || faq.question.includes("SAFE")) {
    category = "safety"
  } else if (
    faq.question.includes("EAST AFRICA") ||
    faq.question.includes("LOGISTICS") ||
    faq.question.includes("DELIVERY")
  ) {
    category = "logistics"
  }

  return { ...faq, category }
})

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [helpfulFeedback, setHelpfulFeedback] = useState({})
  const [activeCategory, setActiveCategory] = useState("all")
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [expandedItems, setExpandedItems] = useState([])

  // Filter FAQs based on search term and category
  const filteredFaqs = categorizedFaqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = activeCategory === "all" || faq.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Handle feedback
  const handleFeedback = (idx, isHelpful) => {
    setHelpfulFeedback((prev) => ({
      ...prev,
      [idx]: isHelpful,
    }))
  }

  // Copy question and answer to clipboard
  const copyToClipboard = (idx, question, answer) => {
    const textToCopy = `Q: ${question}\nA: ${answer}`
    navigator.clipboard.writeText(textToCopy)
    setCopiedIndex(idx)

    setTimeout(() => {
      setCopiedIndex(null)
    }, 2000)
  }

  // Print FAQ
  const printFAQ = () => {
    window.print()
  }

  // Share FAQ
  const shareFAQ = () => {
    if (navigator.share) {
      navigator.share({
        title: "Globeflight Kenya FAQs",
        text: "Check out these helpful FAQs from Globeflight Kenya",
        url: window.location.href,
      })
    }
  }

  // Track expanded items for analytics
  const trackExpanded = (idx) => {
    if (expandedItems.includes(idx)) {
      setExpandedItems(expandedItems.filter((item) => item !== idx))
    } else {
      setExpandedItems([...expandedItems, idx])
    }
  }

  // Highlight search terms in text
  const highlightText = (text, term) => {
    if (!term.trim()) return text

    const regex = new RegExp(`(${term})`, "gi")
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  // Reset search and filters
  const resetFilters = () => {
    setSearchTerm("")
    setActiveCategory("all")
  }

  // SEO-related effect
  useEffect(() => {
    // Add structured data for FAQs
    const script = document.createElement("script")
    script.type = "application/ld+json"

    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }

    script.innerHTML = JSON.stringify(faqData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Frequently Asked Questions | Globeflight Kenya</title>
        <meta
          name="description"
          content="Find answers to common questions about Globeflight Kenya's logistics, shipping, and transportation services across East Africa."
        />
        <meta
          name="keywords"
          content="Globeflight Kenya, logistics FAQ, shipping questions, East Africa transportation, freight services, cargo tracking"
        />
      </Head>

      <section className="py-16 bg-gradient-to-b from-green-50 to-white" id="faq">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-green-600">Questions</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get quick answers to the most common questions about our logistics and shipping services across East
              Africa.
            </p>
          </motion.div>

          <div className="md:flex w-full items-start lg:space-x-10">
            {/* Sticky FAQ Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:sticky md:top-28 md:w-4/12 mb-8 md:mb-0 z-40"
            >
              <Card className="shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <h2 className="text-2xl font-semibold">Find Answers</h2>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Filter by Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category.id}
                          variant={activeCategory === category.id ? "default" : "outline"}
                          className={`cursor-pointer ${activeCategory === category.id ? "bg-green-600" : ""}`}
                          onClick={() => setActiveCategory(category.id)}
                        >
                          <span className="mr-1">{category.icon}</span>
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Showing {filteredFaqs.length} of {faqs.length} questions
                    </div>
                    {(searchTerm || activeCategory !== "all") && (
                      <Button variant="ghost" size="sm" onClick={resetFilters} className="text-green-600">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm" onClick={printFAQ}>
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm" onClick={shareFAQ}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg w-full">
                    <h3 className="font-medium text-green-700 mb-2">Still have questions?</h3>
                    <p className="text-sm text-gray-600 mb-3">Our team is ready to assist you with any inquiries.</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Contact Support
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>

            {/* FAQ Accordion Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-8/12 w-full z-10"
            >
              <Card className="shadow-lg bg-white">
                <CardHeader>
                  <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                    <TabsList className="grid grid-cols-5 mb-4">
                      {categories.map((category) => (
                        <TabsTrigger key={category.id} value={category.id}>
                          <span className="mr-2">{category.icon}</span>
                          <span className="hidden sm:inline">{category.name}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <TabsContent value={activeCategory}>
                      <Accordion type="single" collapsible className="w-full">
                        <AnimatePresence>
                          {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <AccordionItem
                                  value={`item-${idx}`}
                                  className="border border-gray-100 mb-4 rounded-lg shadow-sm"
                                >
                                  <AccordionTrigger
                                    className="text-lg font-semibold px-4 hover:bg-green-50 rounded-t-lg"
                                    onClick={() => trackExpanded(idx)}
                                  >
                                    {searchTerm ? highlightText(faq.question, searchTerm) : faq.question}
                                  </AccordionTrigger>
                                  <AccordionContent className="px-4 pb-4">
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                      {searchTerm ? highlightText(faq.answer, searchTerm) : faq.answer}
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 pt-4 border-t border-gray-100">
                                      <div className="text-sm text-gray-500 mb-3 sm:mb-0">Was this answer helpful?</div>
                                      <div className="flex items-center space-x-3">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => copyToClipboard(idx, faq.question, faq.answer)}
                                          className="text-gray-500"
                                        >
                                          {copiedIndex === idx ? (
                                            <>
                                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                              Copied
                                            </>
                                          ) : (
                                            <>
                                              <Copy className="h-4 w-4 mr-2" />
                                              Copy
                                            </>
                                          )}
                                        </Button>

                                        <div className="space-x-2">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleFeedback(idx, true)}
                                            className={
                                              helpfulFeedback[idx] === true ? "bg-green-100 text-green-700" : ""
                                            }
                                          >
                                            <ThumbsUp className="h-4 w-4 mr-2" />
                                            Yes
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleFeedback(idx, false)}
                                            className={helpfulFeedback[idx] === false ? "bg-red-100 text-red-700" : ""}
                                          >
                                            <ThumbsDown className="h-4 w-4 mr-2" />
                                            No
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </motion.div>
                            ))
                          ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                              <div className="text-gray-400 mb-4">
                                <Search className="h-12 w-12 mx-auto" />
                              </div>
                              <h3 className="text-xl font-medium mb-2">No results found</h3>
                              <p className="text-gray-500 mb-4">We couldn't find any FAQs matching your search.</p>
                              <Button onClick={resetFilters} variant="outline">
                                Clear filters
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Accordion>
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-white/20 p-2 rounded-full">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Call Us</h3>
                          <p className="text-sm opacity-90">+254 729 341 277</p>
                          <a href="tel:+254729341277" className="text-sm underline mt-1 inline-block">
                            Call now
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="bg-white/20 p-2 rounded-full">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Email Us</h3>
                          <p className="text-sm opacity-90">cs@globeflight.co.ke</p>
                          <a href="mailto:cs@globeflight.co.ke" className="text-sm underline mt-1 inline-block">
                            Send email
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="bg-white/20 p-2 rounded-full">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Visit Us</h3>
                          <p className="text-sm opacity-90">NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road</p>
                          <a
                            href="https://maps.google.com/?q=NEXTGEN+MALL+Mombasa+Road+Nairobi+Kenya"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm underline mt-1 inline-block"
                          >
                            Get directions
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ
