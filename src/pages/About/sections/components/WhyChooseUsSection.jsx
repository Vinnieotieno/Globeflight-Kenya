import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Laptop, Users, Wallet, Star, CheckCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const WhyChooseUsSection = ({ setSelectedImage }) => {
  const whyChooseUs = [
    { 
      icon: Building2, 
      title: "Extensive Global Network", 
      description: "Members of KGCHA with networks in over 160 countries globally. Our extensive network in East Africa enables us to reach key markets and connect businesses efficiently.",
      color: "green",
      features: ["160+ Countries", "24/7 Support", "Real-time Tracking"]
    },
    { 
      icon: Laptop, 
      title: "Strong Relationships", 
      description: "With over 25 years of experience, we've developed strong relationships and gained in-depth knowledge of the East African market.",
      color: "emerald",
      features: ["25+ Years", "Market Expertise", "Local Knowledge"]
    },
    { 
      icon: Users, 
      title: "Authorized Economic Operator", 
      description: "Our sister company, UNION GREEN LOGISTICS LTD, handles all customs brokerage with open communication throughout your journey.",
      color: "green",
      features: ["Customs Brokerage", "Open Communication", "Full Compliance"]
    },
    { 
      icon: Wallet, 
      title: "End To End Support", 
      description: "From planning to warehousing, our comprehensive services cover every aspect of the distribution process.",
      color: "emerald",
      features: ["Complete Solution", "Warehousing", "Distribution"]
    }
  ]

  const whyChooseUsImages = [
    '/3.jpg', // Extensive Global Network
    '/1.jpg', // Strong Relationships
    '/2.jpg', // Authorized Economic Operator
    '/profile2.jpg', // End To End Support
  ]

  return (
    <div className="space-y-20">
      <Helmet>
        <title>Why Choose Globeflight Kenya | Premium Logistics & Freight Partner</title>
        <meta name="description" content="Discover why Globeflight Kenya is the trusted logistics partner for businesses across East Africa and beyond. Explore our global network, expertise, and premium logistics solutions." />
        <meta property="og:title" content="Why Choose Globeflight Kenya | Premium Logistics & Freight Partner" />
        <meta property="og:description" content="Discover why Globeflight Kenya is the trusted logistics partner for businesses across East Africa and beyond. Explore our global network, expertise, and premium logistics solutions." />
        <meta property="og:image" content="/globe.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://globeflight.co.ke/about#why-choose-us" />
        <link rel="canonical" href="https://globeflight.co.ke/about#why-choose-us" />
      </Helmet>
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center px-4 py-2 space-x-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-200/20 mb-6"
        >
          <Star className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-gray-700 tracking-wide uppercase">Our Advantages</span>
        </motion.div>
        <h2 className="text-4xl font-bold md:text-6xl lg:text-7xl mb-6 flex items-center justify-center gap-3">
          <span className="text-gray-900">Why Choose </span>
          <span className="text-transparent bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text">Globeflight</span>
        </h2>
        <div className="flex justify-center gap-4 mb-4">
          <Building2 className="w-8 h-8 text-green-600" />
          <Laptop className="w-8 h-8 text-emerald-600" />
          <Users className="w-8 h-8 text-green-600" />
          <Wallet className="w-8 h-8 text-emerald-600" />
        </div>
        <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
          Experience the difference with our comprehensive logistics solutions and unparalleled service quality.
        </p>
      </div>
      <div className="flex flex-col gap-12">
        {whyChooseUs.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} items-stretch bg-white/90 rounded-3xl shadow-xl border border-green-100 overflow-hidden`}
          >
            {/* Image Side */}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-0">
              <img
                src={whyChooseUsImages[idx]}
                alt={item.title}
                className="object-cover w-full h-64 md:h-80 rounded-none md:rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Text Content Side */}
            <div className="flex-1 flex flex-col justify-center p-8 gap-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 font-sans">{item.title}</h3>
              <p className="text-lg text-gray-700 mb-3 font-medium">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-4 py-1 text-xs font-semibold text-green-800 rounded-full bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 shadow-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <a
                href="/contact-us"
                className="inline-block w-max bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:from-green-600 hover:to-blue-700 transition-colors duration-300"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default WhyChooseUsSection 