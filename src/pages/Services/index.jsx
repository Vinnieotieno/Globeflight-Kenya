// File: /pages/index.js

import Container from "@/components/Container";
import React from "react";
import Hero from "./sections/Hero";
import { Helmet } from "react-helmet-async";

import Service from "./sections/Service";
import WhereWeShip from "@/components/WhereWeShip";
import CallToActionSection from "@/components/CallToActionSection";
import ScrollOnSideSection from "@/components/ScrollOnSideSection";
import HowWeWork from "./sections/HowWeWork";
import { whereWeWorkImmigrationCards } from "@/constants/homepage";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Globeflight Kenya</title>
        <meta name="description" content="Explore the full range of logistics and shipping services offered by Globeflight Kenya. Air, sea, warehousing, e-commerce, and more." />
        <meta property="og:title" content="Our Services | Globeflight Kenya" />
        <meta property="og:description" content="Explore the full range of logistics and shipping services offered by Globeflight Kenya. Air, sea, warehousing, e-commerce, and more." />
        <link rel="canonical" href="https://globeflight.co.ke/services" />
      </Helmet>
      <div className="main-container">
        <Hero />
        <Container>
          <Service />
          <WhereWeShip 
            title="Experience Seamless Immigration Services" 
            styles="grid grid-cols-1 md:grid-cols-2 gap-10 my-7" 
            data={whereWeWorkImmigrationCards || []} // Fallback in case data is undefined
          />
          <HowWeWork />
        </Container>
        <CallToActionSection />
        < ScrollOnSideSection/>
      </div>
    </>
  );
};

export default HomePage;
