// File: /pages/index.js

import Container from "@/components/Container";
import React from "react";
import Track from "./sections/Track";
import CallToActionSection from "@/components/CallToActionSection";


const index = () => {
    return (
      <div className="main-container">
        
        <Container>
          <Track />
        </Container>
        <CallToActionSection />
      </div>
    );
  };
  
  export default index;