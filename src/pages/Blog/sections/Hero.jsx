'use client'

import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Hero = ({ children }) => {
  return (
    <section className="relative min-h-[500px] mt-16 lg:min-h-[600px] overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-700">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/20 to-green-600/20 opacity-20"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-24 mx-auto">
        {children || (
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center mt-6 gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                Fresh Insights Daily
              </div>

              {/* Main heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white animate-fade-in-up">
                <span className="block">Discover Stories</span>
                <span className="block mt-2 bg-gradient-to-r from-green-200 to-green-400 bg-clip-text text-transparent">
                  That Matter
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed animate-fade-in-up animation-delay-200">
                Stay ahead with expert insights, industry trends, and inspiring stories from Globeflight Kenya
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
                <Button 
                  className="px-8 py-6 text-lg font-semibold bg-white text-green-800 hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-full"
                >
                  Start Reading
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-6 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 rounded-full"
                >
                  Subscribe to Newsletter
                </Button>
              </div>

              {/* Stats 
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 animate-fade-in-up animation-delay-600">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
                  <div className="text-sm text-white/70">Articles Published</div>
                </div>
                <div className="text-center border-x border-white/20">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">50K+</div>
                  <div className="text-sm text-white/70">Monthly Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">100+</div>
                  <div className="text-sm text-white/70">Expert Authors</div>
                </div>
              </div>*/}
            </div>
          </div>
        )}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white" fillOpacity="0.1"/>
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 40C840 50 960 70 1080 80C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white" fillOpacity="0.05"/>
        </svg>
      </div>
    </section>
  )
}

export default Hero