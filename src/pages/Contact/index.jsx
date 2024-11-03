import Container from "@/components/Container";
import React from "react";
import Hero from "./sections/Hero";
import ContactForm from "./sections/ContactForm";
import FAQ from './sections/Faq'

const index = () => {
  return (
    <div className="main-container">
      <Hero />
      <Container>
        <ContactForm />
        <FAQ/>
      </Container>
    </div>
  );
};

export default index;
