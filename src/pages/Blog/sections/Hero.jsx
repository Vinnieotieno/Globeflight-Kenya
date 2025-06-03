import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Hero = () => {
  const [blogs, setBlogs] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs/public?page=1&limit=3`);
        const data = await res.json();
        if (data.success && data.data.blogs.length > 0) {
          setBlogs(data.data.blogs);
        }
      } catch {
        setBlogs([]);
      }
    };
    fetchLatest();
  }, []);

  // Carousel auto-advance
  useEffect(() => {
    if (blogs.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % blogs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [blogs]);

  if (!blogs.length) {
    // fallback hero if no blogs
    return (
      <div className="py-10 pt-20">
        <div 
          className="relative w-full min-h-[180px] md:min-h-[320px] lg:min-h-[420px] aspect-[2.67/1] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/profile2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full px-4 space-y-6 bg-black bg-opacity-70">
            <p className="text-4xl font-extrabold leading-tight tracking-wide text-center text-white md:text-6xl md:w-3/5">
              LATEST INSIGHTS
            </p>
          </div>
        </div>
      </div>
    );
  }

  const showBlog = blogs[current];
  // Defensive: avoid undefined featuredImage
  const hasImage = showBlog && showBlog.featuredImage;
  const imageUrl = hasImage
    ? (showBlog.featuredImage.startsWith("http")
        ? showBlog.featuredImage
        : showBlog.featuredImage
          ? `${API_URL.replace("/api", "")}/${showBlog.featuredImage.replace(/^\/+/, "")}`
          : "/profile2.jpg")
    : "/profile2.jpg";

  return (
    <div className="py-10 pt-20">
      <div 
        className="relative w-full min-h-[180px] md:min-h-[320px] lg:min-h-[420px] aspect-[2.67/1] bg-cover bg-center bg-no-repeat rounded-2xl shadow-lg transition-all"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full px-4 bg-black bg-opacity-60">
          <Link to={showBlog && showBlog.slug ? `/blog/${showBlog.slug}` : "#"}>
            <button className="px-6 py-2 mt-2 font-semibold text-white transition bg-green-600 rounded-full shadow hover:bg-green-700">
              Read More
            </button>
          </Link>
        </div>
        {/* Carousel controls */}
        {blogs.length > 1 && (
          <div className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
            {blogs.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-200 ${current === idx ? "bg-green-500" : "bg-white bg-opacity-60"}`}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;

// No code changes needed in this file for the error you mentioned.
// The error "No routes matched location '/category/distribution'" is from react-router-dom
// and means you do not have a Route defined for path="/category/:slug" (or similar) in your router setup.

// To fix this, add a route for blog categories in your main router file, for example:

// In your main App.jsx or Routes.jsx (where your <Routes> are defined):
// import BlogCategoryPage from "@/pages/Blog/sections/BlogCategoryPage"; // You need to create this page

/*
<Routes>
  ...existing routes...
  <Route path="/category/:slug" element={<BlogCategoryPage />} />
  ...existing routes...
</Routes>
*/

// Then, create BlogCategoryPage.jsx to fetch and display blogs for the given category slug.

// This will resolve the "No routes matched location" error when clicking category links.