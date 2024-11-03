import React from 'react';

const Hero = () => {
  return (
    <div className="pt-20 py-10 relative">
      <div className="relative h-[400px] md:h-[600px] overflow-hidden">
        {/* Embed YouTube video in iframe */}
        <iframe
          src="https://www.youtube.com/embed/Yj-Urdb6GEE?autoplay=1&mute=1&loop=1&playlist=Yj-Urdb6GEE"
          title="Immigration Video"
          className="w-full h-full object-cover"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

        {/* Overlay Content */}
        <div className="absolute bg-black bg-opacity-70 top-0 left-0 h-full w-full flex flex-col space-y-8 items-center justify-center">
          <h1 className="text-white lg:text-5xl text-3xl font-bold tracking-wider md:tracking-widest text-center">
           Experience seamless Logistics services with Globeflight Kenya.
          </h1>
          <h4 className="text-white text-lg md:text-3xl font-medium text-wrap text-center">
            
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Hero;
