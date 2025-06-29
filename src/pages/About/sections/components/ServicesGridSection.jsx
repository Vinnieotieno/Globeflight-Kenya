import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const ServicesGridSection = ({ setSelectedImage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-32"
    >
      <Helmet>
        <title>Comprehensive Logistics Services | Globeflight Kenya</title>
        <meta name="description" content="Explore our full range of logistics services: e-commerce fulfillment, cargo consolidation, consulting, and expert support. Globeflight Kenya delivers tailored, end-to-end logistics solutions for your business." />
        <meta property="og:title" content="Comprehensive Logistics Services | Globeflight Kenya" />
        <meta property="og:description" content="Explore our full range of logistics services: e-commerce fulfillment, cargo consolidation, consulting, and expert support. Globeflight Kenya delivers tailored, end-to-end logistics solutions for your business." />
        <meta property="og:image" content="/service.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://globeflight.co.ke/services" />
        <link rel="canonical" href="https://globeflight.co.ke/services" />
      </Helmet>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* E-commerce */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-green-200 bg-white/60 backdrop-blur-lg"
          tabIndex={0}
          aria-label="View E-commerce Logistics image details"
          onClick={() => setSelectedImage({
            src: '/Ecommerce.jpg',
            alt: 'Globeflight e-commerce logistics - Online retail fulfillment and order processing services',
            title: 'E-commerce Logistics',
            description: 'Online retail fulfillment and order processing services for modern businesses'
          })}
        >
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img 
              src="/Ecommerce.jpg" 
              alt="Globeflight e-commerce logistics - Online retail fulfillment and order processing services" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-90"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-green-700/70 via-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-md rounded-b-3xl shadow-lg z-20">
            <h4 className="text-lg font-bold text-green-800 mb-1 font-sans">E-commerce</h4>
            <p className="text-green-900/80 text-xs font-medium">Fulfillment & order processing</p>
          </div>
        </motion.div>
        {/* Consolidation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-blue-200 bg-white/60 backdrop-blur-lg"
          tabIndex={0}
          aria-label="View Cargo Consolidation image details"
          onClick={() => setSelectedImage({
            src: '/Consolidation.jpg',
            alt: 'Globeflight cargo consolidation - Group shipping and freight consolidation services',
            title: 'Cargo Consolidation',
            description: 'Group shipping and freight consolidation services for cost-effective logistics'
          })}
        >
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img 
              src="/Consolidation.jpg" 
              alt="Globeflight cargo consolidation - Group shipping and freight consolidation services" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-90"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-700/70 via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-md rounded-b-3xl shadow-lg z-20">
            <h4 className="text-lg font-bold text-blue-800 mb-1 font-sans">Consolidation</h4>
            <p className="text-blue-900/80 text-xs font-medium">Group shipping solutions</p>
          </div>
        </motion.div>
        {/* Info Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-green-200 bg-white/60 backdrop-blur-lg"
          tabIndex={0}
          aria-label="View Logistics Consulting image details"
          onClick={() => setSelectedImage({
            src: '/info.jpg',
            alt: 'Globeflight information services - Logistics consulting and supply chain optimization',
            title: 'Logistics Consulting',
            description: 'Expert logistics consulting and supply chain optimization services'
          })}
        >
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img 
              src="/info.jpg" 
              alt="Globeflight information services - Logistics consulting and supply chain optimization" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-90"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-green-700/70 via-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-md rounded-b-3xl shadow-lg z-20">
            <h4 className="text-lg font-bold text-green-800 mb-1 font-sans">Consulting</h4>
            <p className="text-green-900/80 text-xs font-medium">Supply chain optimization</p>
          </div>
        </motion.div>
        {/* Profile Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-blue-200 bg-white/60 backdrop-blur-lg"
          tabIndex={0}
          aria-label="View Expert Team image details"
          onClick={() => setSelectedImage({
            src: '/profile2.jpg',
            alt: 'Globeflight professional services - Expert logistics team and customer support',
            title: 'Expert Team',
            description: 'Professional logistics team providing exceptional customer support and service'
          })}
        >
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img 
              src="/profile2.jpg" 
              alt="Globeflight professional services - Expert logistics team and customer support" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-90"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-700/70 via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-md rounded-b-3xl shadow-lg z-20">
            <h4 className="text-lg font-bold text-blue-800 mb-1 font-sans">Expert Team</h4>
            <p className="text-blue-900/80 text-xs font-medium">Professional support</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ServicesGridSection 