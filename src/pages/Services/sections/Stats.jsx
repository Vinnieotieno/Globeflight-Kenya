import React, { useState, useEffect } from 'react'
import { stats } from '@/constants/servicepage'
import { motion, AnimatePresence } from 'framer-motion'

const Stats = () => {
  const [currentStats, setCurrentStats] = useState(stats.slice(0, 4))
  const [key, setKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats(prevStats => {
        const newStats = [...stats]
        const first = newStats.shift()
        newStats.push(first)
        return newStats.slice(0, 4)
      })
      setKey(prevKey => prevKey + 1)
    }, 20000) // 20 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <AnimatePresence>
          {currentStats.map((stat, idx) => (
            <motion.div
              key={`${stat.number}-${key}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-3"
            >
              <motion.h1
                className="text-5xl font-bold text-brandBluish"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {stat.number}
              </motion.h1>
              <h4 className="font-medium md:text-lg text-sm text-center">{stat.text}</h4>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Stats