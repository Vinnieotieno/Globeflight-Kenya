import React from 'react'
import Container from './Container'
import ctaImage from '@/assets/cta.jpg'
import FeaturedButton from './FeaturedButton';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ctaImges } from '@/constants/homepage';

const CallToActionSection = () => {
  return (
    <div className="bg-gray-200 py-10 ">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-7  justify-center">
          <h1 className="text-2xl md:text-4xl text-brandRed font-bold">
            Let us help you find a solution that meets your Logistic needs
          </h1>
          <h4 className="text-gray-500 font-medium text-xl">
            Take advantage of our extensive experience and let Globeflight find the right solution that fit your pocket as well
          </h4>
          <Link className="" to="/contact-us">
            <FeaturedButton>Get in Touch with us Today</FeaturedButton>
          </Link>
        </div>

        <div className="w-full">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}>
            <CarouselContent>
              {ctaImges.map((imageUrl, index) => (
                <CarouselItem key={index}>
                  <img src={imageUrl} alt={"globeflight"} className="rounded-lg w-full object-cover h-64 md:h-80" />
                </CarouselItem>
              ))}

              <CarouselItem key={"10"}>
                <img src={ctaImage} alt="rollinscodes.com" className="rounded-lg  w-full object-cover h-64 md:h-80" />
              </CarouselItem>
            </CarouselContent>
            {/* <CarouselPrevious className="hidden md:block" />
            <CarouselNext className="hidden md:block" /> */}
          </Carousel>
        </div>
      </Container>
    </div>
  );
}

export default CallToActionSection