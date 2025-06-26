import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Users, Shield, Clock } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    { icon: Globe, label: "Countries Served", value: "160+", color: "text-blue-600" },
    { icon: Users, label: "Happy Clients", value: "10K+", color: "text-green-600" },
    { icon: Shield, label: "Success Rate", value: "99.9%", color: "text-purple-600" },
    { icon: Clock, label: "Years Experience", value: "25+", color: "text-orange-600" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default StatsSection 