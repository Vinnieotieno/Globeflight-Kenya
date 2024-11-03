import FeaturedButton from '@/components/FeaturedButton';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { logisticServicesContent } from '@/constants/homepage';

const LogisticServices = () => {
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false); // State for Read More button
  const selectedService = logisticServicesContent[selectedServiceIdx];

  const toggleText = () => setIsExpanded(!isExpanded);

  return (
    <div className="py-10" id="services">
      <div className="flex flex-col space-y-4">
        <h4 className="md:text-3xl text-xxl text-brandBluish font-bold">WHAT WE OFFER</h4>
        <h1 className="md:text-3xl text-xl font-bold">
          Explore our <span className="text-brandRed">Services</span>
        </h1>
        
        {/* Service description with "Read More" and "Explore More" buttons */}
        <div className="md:flex items-start md:space-x-5">
          <div className="md:w-10/12 mb-2">
            <p className="text-justify">
              {isExpanded
                ? `We take pride in being regarded as one of the most reliable and affordable logistic and warehousing service providers in the country. As a third party logistic service provider, we excel at a range of logistic services, which includes trucking services, warehousing services, logistic services, and a range of other ancillary services. We have years of experience in the business of logistics, warehousing, distribution, trucking and supply chain management services, and aim to provide our clients with convenience, reliability and affordability through our premium logistic services.

                Our team of experts at all levels of our services have years of experience backing them, which adds the credibility of an expert workforce. This also helps us in cutting down response time, and providing punctual delivery and services at all times, whether it is trucking service or warehousing services. Our goal is to make a positive difference in your business through our services, and build long term relationship with you. Our commitment to our clients can be seen by the amount of emphasis we lay on team work, customer support services and making technological upgrades in our logistic process and equipment from time to time.

                Our experience in all the fields we serve in, and the range of services we provide, makes us one of the most comprehensive logistic service providers in the nation. And, with the help of continuous support and trust of our clients, we aim to stay at the top of the game, and humbly so. Our sophisticated systems, neatly designed logistic process, state of the art logistic tools and equipment, most advanced carriers, custom tailored services, and dedication to keep the costs low for end users, help us to provide logistic solution that aligns well with our clients’ requirements. We welcome you to our site, and request you to consult with our logistic experts for your logistic needs, and rest assured of getting done.

                We have years of experience in the business of logistics, warehousing, distribution, trucking and supply chain management services, and aim to provide our clients with convenience, reliability and affordability through our premium logistic services`
                : `We take pride in being regarded as one of the most reliable and affordable logistic and warehousing service providers in the country. As a third party logistic service provider, we excel at a range of logistic services...`}
            </p>

            {/* "Read More" and "Explore More" buttons in a vertical stack */}
            <div className="flex flex-col space-y-2 mt-4">
              <button
                onClick={toggleText}
                className="text-white bg-green-500 px-3 py-1 text-sm rounded hover:bg-blue-600 transition-colors w-fit"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
              <Link to="/immigration">
                <FeaturedButton className="uppercase text-sm px-3 py-1 w-fit">Explore more</FeaturedButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion and Image Display */}
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full h-full">
            {logisticServicesContent.map((service, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`} 
                onClick={() => setSelectedServiceIdx(idx)}
              >
                <AccordionTrigger>{service.title}</AccordionTrigger>
                <AccordionContent>{service.serviceDesc}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Selected Service Image and Description */}
        <div className="relative h-full w-full">
          <img src={selectedService.img} alt="Service Image" className="w-full h-full object-cover rounded-lg" />
          <div className="hidden md:block absolute bottom-0 right-0 p-4 bg-white bg-opacity-90 shadow-lg lg:w-2/4 md:w-3/4 w-full rounded-lg">
            <p className="text-xs md:text-sm">{selectedService.minorDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticServices;
