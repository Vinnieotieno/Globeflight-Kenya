import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";
import aeroplane from "@/assets/aeroplane.png";
import video from "@/assets/herovid.mp4";

const Hero = () => {
  return (
    <div className="relative w-full pt-16 pb-32 mt-16">
      {/* Video Background Section */}
      <div className="relative h-[280px] sm:h-[380px] md:h-[480px] lg:h-[600px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Text Section */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center px-4 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide sm:tracking-wider md:tracking-widest text-center">
            LOGISTICS 24.SEVEN.365
          </h1>
          <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl font-medium text-center px-2 sm:px-4">
            Your Trusted & Credible Logistics, Warehousing & Fulfillment Partner
          </h2>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-5">
            <Button asChild variant="secondary" size="sm" className="w-full sm:w-auto">
              <a href="#services">Logistics</a>
            </Button>
            <Button asChild variant="default" size="sm" className="w-full sm:w-auto">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Values Card Section */}
      <Card className="absolute left-1/2 transform -translate-x-1/2 -translate-y-[30%] w-[90%] sm:w-[85%] md:w-[75%] lg:w-[60%] xl:w-[55%] bg-green-500 text-white shadow-xl p-4 sm:p-6">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:space-x-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Button variant="secondary" className="bg-white text-green-500 font-bold text-xs sm:text-sm px-3 py-1 sm:py-2">
              OUR VALUES
            </Button>
            <img
              src={aeroplane}
              alt="Aeroplane"
              className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-7 lg:h-7 xl:w-16 xl:h-16 object-contain"
            />
          </div>
          <p className="text-center sm:text-left mt-4 sm:mt-0 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">
            Reliability, Integrity, Efficiency, Innovation & Professionalism
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Hero;
