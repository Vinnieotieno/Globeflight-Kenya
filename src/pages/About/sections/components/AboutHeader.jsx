import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const AboutHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-20 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center px-4 py-2 space-x-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-200/20 mb-6"
      >
        <Sparkles className="w-4 h-4 text-green-600" />
        <span className="text-sm font-semibold text-gray-700 tracking-wide uppercase">About Globeflight</span>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-bold md:text-6xl lg:text-7xl mb-6"
      >
        <span className="text-gray-900">Who We </span>
        <span className="text-transparent bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text">
          Are
        </span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto"
      >
        Leading the logistics revolution with innovative solutions, global reach, and unwavering commitment to excellence.
      </motion.p>
    </motion.div>
  )
}

export default AboutHeader 