"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Container from "@/components/Container"
import {
  Quote,
  PauseCircle,
  PlayCircle,
  User,
  Building,
  MessageSquare,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Custom rating stars component
const RatingStars = ({ rating, size = "md", className = "", onRatingChange = null }) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
    xl: "h-6 w-6",
  }

  const sizeClass = sizeClasses[size] || sizeClasses.md

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={onRatingChange ? "cursor-pointer" : ""}
          onClick={() => onRatingChange && onRatingChange(i + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={i < Math.floor(rating) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${sizeClass} ${
              i < Math.floor(rating)
                ? `${className || "text-yellow-400"}`
                : i < rating
                  ? `${className || "text-yellow-400"} opacity-50`
                  : "text-gray-300"
            }`}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
      ))}
    </div>
  )
}

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-6 h-full flex flex-col ${
        isActive
          ? "bg-gradient-to-br from-green-50 to-white shadow-xl border border-green-100"
          : "bg-white shadow-lg border border-gray-100"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <Quote className={`h-10 w-10 ${isActive ? "text-green-500" : "text-gray-300"}`} />
        <div className="flex">
          <RatingStars rating={testimonial.rating} size="sm" className="text-yellow-400" />
        </div>
      </div>

      <p className="flex-grow mb-6 italic leading-relaxed text-gray-700">"{testimonial.review}"</p>

      <div className="pt-4 mt-auto border-t border-gray-100">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 mr-3 text-white rounded-full bg-gradient-to-br from-green-400 to-green-600">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{testimonial.name}</div>
            <div className="flex items-center text-sm text-gray-500">
              {testimonial.title ? (
                <>
                  <Building className="w-3 h-3 mr-1" />
                  {testimonial.title}
                </>
              ) : (
                <>
                  <User className="w-3 h-3 mr-1" />
                  Client
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const API_BASE = (() => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:5000/admin/api';
    } else {
      return 'https://globeflight.co.ke/admin/api';
    }
  }
  return 'http://localhost:5000/admin/api'; // fallback
})();

console.log('API_BASE determined as:', API_BASE);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isTablet = useMediaQuery("(min-width: 768px)")
  const containerRef = useRef(null)

  useEffect(() => {
    // Set visible count based on screen size
    if (isDesktop) {
      setVisibleCount(3)
    } else if (isTablet) {
      setVisibleCount(2)
    } else {
      setVisibleCount(1)
    }
  }, [isDesktop, isTablet])

  useEffect(() => {
    let interval
    if (isAutoPlay) {
      interval = setInterval(() => {
        handleNext()
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlay, activeIndex])

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccessMessage])

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const apiUrl = `${API_BASE}/testimonials/public`;
        console.log("API_BASE:", API_BASE);
        console.log("Fetching testimonials from:", apiUrl);
        
        const res = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include'
        });

        console.log("Response status:", res.status);
        console.log("Response headers:", res.headers);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Testimonials response:", data);

        if (data.success && data.data) {
          // Handle both array and object response formats
          const testimonials = Array.isArray(data.data) 
            ? data.data 
            : data.data.testimonials || [];

          console.log("Processed testimonials:", testimonials);

          if (testimonials.length > 0) {
            setTestimonialsList(testimonials.map(t => ({
              id: t.id,
              name: t.name,
              title: t.position || t.company || "",
              review: t.content,
              rating: t.rating || 5,
            })));
            setFetchError(false);
          } else {
            setTestimonialsList([]);
            setFetchError(true);
          }
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setFetchError(true);
        setTestimonialsList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsList.length - visibleCount : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialsList.length - visibleCount ? 0 : prev + 1))
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  // Replace this with your actual Google review link:
  const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID";
  // Example: const GOOGLE_REVIEW_URL = "https://g.page/r/CfYw3b6k3k8CEBM/review";

  // Get visible testimonials based on activeIndex and visibleCount
  const visibleTestimonials = testimonialsList.slice(activeIndex, activeIndex + visibleCount)

  // If we don't have enough testimonials to fill the visible count, add from the beginning
  if (visibleTestimonials.length < visibleCount) {
    const neededCount = visibleCount - visibleTestimonials.length
    visibleTestimonials.push(...testimonialsList.slice(0, neededCount))
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 rounded-bl-full h-1/3 bg-green-50 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/4 rounded-tr-full h-1/4 bg-green-50 opacity-30"></div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 text-center"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-green-600 bg-green-50 rounded-full mb-3">
            Testimonials
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Our clients trust us with their logistics needs and have shared their experiences working with Globeflight
          </p>
        </motion.div>

        {/* Success message */}
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between px-4 py-3 mb-8 text-green-700 bg-green-100 border border-green-200 rounded-lg"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Thank you for sharing your experience! Your testimonial has been added.</span>
              </div>
              <button onClick={() => setShowSuccessMessage(false)} className="text-green-700 hover:text-green-900">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <div className="py-10 text-center text-gray-500 col-span-full">
                  Loading testimonials...
                </div>
              ) : fetchError ? (
                <div className="py-10 text-center text-gray-500 col-span-full">
                  No testimonials found. They may be pending approval or there was a connection issue.
                </div>
              ) : testimonialsList.length === 0 ? (
                <div className="py-10 text-center text-gray-500 col-span-full">
                  No testimonials available at the moment.
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {visibleTestimonials.map((testimonial, idx) => (
                    <motion.div
                      key={`${testimonial.id}-${idx}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <TestimonialCard testimonial={testimonial} isActive={idx === 0} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center mt-10 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleAutoPlay}
              className={`rounded-full w-10 h-10 ${
                isAutoPlay
                  ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
              aria-label={isAutoPlay ? "Pause autoplay" : "Start autoplay"}
            >
              {isAutoPlay ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center justify-center mb-8 space-x-2">
            {testimonialsList.slice(0, testimonialsList.length - visibleCount + 1).map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "bg-green-500 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="mt-10">
            <Button
              variant="outline"
              className="text-green-600 border-green-500 hover:bg-green-50 group"
              onClick={() => window.open(GOOGLE_REVIEW_URL, "_blank")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>Share Your Experience on Google</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Testimonials
