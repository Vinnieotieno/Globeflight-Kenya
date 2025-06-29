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
    q.includes("SHIPMENT")
  ) {
    category = "shipping"
  } else if (
    q.includes("SERVICES") ||
    q.includes("OFFER") ||
    q.includes("WAREHOUSING")
  ) {
    category = "services"
  } else if (q.includes("SAFETY") || q.includes("SECURE") || q.includes("SAFE")) {
    category = "safety"
  } else if (
    q.includes("EAST AFRICA") ||
    q.includes("LOGISTICS") ||
    q.includes("DELIVERY")
  ) {
    category = "logistics"
  }
  return { ...faq, category }
})

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [copiedIndex, setCopiedIndex] = useState(null)

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

  // SEO structured data
  useEffect(() => {
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
      <Helmet>
        <title>Frequently Asked Questions | Globeflight Kenya</title>
        <meta name="description" content="Find answers to common questions about Globeflight Kenya's logistics, shipping, and transportation services across East Africa." />
        <meta name="keywords" content="Globeflight Kenya, logistics FAQ, shipping questions, East Africa transportation, freight services, cargo tracking" />
      </Helmet>
      <section className="py-16 bg-white min-h-[80vh]" id="faq">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-left md:text-center border-b border-gray-200 pb-2">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Tabs and Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
              <TabsList className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-md rounded-xl shadow border border-green-100">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeCategory === cat.id ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow' : 'text-green-700 hover:bg-green-50'}`}
                  >
                    <span className="inline-flex items-center gap-2">{cat.icon}{cat.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="w-full md:w-80">
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="rounded-xl border border-green-200 bg-white/80 focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* FAQ Accordion - Simple Card Style */}
          <div className="mt-10 flex flex-col items-center">
            <div className="w-full max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={faq.question} className="border border-gray-200 rounded-lg bg-white shadow-sm">
                    <AccordionTrigger className="flex justify-between items-center w-full px-6 py-5 text-lg font-semibold text-gray-900 bg-white hover:bg-gray-50 transition-none rounded-lg shadow-none">
                      <span>{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-gray-700 text-base bg-white">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Faq
