// src/pages/Blog/BlogHome.jsx
import React from "react";
import Container from "@/components/Container";
import Hero from "./sections/Hero";  
import BlogPage from "./sections/BlogPage"; 
import BlogCategoryPage from "./sections/BlogCategoryPage"; // <-- Add this import
import CallToActionSection from "@/components/CallToActionSection"; 
import ScrollOnSideSection from "@/components/ScrollOnSideSection";
import { Routes, Route } from "react-router-dom";

const BlogHome = () => {
  // Fix: Only render <Routes> and <Route> at the app level, not inside BlogHome if BlogHome is not the parent route.
  // If BlogHome is rendered at /blog, then /category/:slug will not match unless you have a parent <Routes> at the app level.

  // Solution 1: If BlogHome is mounted at /blog, then your routes should be:
  /*
    <Route path="/blog/*" element={<BlogHome />} />
  */
  // And inside BlogHome:
  // <Routes>
  //   <Route path="" element={<BlogPage />} />
  //   <Route path="category/:slug" element={<BlogCategoryPage />} />
  // </Routes>

  // Solution 2: If BlogHome is not the parent, move <Routes> to the app-level router.

  // Here is the correct BlogHome for nested routing:
  return (
    <div className="main-container">
      <Hero />
      <Container>
        <Routes>
          {/* 
            For nested routing under /blog, use relative path (no leading slash).
            This matches /blog/category/:slug, not /category/:slug.
          */}
          <Route path="" element={<BlogPage />} />
          <Route path="category/:slug" element={<BlogCategoryPage />} />
        </Routes>
      </Container>
      <CallToActionSection />
      <ScrollOnSideSection/>
    </div>
  );
};

export default BlogHome;
