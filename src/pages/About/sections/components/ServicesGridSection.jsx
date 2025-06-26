import React from 'react'
import { motion } from 'framer-motion'

const ServicesGridSection = ({ setSelectedImage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-32"
    >
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="text-gray-900">Comprehensive </span>
          <span className="text-transparent bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text">
            Logistics Solutions
          </span>
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From e-commerce fulfillment to consolidation services, we provide end-to-end logistics solutions tailored to your business needs.
        </p>
      </div>

      {/* Additional Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* E-commerce */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
          onClick={() => setSelectedImage({
            src: '/Ecommerce.jpg',
            alt: 'Globeflight e-commerce logistics - Online retail fulfillment and order processing services',
            title: 'E-commerce Logistics',
            description: 'Online retail fulfillment and order processing services for modern businesses'
          })}
        >
          <img 
            src="/Ecommerce.jpg" 
            alt="Globeflight e-commerce logistics - Online retail fulfillment and order processing services" 
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h4 className="text-lg font-bold mb-1">E-commerce</h4>
            <p className="text-white/90 text-xs">Fulfillment & order processing</p>
          </div>
          <div className="absolute top-2 right-2 p-1 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>

        {/* Consolidation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
          onClick={() => setSelectedImage({
            src: '/Consolidation.jpg',
            alt: 'Globeflight cargo consolidation - Group shipping and freight consolidation services',
            title: 'Cargo Consolidation',
            description: 'Group shipping and freight consolidation services for cost-effective logistics'
          })}
        >
          <img 
            src="/Consolidation.jpg" 
            alt="Globeflight cargo consolidation - Group shipping and freight consolidation services" 
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h4 className="text-lg font-bold mb-1">Consolidation</h4>
            <p className="text-white/90 text-xs">Group shipping solutions</p>
          </div>
          <div className="absolute top-2 right-2 p-1 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>

        {/* Info Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
          onClick={() => setSelectedImage({
            src: '/info.jpg',
            alt: 'Globeflight information services - Logistics consulting and supply chain optimization',
            title: 'Logistics Consulting',
            description: 'Expert logistics consulting and supply chain optimization services'
          })}
        >
          <img 
            src="/info.jpg" 
            alt="Globeflight information services - Logistics consulting and supply chain optimization" 
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h4 className="text-lg font-bold mb-1">Consulting</h4>
            <p className="text-white/90 text-xs">Supply chain optimization</p>
          </div>
          <div className="absolute top-2 right-2 p-1 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>

        {/* Profile Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
          onClick={() => setSelectedImage({
            src: '/profile2.jpg',
            alt: 'Globeflight professional services - Expert logistics team and customer support',
            title: 'Expert Team',
            description: 'Professional logistics team providing exceptional customer support and service'
          })}
        >
          <img 
            src="/profile2.jpg" 
            alt="Globeflight professional services - Expert logistics team and customer support" 
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h4 className="text-lg font-bold mb-1">Expert Team</h4>
            <p className="text-white/90 text-xs">Professional support</p>
          </div>
          <div className="absolute top-2 right-2 p-1 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ServicesGridSection 