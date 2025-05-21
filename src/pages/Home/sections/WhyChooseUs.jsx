"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import Container from "@/components/Container"
import FeaturedButton from "@/components/FeaturedButton"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Building2, Laptop, Users, Wallet } from "lucide-react"
import { whychooseus, whychooseusCards } from "@/constants/homepage"

// Map of icon names to actual icon components
const iconMap = {
  Building2: Building2,
  Laptop: Laptop,
  Users: Users,
  Wallet: Wallet,
}

const WhyChooseUs = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Helper function to render the correct icon
  const renderIcon = (iconName) => {
    // If the icon is a string (name of an icon), use the mapping
    if (typeof iconName === "string" && iconMap[iconName]) {
      const IconComponent = iconMap[iconName]
      return <IconComponent size={28} className="text-white" />
    }

    // If the icon is already a component, render it directly
    if (typeof iconName === "function") {
      const IconComponent = iconName
      return <IconComponent size={28} className="text-white" />
    }

    // Fallback
    return null
  }

  return (
    <section
      id="why-choose-us"
      className="relative bg-gradient-to-b from-white to-gray-50 py-20 md:py-28 overflow-hidden"
      aria-labelledby="why-choose-us-heading"
    >
      {/* SEO-friendly hidden heading */}
      <h2 id="why-choose-us-heading" className="sr-only">
        Why Choose Globeflight Kenya for Your Logistics Needs
      </h2>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-50 rounded-bl-full opacity-30" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-green-50 rounded-tr-full opacity-30" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col space-y-8"
          >
            <Badge className="w-fit bg-green-100 text-green-700 hover:bg-green-200 px-4 py-1 text-sm">
              {whychooseus.subTitle}
            </Badge>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {whychooseus.title}
            </h3>

            <div className="w-20 h-1.5 bg-green-600 rounded-full" />

            <p className="text-lg text-gray-700 leading-relaxed">{whychooseus.desc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {["25+ Years Experience", "Global Network", "24/7 Support", "Custom Solutions"].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/contact-us" className="inline-block mt-4 w-fit group">
              <FeaturedButton className="flex items-center space-x-2 group-hover:space-x-3 transition-all">
                <span>Get Free Quote</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </FeaturedButton>
            </Link>
          </motion.div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid gap-6"
          >
            {whychooseusCards.map((card, idx) => (
              <motion.div key={idx} variants={itemVariants} custom={idx}>
                <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-green-500">
                  <CardHeader className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 h-14 w-14 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center shadow-md">
                        {/* Use a simpler approach with hardcoded icons */}
                        {idx === 0 && <Building2 size={28} className="text-white" />}
                        {idx === 1 && <Laptop size={28} className="text-white" />}
                        {idx === 2 && <Users size={28} className="text-white" />}
                        {idx === 3 && <Wallet size={28} className="text-white" />}
                      </div>
                      <div className="flex-grow">
                        <CardTitle className="text-xl font-semibold mb-2 text-gray-800">{card.title}</CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed">{card.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default WhyChooseUs
