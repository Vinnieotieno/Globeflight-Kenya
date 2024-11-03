import { stats } from '@/constants/servicepage'
import React from 'react'

const Stats = () => {
  return (
      <div className="py-10" >
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center space-y-3">
                      <h1 className="text-5xl font-bold text-brandBluish">{stat.number}</h1>
                      <h4 className="font-medium md:text-lg text-sm">{ stat.text}</h4>
                  </div>
              ))}
          </div>
      </div>
  )
}

export default Stats