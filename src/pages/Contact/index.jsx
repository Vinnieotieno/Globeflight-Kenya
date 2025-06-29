import Container from "@/components/Container";
import React from "react";
import Hero from "./sections/Hero";
import ContactForm from "./sections/ContactForm";
import FAQ from './sections/Faq'
import ScrollOnSideSection from "@/components/ScrollOnSideSection";
import { Helmet } from "react-helmet-async";

const index = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Globeflight Kenya</title>
        <meta name="description" content="Contact Globeflight Kenya for all your logistics, shipping, and courier needs. Get in touch for quotes, support, and more." />
        <meta property="og:title" content="Contact Us | Globeflight Kenya" />
        <meta property="og:description" content="Contact Globeflight Kenya for all your logistics, shipping, and courier needs. Get in touch for quotes, support, and more." />
        <link rel="canonical" href="https://globeflight.co.ke/contact-us" />
      </Helmet>
      <div className="main-container">
        <Hero />
        <Container>
          <ContactForm />
          <FAQ/>
        </Container>
        <ScrollOnSideSection/>
      </div>
    </>
  );
};

export default index;
