import FeaturedButton from '@/components/FeaturedButton';
import React from 'react'
import { Link } from 'react-router-dom';
import aeroplane from '@/assets/aeroplane.png'
import video from "@/assets/herovid.mp4";
const Hero = () => {
  return (
    <div className="pt-20 relative w-full  ">
      <div className="relative h-[400px] md:h-[600px] overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute bg-black bg-opacity-60 top-0 left-0 h-full w-full flex flex-col space-y-8 items-center justify-center">
          <h1 className="text-white lg:text-5xl text-4xl font-bold tracking-wider md:tracking-widest text-center">
            LOGISTICS 24.SEVEN.365
          </h1>
          <h4 className="text-white text-lg md:text-3xl font-medium text-wrap text-center">
            Your Trusted & Credible Logistics, Warehousing & Fulfillment Partner
          </h4>
          <div className="items-center space-x-5">
            <a href="#services">
              <FeaturedButton className="bg-green-500">Logistics</FeaturedButton>
            </a>
            <Link to="about us">
              <FeaturedButton className="">CONTACT US</FeaturedButton>
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-2/5 lg:w-2/5 bg-green-500 absolute py-3 rounded-lg shadow-2xl bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
  <div className="flex items-center space-x-3 w-full bg-green-500 p-4 text-white rounded-lg">
    <button className="bg-white text-green-500 px-4 py-1 font-bold rounded shadow">
      OUR VALUES
    </button>
    <div className="w-1/4">
      <img src={aeroplane} alt="Globeflight" className="object-cover" />
    </div>
    <div>
      <p className="text-xl font-bold">
      Reliability, Integrity, Efficiency, Innovation & Professionalism
      </p>
    </div>
  </div>
</div>

    </div>
  );
}

export default Hero