import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

const ImageShowcaseSection = ({ setSelectedImage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mb-32"
    >
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center px-4 py-2 space-x-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/20 mb-6"
        >
          <Globe className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-gray-700 tracking-wide uppercase">Our Global Operations</span>
        </motion.div>
        <h3 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="text-gray-900">Worldwide </span>
          <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
            Logistics Excellence
          </span>
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From air freight to sea cargo, warehousing to customs clearance - we handle every aspect of your logistics needs with precision and care.
        </p>
      </div>

      {/* Main Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Air Freight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
          onClick={() => setSelectedImage({
            src: '/Air.jpg',
            alt: 'Globeflight air freight services - Fast international air cargo and express shipping solutions',
            title: 'Air Freight Services',
            description: 'Express worldwide air cargo services with real-time tracking and fast delivery'
          })}
        >
          <img 
            src="/Air.jpg" 
            alt="Globeflight air freight services - Fast international air cargo and express shipping solutions" 
            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            <h4 className="text-2xl font-bold mb-2">Air Freight</h4>
            <p className="text-white/90 text-sm">Express worldwide air cargo services with real-time tracking</p>
          </div>
          <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>

        {/* Sea Freight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
          onClick={() => setSelectedImage({
            src: '/Sea.jpg',
            alt: 'Globeflight sea freight services - International maritime shipping and ocean cargo solutions',
            title: 'Sea Freight Services',
            description: 'Cost-effective ocean shipping for large cargo volumes with global reach'
          })}
        >
          <img 
            src="/Sea.jpg" 
            alt="Globeflight sea freight services - International maritime shipping and ocean cargo solutions" 
            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            <h4 className="text-2xl font-bold mb-2">Sea Freight</h4>
            <p className="text-white/90 text-sm">Cost-effective ocean shipping for large cargo volumes</p>
          </div>
          <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>

        {/* Warehousing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
          onClick={() => setSelectedImage({
            src: '/Warehouse.jpg',
            alt: 'Globeflight warehouse management - Secure storage and inventory management solutions',
            title: 'Warehouse Management',
            description: 'Secure storage facilities with advanced inventory management and tracking'
          })}
        >
          <img 
            src="/Warehouse.jpg" 
            alt="Globeflight warehouse management - Secure storage and inventory management solutions" 
            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            <h4 className="text-2xl font-bold mb-2">Warehousing</h4>
            <p className="text-white/90 text-sm">Secure storage facilities with advanced inventory management</p>
          </div>
          <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>

        {/* Customs Clearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
          onClick={() => setSelectedImage({
            src: '/Customs.jpg',
            alt: 'Globeflight customs clearance - Professional customs brokerage and compliance services',
            title: 'Customs Clearance',
            description: 'Expert customs brokerage ensuring smooth clearance and compliance'
          })}
        >
          <img 
            src="/Customs.jpg" 
            alt="Globeflight customs clearance - Professional customs brokerage and compliance services" 
            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            <h4 className="text-2xl font-bold mb-2">Customs Clearance</h4>
            <p className="text-white/90 text-sm">Expert customs brokerage ensuring smooth clearance</p>
          </div>
          <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>

        {/* International Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
          onClick={() => setSelectedImage({
            src: '/International.jpg',
            alt: 'Globeflight international shipping - Global logistics network spanning 160+ countries',
            title: 'International Shipping',
            description: 'Global network connecting 160+ countries with comprehensive logistics solutions'
          })}
        >
          <img 
            src="/International.jpg" 
            alt="Globeflight international shipping - Global logistics network spanning 160+ countries" 
            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            <h4 className="text-2xl font-bold mb-2">International Shipping</h4>
            <p className="text-white/90 text-sm">Global network connecting 160+ countries worldwide</p>
          </div>
          <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>

        {/* Transport Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
          onClick={() => setSelectedImage({
            src: '/Transport.jpg',
            alt: 'Globeflight transport solutions - Comprehensive land transportation and delivery services',
            title: 'Transport Solutions',
            description: 'Comprehensive land transportation and delivery services across East Africa'
          })}
        >
          <img 
            src="/Transport.jpg" 
            alt="Globeflight transport solutions - Comprehensive land transportation and delivery services" 
            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            <h4 className="text-2xl font-bold mb-2">Transport Solutions</h4>
            <p className="text-white/90 text-sm">Comprehensive land transportation and delivery services</p>
          </div>
          <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ship with Confidence?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Globeflight for their logistics needs. Get a free quote today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact-us"
              className="inline-flex items-center justify-center bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl transition-colors duration-300"
            >
              Get Free Quote
            </a>
            <a 
              href="/track"
              className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-3 rounded-xl transition-colors duration-300"
            >
              Track Package
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ImageShowcaseSection 