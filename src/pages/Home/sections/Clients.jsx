import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const clients = [
  { name: "M-KOPA", logo: "/client1.png" },
  { name: "ALLPARK INDUSTRIES", logo: "/client2.png" },
  { name: "GIZA SYSTEMS", logo: "/client3.png" },
  { name: "KASHA", logo: "/client4.png" },
  { name: "MFI", logo: "/client5.png" },
  { name: "SYBYL", logo: "/client6.png" },
  { name: "RIANA", logo: "/client7.png" },
  { name: "NOKIA SIEMENS", logo: "/client8.png" },
];

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function OurClients() {
  return (
    <section className="w-full py-4 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">OUR CLIENTS</h2>
        <Slider {...settings} className="carousel-clients">
          {clients.map((client, index) => (
            <div key={index} className="flex justify-center items-center p-4">
              <img
                src={client.logo}
                alt={client.name}
                className="w-36 h-20 object-contain" 
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
