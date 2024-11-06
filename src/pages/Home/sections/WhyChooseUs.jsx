import Container from '@/components/Container';
import FeaturedButton from '@/components/FeaturedButton';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { whychooseus, whychooseusCards } from '@/constants/homepage';
import React from 'react'
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  return (
    <div className="relative">
      <div className="py-10 md:mt-20  ">
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-7">
            <h1 className="md:text-7x1 text-xl text-brandRed font-bold ">{whychooseus.subTitle}</h1>
            <h1 className="md:text-3xl text-xl font-bold ">{whychooseus.title}</h1>
            <p className="text-justify font-medium">{whychooseus.desc}</p>
            {/*<Link className="" to="contact-us">
              <FeaturedButton>Get Quote</FeaturedButton>
            </Link>*/} 
          </div>
          <div className="">
            {whychooseusCards.map((card, idx) => (
              <Card key={idx} className="mb-5">
                <CardHeader className='py-3'>
                  <div className="flex items-center space-x-5">
                    <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                      {React.createElement(card.icon, { size: "20" })}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <CardTitle className="font-semibold text-lg">{card.title}</CardTitle>
                      <CardDescription>{card.desc}</CardDescription>
                     
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default WhyChooseUs