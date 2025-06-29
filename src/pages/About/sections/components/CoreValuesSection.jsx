import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Target, Lightbulb, Heart, CheckCircle } from 'lucide-react'

const CoreValuesSection = () => {
  const coreValues = [
    { 
      icon: Target, 
      title: "VISION", 
      description: "To be the leading independent logistics company, offering value-added total cargo solutions for corporates, SMEs & developing market sectors, growing our market share in Kenya and East Africa.",
      gradient: "from-blue-500 to-purple-600",
      stats: { years: "25+", countries: "175+" }
    },
    { 
      icon: Lightbulb, 
      title: "MISSION", 
      description: "To be recognized as a responsible organization, providing precise, prompt, and affordable services, keeping in tune with market needs and utilizing the latest technology to exceed client expectations.",
      gradient: "from-emerald-400 to-green-600",
      stats: { clients: "10K+", satisfaction: "99%" }
    },
    { 
      icon: Heart, 
      title: "CORE VALUES", 
      description: "Reliability, Integrity, Efficiency, Innovation & Professionalism.",
      gradient: "from-green-500 to-emerald-500",
      stats: { team: "500+", experience: "25+" }
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-8 mb-32 md:grid-cols-3">
      {coreValues.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="group"
        >
          <Card className="relative h-full overflow-hidden transition-all duration-500 border-0 shadow-xl hover:shadow-2xl bg-white/90 backdrop-blur-sm">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            <CardContent className="relative p-8">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient} mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                <item.icon className="w-10 h-10 text-white" />
              </div>
              <h4 className="mb-5 text-3xl font-bold tracking-tight text-gray-900">{item.title}</h4>
              <p className="text-lg font-medium leading-relaxed text-gray-600 mb-6">{item.description}</p>
              
              {/* Stats for each card */}
              <div className="flex gap-4 text-sm">
                {item.stats && Object.entries(item.stats).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default CoreValuesSection 