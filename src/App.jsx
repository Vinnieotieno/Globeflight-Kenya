import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Track from '@/pages/Track';

import React, { Suspense } from 'react';

// Lazy load the BlogPage and BlogDetail components
const BlogPage = React.lazy(() => import('@/pages/Blog/sections/BlogPage'));
const BlogDetail = React.lazy(() => import('@/pages/Blog/sections/BlogDetail'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about-us" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="track" element={<Track />} />
          
          {/* Blog listing route */}
          <Route
            path="blog"
            element={
              <Suspense fallback={<div className="text-center py-20">Loading Blog Page...</div>}>
                <BlogPage />
              </Suspense>
            }
          />
          
          {/* Dynamic Blog Detail route */}
          <Route
            path="blog/:slug"
            element={
              <Suspense fallback={<div className="text-center py-20">Loading Blog Post...</div>}>
                <BlogDetail />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
