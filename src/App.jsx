// File: App.js
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Track from '@/pages/Track';

const BlogPage = React.lazy(() => import('@/pages/Blog/sections/BlogPage'));
const BlogDetail = React.lazy(() => import('@/pages/Blog/sections/BlogDetail'));
const ServiceDetail = React.lazy(() => import('@/pages/Services/sections/ServiceDetails')); // Lazy load ServiceDetail
import BlogHome from "@/pages/Blog/BlogHome"; // <-- Import BlogHome
import BlogCategoryPage from "@/pages/Blog/sections/BlogCategoryPage"; // <-- Import BlogCategoryPage
const JobPage = React.lazy(() => import('@/pages/JobPage')); // <-- Add this line
const JobDetail = React.lazy(() => import('@/pages/JobDetail')); // <-- Add this line

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Define all routes using MainLayout */}
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about-us" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="track" element={<Track />} />

          {/* Dynamic Service Detail Route - change :id to :slug */}
          <Route
            path="services/:slug"
            element={
              <Suspense fallback={<div className="py-20 text-center">Loading Service Details...</div>}>
                <ServiceDetail />
              </Suspense>
            }
          />
          
          {/* Blog Routes - All blog routes under /blog */}
          <Route path="blog" element={<BlogHome />}>
            <Route index element={<BlogPage />} />
            <Route path=":slug" element={<BlogDetail />} />
            <Route path="category/:slug" element={<BlogCategoryPage />} />
          </Route>
          
          {/* Add Job Page route */}
          <Route
            path="jobs"
            element={
              <Suspense fallback={<div className="py-20 text-center">Loading Jobs...</div>}>
                <JobPage />
              </Suspense>
            }
          />
          <Route
            path="jobs/:slug"
            element={
              <Suspense fallback={<div className="py-20 text-center">Loading Job Details...</div>}>
                <JobDetail />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
