'use client'

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, UserIcon, TagIcon, EyeIcon, ThumbsUp, MessageCircle, ClockIcon } from "lucide-react"
import Hero from "@/pages/Blog/sections/Hero";
import CallToActionSection from "@/components/CallToActionSection"
import ScrollOnSideSection from "@/components/ScrollOnSideSection"

// Use your backend API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export default function BlogGrid() {
  const [posts, setPosts] = useState([])
  const [featuredPost, setFeaturedPost] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const postsPerPage = 6
  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [subscribeMsg, setSubscribeMsg] = useState("")
  const [recentPosts, setRecentPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]); // <-- Add this line

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch blogs from backend
        const blogsRes = await axios.get(`${API_URL}/blogs/public`, {
          params: {
            page: currentPage,
            limit: postsPerPage,
            search: searchTerm
          }
        })
        setPosts(blogsRes.data.data.blogs)
        setTotalPages(blogsRes.data.data.pagination.pages)
        // Featured post (first featured, else most recent)
        const featured = blogsRes.data.data.blogs.find(b => b.isFeatured) || blogsRes.data.data.blogs[0]
        setFeaturedPost(featured)
        // Fetch categories
        const catRes = await axios.get(`${API_URL}/categories`)
        setCategories(catRes.data.data)
        // Fetch recent posts (first 5 published)
        const recentRes = await axios.get(`${API_URL}/blogs/public`, {
          params: { page: 1, limit: 5 }
        });
        setRecentPosts(recentRes.data.data.blogs || []);
        // Fetch related posts (for demo, just get 3 more blogs)
        const relatedRes = await axios.get(`${API_URL}/blogs/public`, {
          params: { page: 1, limit: 3 }
        });
        setRelatedPosts(relatedRes.data.data.blogs || []);
      } catch (err) {
        setError("Failed to load blog content")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage, searchTerm])

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  // Subscribe to newsletter
  const handleSubscribe = async (e) => {
    e.preventDefault()
    setSubscribeMsg("")
    try {
      await axios.post(`${API_URL}/blogs/newsletter/subscribe`, { email: subscribeEmail })
      setSubscribeMsg("Subscribed successfully!")
      setSubscribeEmail("")
    } catch (err) {
      setSubscribeMsg(err.response?.data?.message || "Subscription failed")
    }
  }

  const truncateText = (text, maxLength) => {
    const strippedText = text.replace(/<\/?[^>]+(>|$)/g, "")
    return strippedText.length > maxLength ? strippedText.slice(0, maxLength) + "..." : strippedText
  }

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="w-full h-48" />
              <CardContent className="p-4">
                <Skeleton className="w-3/4 h-4 mb-2" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero section with featured/recent blog */}
      <Hero>
        {featuredPost && (
          <div className="flex flex-col items-center py-12 text-center">
            {featuredPost.featuredImage && (
              <img
                src={
                  featuredPost.featuredImage.startsWith("http")
                    ? featuredPost.featuredImage
                    : `${API_URL.replace("/api", "")}/${featuredPost.featuredImage.replace(/^\/+/, "")}`
                }
                alt={featuredPost.title}
                className="object-cover w-full h-64 max-w-2xl mb-6 rounded-lg shadow-md"
              />
            )}
            <h2 className="mb-2 text-3xl font-bold">{featuredPost.title}</h2>
            <p className="mb-4 text-gray-700">{featuredPost.shortDescription}</p>
            <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm text-gray-600">
              <span className="flex items-center"><UserIcon className="w-4 h-4 mr-1" />{featuredPost.author?.fullName}</span>
              <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1" />{featuredPost.publishedAt && new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
              <span className="flex items-center"><EyeIcon className="w-4 h-4 mr-1" />{featuredPost.viewsCount}</span>
              <span className="flex items-center"><ThumbsUp className="w-4 h-4 mr-1" />{featuredPost.likesCount}</span>
              <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-1" />{featuredPost.commentCount || 0}</span>
              <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1" />{featuredPost.readTime} min read</span>
            </div>
            <Link to={`/blog/${featuredPost.slug}`}>
              <Button variant="default" className="bg-green-600 hover:bg-green-700">Read More</Button>
            </Link>
          </div>
        )}
      </Hero>
      <div className="container px-4 py-12 mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center text-green-800">Latest News & Insights</h1>

        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex max-w-md gap-2 mx-auto">
            <Input
              type="search"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow shadow-sm"
            />
            <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700">
              <SearchIcon className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </form>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id} className="flex flex-col overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg">
                  <div className="relative w-full h-48 sm:h-40 md:h-48">
                    {post.featuredImage && (
                      <img
                        src={
                          post.featuredImage.startsWith("http")
                            ? post.featuredImage
                            : `${API_URL.replace("/api", "")}/${post.featuredImage.replace(/^\/+/, "")}`
                        }
                        alt={post.title}
                        className="object-cover w-full h-full"
                      />
                    )}
                    <div className="absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-white bg-green-500">
                      {post.category?.name || 'Uncategorized'}
                    </div>
                  </div>
                  <CardContent className="flex-grow p-4">
                    <div className="flex flex-wrap items-center gap-4 mb-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="flex-shrink-0 w-4 h-4" />
                        <span className="truncate">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })
                            : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserIcon className="flex-shrink-0 w-4 h-4" />
                        <span className="truncate">{post.author?.fullName}</span>
                      </div>
                    </div>
                    <h2
                      className="mb-2 text-xl font-semibold text-green-800 line-clamp-2"
                    >
                      {post.title}
                    </h2>
                    <div
                      className="mb-4 text-gray-600 line-clamp-3"
                    >
                      {truncateText(post.shortDescription || "", 100)}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/blog/${post.slug}`} className="w-full">
                      <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                        Read More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-green-700 border-green-300 hover:bg-green-50"
              >
                <ChevronLeftIcon className="w-4 h-4 mr-2" />
                Previous
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "bg-green-600 hover:bg-green-700" : "text-green-700 border-green-300 hover:bg-green-50"}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="text-green-700 border-green-300 hover:bg-green-50"
              >
                Next
                <ChevronRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-1">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="text-white bg-green-600">
                <h3 className="text-xl font-semibold">Recent Posts</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 divide-y divide-gray-200">
                  {recentPosts.map((post) => (
                    <li key={post.id} className="pt-4 first:pt-0">
                      <Link to={`/blog/${post.slug}`} className="block transition-colors hover:text-green-600">
                        <h4 className="font-medium line-clamp-2">{post.title}</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })
                            : ""}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="text-white bg-green-600">
                <h3 className="text-xl font-semibold">Categories</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id} className="flex items-center">
                      <TagIcon className="w-4 h-4 mr-2 text-green-500" />
                      <Link to={`/category/${category.slug}`} className="transition-colors hover:text-green-600">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Newsletter subscribe section */}
        <div className="max-w-lg p-6 mx-auto my-12 text-center bg-white rounded-lg shadow">
          <h3 className="mb-2 text-xl font-bold">Subscribe to Our Blog</h3>
          <p className="mb-4 text-gray-600">Get the latest posts delivered to your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <Input
              type="email"
              placeholder="Your email"
              value={subscribeEmail}
              onChange={e => setSubscribeEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700">Subscribe</Button>
          </form>
          {subscribeMsg && <div className="mt-2 text-green-600">{subscribeMsg}</div>}
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold text-center text-green-800">Related Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="relative w-full h-48 sm:h-40 md:h-48">
                  {post.featuredImage && (
                    <img
                      src={
                        post.featuredImage.startsWith("http")
                          ? post.featuredImage
                          : `${API_URL.replace("/api", "")}/${post.featuredImage.replace(/^\/+/, "")}`
                      }
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <CardContent className="flex-grow p-4">
                  <div className="flex flex-wrap items-center gap-4 mb-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="flex-shrink-0 w-4 h-4" />
                      <span className="truncate">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserIcon className="flex-shrink-0 w-4 h-4" />
                      <span className="truncate">{post.author?.fullName}</span>
                    </div>
                  </div>
                  <h3
                    className="mb-2 text-lg font-semibold text-green-800 line-clamp-2"
                  >
                    {post.title}
                  </h3>
                  <div
                    className="mb-4 text-gray-600 line-clamp-3"
                  >
                    {truncateText(post.shortDescription || "", 80)}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/blog/${post.slug}`} className="w-full">
                    <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                      Read More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <CallToActionSection />
        <ScrollOnSideSection />
      </div>
    </div>
  )
}