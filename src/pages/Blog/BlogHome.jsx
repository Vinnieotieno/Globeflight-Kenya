// src/pages/Blog/BlogHome.jsx
import React from "react";
import Container from "@/components/Container";
import Hero from "./sections/Hero";  
import BlogPage from "./sections/BlogPage"; 
import CallToActionSection from "@/components/CallToActionSection"; 
import Top from '@/components/Top.jsx';
import BlogDetail from "@/pages/Blog/BlogDetail";

const BlogHome = () => {
  return (
    <div className="main-container">
      <Hero />
      <Container>
        <BlogPage />
        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Container>
      <CallToActionSection />
      <Top/>
    </div>
  );
};

export default BlogHome;
