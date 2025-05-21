"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Container from "@/components/Container"
import { testimonials } from "@/constants/homepage"
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

      <p className="text-gray-700 mb-6 flex-grow italic leading-relaxed">"{testimonial.review}"</p>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white mr-3">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-500 flex items-center">
              {testimonial.title ? (
                <>
                  <Building className="h-3 w-3 mr-1" />
                  {testimonial.title}
                </>
              ) : (
                <>
                  <User className="h-3 w-3 mr-1" />
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

const ShareExperienceForm = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Name is required"
    if (!review.trim()) newErrors.review = "Review is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSubmit({
        name,
        title,
        review,
        rating,
        id: Date.now(), // Generate a unique ID
      })

      // Show success message or close dialog
      onClose()
    } catch (error) {
      console.error("Error submitting testimonial:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          Your Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Your Title/Company (Optional)</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Supply Chain Manager" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Your Rating</Label>
        <div className="flex items-center space-x-2">
          <RatingStars rating={rating} size="lg" className="text-yellow-400" onRatingChange={setRating} />
          <span className="text-gray-500 ml-2">{rating}/5</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="review">
          Your Experience <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience with Globeflight..."
          rows={5}
          className={errors.review ? "border-red-500" : ""}
        />
        {errors.review && <p className="text-red-500 text-sm">{errors.review}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Testimonial
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [testimonialsList, setTestimonialsList] = useState(testimonials)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

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

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsList.length - visibleCount : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialsList.length - visibleCount ? 0 : prev + 1))
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  const openShareDialog = () => {
    setIsDialogOpen(true)
    // Pause autoplay when dialog is open
    setIsAutoPlay(false)
  }

  const closeShareDialog = () => {
    setIsDialogOpen(false)
  }

  const handleTestimonialSubmit = (newTestimonial) => {
    // Add the new testimonial to the list
    setTestimonialsList([newTestimonial, ...testimonialsList])
    // Show success message
    setShowSuccessMessage(true)
    // Close dialog
    setIsDialogOpen(false)
    // Resume autoplay
    setIsAutoPlay(true)
  }

  // Get visible testimonials based on activeIndex and visibleCount
  const visibleTestimonials = testimonialsList.slice(activeIndex, activeIndex + visibleCount)

  // If we don't have enough testimonials to fill the visible count, add from the beginning
  if (visibleTestimonials.length < visibleCount) {
    const neededCount = visibleCount - visibleTestimonials.length
    visibleTestimonials.push(...testimonialsList.slice(0, neededCount))
  }

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-gray-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-50 rounded-bl-full opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-green-50 rounded-tr-full opacity-30"></div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-green-600 bg-green-50 rounded-full mb-3">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">What Our Clients Say</h2>
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
              className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-8 flex items-center justify-between"
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Thank you for sharing your experience! Your testimonial has been added.</span>
              </div>
              <button onClick={() => setShowSuccessMessage(false)} className="text-green-700 hover:text-green-900">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative" ref={containerRef}>
          {/* Custom carousel implementation */}
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
          </div>

          <div className="flex justify-center mt-10 space-x-4 items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
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
              {isAutoPlay ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-2 mb-8">
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
              className="border-green-500 text-green-600 hover:bg-green-50 group"
              onClick={openShareDialog}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Share Your Experience</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* Share Experience Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Share Your Experience</DialogTitle>
            <DialogDescription>
              We value your feedback! Please share your experience with Globeflight's services.
            </DialogDescription>
          </DialogHeader>

          <ShareExperienceForm onClose={closeShareDialog} onSubmit={handleTestimonialSubmit} />
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Testimonials
