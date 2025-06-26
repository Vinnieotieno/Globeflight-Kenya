// src/pages/Blog/BlogHome.jsx
import React from "react";
import Container from "@/components/Container";
import Hero from "./sections/Hero";  
import CallToActionSection from "@/components/CallToActionSection"; 
import ScrollOnSideSection from "@/components/ScrollOnSideSection";
import { Outlet } from "react-router-dom";

const BlogHome = () => {
  return (
    <div className="main-container">
      <Hero />
      <Container>
        <Outlet />
      </Container>
      <CallToActionSection />
      <ScrollOnSideSection/>
    </div>
  );
};

export default BlogHome;
