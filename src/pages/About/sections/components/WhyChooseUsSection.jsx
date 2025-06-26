import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Laptop, Users, Wallet, Star, CheckCircle } from 'lucide-react'

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

  return (
    <div className="space-y-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
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
        
        <h2 className="text-4xl font-bold md:text-6xl lg:text-7xl mb-6">
          <span className="text-gray-900">Why Choose </span>
          <span className="text-transparent bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text">
            Globeflight
          </span>
        </h2>
        
        <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
          Experience the difference with our comprehensive logistics solutions and unparalleled service quality.
        </p>
      </motion.div>

      <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Features List */}
        <div className="space-y-6">
          {whyChooseUs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex gap-6 p-6 transition-all duration-300 group rounded-2xl hover:bg-white hover:shadow-xl border border-gray-100"
            >
              <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-${item.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                <item.icon className={`w-8 h-8 text-${item.color}-600`} />
              </div>
              <div className="flex-1">
                <h4 className="mb-3 text-2xl font-bold text-gray-900">{item.title}</h4>
                <p className="text-lg leading-relaxed text-gray-600 mb-4">{item.description}</p>
                
                {/* Feature tags */}
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium text-gray-700 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden shadow-2xl rounded-2xl h-64 cursor-pointer group"
              onClick={() => setSelectedImage({
                src: '/3.jpg',
                alt: 'Globeflight logistics operations and cargo handling - Professional logistics services in Kenya',
                title: 'Logistics Operations',
                description: 'Professional cargo handling and logistics operations in Kenya'
              })}
            >
              <img 
                src="/3.jpg" 
                alt="Globeflight logistics operations and cargo handling - Professional logistics services in Kenya" 
                className="object-cover w-full h-full transition-all duration-500 hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 to-transparent hover:opacity-100" />
              <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative mt-8 overflow-hidden shadow-2xl rounded-2xl h-64 cursor-pointer group"
              onClick={() => setSelectedImage({
                src: '/1.jpg',
                alt: 'Globeflight global shipping and international logistics services - Leading logistics company in East Africa',
                title: 'Global Shipping',
                description: 'International logistics services connecting East Africa to the world'
              })}
            >
              <img 
                src="/1.jpg" 
                alt="Globeflight global shipping and international logistics services - Leading logistics company in East Africa" 
                className="object-cover w-full h-full transition-all duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 to-transparent hover:opacity-100" />
              <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden shadow-2xl rounded-2xl h-64 cursor-pointer group"
              onClick={() => setSelectedImage({
                src: '/2.jpg',
                alt: 'Globeflight warehouse management and storage solutions - Secure warehousing facilities in Kenya',
                title: 'Warehouse Management',
                description: 'Secure storage facilities and inventory management solutions'
              })}
            >
              <img 
                src="/2.jpg" 
                alt="Globeflight warehouse management and storage solutions - Secure warehousing facilities in Kenya" 
                className="object-cover w-full h-full transition-all duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 to-transparent hover:opacity-100" />
              <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center justify-center mt-8 overflow-hidden shadow-2xl rounded-2xl h-64 bg-gradient-to-br from-green-500 to-emerald-600"
            >
              <div className="p-6 text-center">
                <h4 className="mb-2 text-2xl font-bold text-white">Your Trusted</h4>
                <p className="text-xl font-semibold text-white/90 mb-4">Logistics Partner</p>
                <div className="mb-4 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span className="text-sm text-white/90">25+ Years Experience</span>
                </div>
                <div className="flex flex-col gap-2">
                  <a 
                    href="/contact-us"
                    className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-green-600 font-medium px-4 py-2 rounded-lg transition-colors duration-300 text-sm"
                  >
                    Get Quote
                  </a>
                  <a 
                    href="/track"
                    className="inline-flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-green-600 font-medium px-4 py-2 rounded-lg transition-colors duration-300 text-sm"
                  >
                    Track Package
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Decorative Elements */}
          <div className="absolute w-32 h-32 rounded-full -top-6 -right-6 bg-green-500/10 blur-3xl" />
          <div className="absolute w-40 h-40 rounded-full -bottom-6 -left-6 bg-emerald-500/10 blur-3xl" />
        </motion.div>
      </div>
    </div>
  )
}

export default WhyChooseUsSection 