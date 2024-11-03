// src/pages/Blog/BlogHome.jsx
import React from "react";
import Container from "@/components/Container";
import Hero from "./sections/Hero";  
import BlogPage from "./sections/BlogPage"; 
import CallToActionSection from "@/components/CallToActionSection";  // Path for CallToActionSection

const BlogHome = () => {
  return (
    <div className="main-container">
      <Hero />
      <Container>
        <BlogPage />
      </Container>
      <CallToActionSection />
    </div>
  );
};

export default BlogHome;
