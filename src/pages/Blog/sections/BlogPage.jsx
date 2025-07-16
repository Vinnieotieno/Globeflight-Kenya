'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, ChevronLeft, ChevronRight, Search, User as UserIcon, Tag as TagIcon, Eye as EyeIcon, ThumbsUp, MessageCircle, Clock as ClockIcon, TrendingUp, Sparkles, ArrowRight, Search as SearchIcon } from "lucide-react"
import { Helmet } from "react-helmet-async";

// API Configuration
const API_BASE = (() => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:5000/admin/api';
    } else {
      return 'https://globeflight.co.ke/admin/api';
    }
  }
  return 'http://localhost:5000/admin/api';
})();

// Simulated Link component for demo
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
)

export default function BlogGrid() {
  const [posts, setPosts] = useState([])
  const [featuredPost, setFeaturedPost] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchInput, setSearchInput] = useState(""); // for controlled input
  const postsPerPage = 6
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [subscribeLoading, setSubscribeLoading] = useState(false)
  const [subscribeError, setSubscribeError] = useState("")
  const [recentPosts, setRecentPosts] = useState([])
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const blogsRes = await axios.get(`${API_BASE}/blogs/public`, {
          params: {
            page: currentPage,
            limit: postsPerPage,
            search: searchTerm || undefined
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
        
        if (blogsRes.data.success && blogsRes.data.data) {
          setPosts(blogsRes.data.data.blogs || [])
          setTotalPages(blogsRes.data.data.pagination?.pages || 1)
          const featured = blogsRes.data.data.blogs?.find(b => b.isFeatured) || blogsRes.data.data.blogs?.[0]
          setFeaturedPost(featured)
        } else {
          setPosts([])
          setTotalPages(1)
          setFeaturedPost(null)
        }
        
        try {
          const catRes = await axios.get(`${API_BASE}/categories`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          })
          if (catRes.data.success && catRes.data.data) {
            setCategories(catRes.data.data)
          } else {
            setCategories([])
          }
        } catch (catErr) {
          console.error('Error fetching categories:', catErr)
          setCategories([])
        }
        
        try {
          const recentRes = await axios.get(`${API_BASE}/blogs/public`, {
            params: { page: 1, limit: 5 },
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          });
          if (recentRes.data.success && recentRes.data.data) {
            setRecentPosts(recentRes.data.data.blogs || []);
          } else {
            setRecentPosts([]);
          }
        } catch (recentErr) {
          console.error('Error fetching recent posts:', recentErr)
          setRecentPosts([]);
        }
        
        try {
          const relatedRes = await axios.get(`${API_BASE}/blogs/public`, {
            params: { page: 1, limit: 3 },
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          });
          if (relatedRes.data.success && relatedRes.data.data) {
            setRelatedPosts(relatedRes.data.data.blogs || []);
          } else {
            setRelatedPosts([]);
          }
        } catch (relatedErr) {
          console.error('Error fetching related posts:', relatedErr)
          setRelatedPosts([]);
        }
      } catch (err) {
        console.error('Error fetching blog data:', err)
        setError("Failed to load blog content. Please try again later.")
        setPosts([])
        setCategories([])
        setRecentPosts([])
        setRelatedPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage, searchTerm])

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subscribeEmail || !subscribeEmail.includes('@')) {
      setSubscribeError('Please enter a valid email address');
      return;
    }

    setSubscribeLoading(true);
    setSubscribeError('');
    
    try {
      const res = await axios.post(`${API_BASE}/blogs/newsletter/subscribe`, {
        email: subscribeEmail
      });
      
      if (res.data.success) {
        setShowSuccessMessage(true);
        setSubscribeEmail('');
        setTimeout(() => setShowSuccessMessage(false), 5000);
      }
    } catch (err) {
      setSubscribeError(err.response?.data?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setSubscribeLoading(false);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return ""
    const strippedText = text.replace(/<\/?[^>]+(>|$)/g, "")
    return strippedText.length > maxLength ? strippedText.slice(0, maxLength) + "..." : strippedText
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 py-16 mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="group">
                <Skeleton className="w-full h-64 rounded-2xl mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 mb-4 text-lg">{error}</div>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Helmet>
        <title>Blog | Latest News & Industry Updates | Globeflight Kenya</title>
        <meta name="description" content="Stay updated with Globeflight Kenya's latest news, shipping industry insights, logistics tips, and company announcements. Read our blog for expert advice and updates." />
        <meta name="keywords" content="Globeflight Kenya blog, logistics news, shipping updates, freight tips, industry insights, global shipping, Africa logistics, supply chain, warehousing, customs clearance, air freight, sea freight" />
        <link rel="canonical" href={`https://globeflight.co.ke/blog`} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://globeflight.co.ke/blog`} />
        <meta property="og:title" content="Blog | Latest News & Industry Updates | Globeflight Kenya" />
        <meta property="og:description" content="Stay updated with Globeflight Kenya's latest news, shipping industry insights, logistics tips, and company announcements." />
        <meta property="og:image" content="https://globeflight.co.ke/logo.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Latest News & Industry Updates | Globeflight Kenya" />
        <meta name="twitter:description" content="Stay updated with Globeflight Kenya's latest news, shipping industry insights, logistics tips, and company announcements." />
        <meta name="twitter:image" content="https://globeflight.co.ke/logo.png" />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Globeflight Kenya Blog",
            "description": "Latest news, updates, and insights from Globeflight Kenya.",
            "url": "https://globeflight.co.ke/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Globeflight Kenya",
              "logo": {
                "@type": "ImageObject",
                "url": "https://globeflight.co.ke/logo.png"
              }
            },
            "blogPost": posts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "image": post.featuredImage,
              "author": {
                "@type": "Person",
                "name": post.author?.fullName || 'Anonymous'
              },
              "datePublished": post.publishedAt,
              "url": `https://globeflight.co.ke/blog/${post.slug}`
            }))
          })}
        </script>
      </Helmet>
      {/* Featured Post Section */}
      {featuredPost && (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-blue-100/20 opacity-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/80 backdrop-blur-sm rounded-full text-green-800 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Featured Story
              </span>
            </div>
            
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <UserIcon className="w-4 h-4" />
                    {featuredPost.author?.fullName || 'Anonymous'}
                  </span>
                  <span className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.publishedAt && new Date(featuredPost.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <ClockIcon className="w-4 h-4" />
                    {featuredPost.readTime || 5} min
                  </span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {featuredPost.title}
                </h2>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {featuredPost.shortDescription}
                </p>
                
                <div className="flex items-center gap-6">
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg transform hover:scale-105 transition-all duration-200 px-8 py-3 text-lg rounded-full">
                      Read Full Article
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      {featuredPost.viewsCount || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {featuredPost.likesCount || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {featuredPost.commentCount || 0}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                {featuredPost.featuredImage && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-20"></div>
                    <img
                      src={
                        featuredPost.featuredImage.startsWith("http")
                          ? featuredPost.featuredImage
                          : `${API_BASE.replace("/admin/api", "")}/${featuredPost.featuredImage.replace(/^\/+/, "")}`
                      }
                      alt={featuredPost.title}
                      className="relative w-full h-[400px] object-cover rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-green-800 shadow-lg">
                        {featuredPost.category?.name || 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container px-4 py-16 mx-auto">
        {/* Search Section */}
        <section className="max-w-2xl mx-auto mb-16">
          <form className="relative" onSubmit={handleSearch} role="search" aria-label="Blog Search">
            <Input
              type="search"
              placeholder="Search articles, topics, authors..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-6 pr-32 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
              aria-label="Search blog posts"
            />
            <Button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-6 py-2 shadow-lg"
              aria-label="Search"
            >
              <SearchIcon className="w-4 h-4 mr-2" />
              Search
            </Button>
          </form>
        </section>

        <div className="grid gap-12 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span>Trending Now</span>
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-3xl">
                <div className="max-w-md mx-auto">
                  <SearchIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-xl text-gray-500 mb-6">No articles found</p>
                  {searchTerm && (
                    <Button 
                      onClick={() => setSearchTerm("")} 
                      variant="outline" 
                      className="border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-full"
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article key={post.id} className="group cursor-pointer">
                    <Link to={`/blog/${post.slug}`}>
                      <div className="relative overflow-hidden rounded-2xl mb-4">
                        {post.featuredImage && (
                          <img
                            src={
                              post.featuredImage.startsWith("http")
                                ? post.featuredImage
                                : `${API_BASE.replace("/admin/api", "")}/${post.featuredImage.replace(/^\/+/, "")}`
                            }
                            alt={post.title}
                            className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                            {post.category?.name || 'Uncategorized'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {post.readTime || 5} min
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 line-clamp-2">
                          {truncateText(post.shortDescription || "", 100)}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <UserIcon className="w-3 h-3" />
                            <span>{post.author?.fullName || 'Anonymous'}</span>
                          </div>
                          <span className="text-green-600 font-semibold text-sm group-hover:gap-2 flex items-center transition-all duration-200">
                            Read more
                            <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {posts.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="rounded-full border-2 hover:bg-green-50 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "ghost"}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full ${
                        currentPage === i + 1 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "hover:bg-green-50"
                      }`}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="rounded-full border-2 hover:bg-green-50 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:col-span-1">
            {/* Recent Posts */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-green-600 to-green-700">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  Recent Posts
                </h3>
              </div>
              <div className="p-6">
                {recentPosts.length === 0 ? (
                  <p className="text-gray-500 text-sm">No recent posts available.</p>
                ) : (
                  <ul className="space-y-4">
                    {recentPosts.slice(0, 5).map((post) => (
                      <li key={post.id} className="group">
                        <Link to={`/blog/${post.slug}`} className="block">
                          <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-200 line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-green-600 to-green-700">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <TagIcon className="w-5 h-5" />
                  Categories
                </h3>
              </div>
              <div className="p-6">
                {categories.length === 0 ? (
                  <p className="text-gray-500 text-sm">No categories available.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Link 
                        key={category.id} 
                        to={`/category/${category.slug}`}
                        className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-full text-sm font-medium transition-colors duration-200"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-lg p-6 text-white">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Stay Updated</h3>
                <p className="text-white/90 text-sm">Get the latest insights delivered to your inbox</p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={subscribeEmail}
                    onChange={e => setSubscribeEmail(e.target.value)}
                    required
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-green-700 hover:bg-gray-100 font-semibold"
                  >
                    Subscribe Now
                  </Button>
                </form>
                {subscribeError && (
                  <p className="text-sm text-red-500 mt-2">{subscribeError}</p>
                )}
                {showSuccessMessage && (
                  <p className="text-sm text-green-500 mt-2">Subscription successful!</p>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">You Might Also Like</h2>
              <p className="text-gray-600">Discover more stories that matter</p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <Link to={`/blog/${post.slug}`}>
                    {post.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={
                            post.featuredImage.startsWith("http")
                              ? post.featuredImage
                              : `${API_BASE.replace("/admin/api", "")}/${post.featuredImage.replace(/^\/+/, "")}`
                          }
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserIcon className="w-3 h-3" />
                          {post.author?.fullName || 'Anonymous'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {truncateText(post.shortDescription || "", 80)}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}