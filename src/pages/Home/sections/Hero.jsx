import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import React from 'react'
import { Link } from 'react-router-dom'
import aeroplane from '@/assets/aeroplane.png'
import video from "@/assets/herovid.mp4"

const Hero = () => {
  return (
    <div className="relative w-full pt-16 pb-32">
      <div className="relative h-[280px] md:h-[480px] overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center space-y-8 px-4">
          <h1 className="text-white text-4xl lg:text-5xl font-bold tracking-wider md:tracking-widest text-center">
            LOGISTICS 24.SEVEN.365
          </h1>
          <h2 className="text-white text-lg md:text-3xl font-medium text-center">
            Your Trusted & Credible Logistics, Warehousing & Fulfillment Partner
          </h2>
          <div className="flex items-center space-x-5">
            <Button asChild variant="secondary" size="lg">
              <a href="#services">Logistics</a>
            </Button>
            <Button asChild variant="default" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      <Card className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 bg-green-500 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between p-6 space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex items-center space-x-4">
            <Button variant="secondary" className="bg-white text-green-500 font-bold">
              OUR VALUES
            </Button>
            <img src={aeroplane} alt="" className="w-16 h-16 object-contain" />
          </div>
          <p className="text-lg md:text-xl font-bold text-center md:text-left flex-1">
            Reliability, Integrity, Efficiency, Innovation & Professionalism
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Hero