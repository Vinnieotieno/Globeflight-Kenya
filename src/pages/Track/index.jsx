// File: /pages/index.js

import Container from "@/components/Container";
import React from "react";
import Track from "./sections/Track";
import CallToActionSection from "@/components/CallToActionSection";
import Top from '@/components/Top';


const index = () => {
    return (
      <div className="main-container">
        
        <Container>
          <Track />
        </Container>
        <CallToActionSection />
        <Top />
      </div>
    );
  };
  
  export default index;