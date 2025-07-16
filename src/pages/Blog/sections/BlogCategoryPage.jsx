'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar as CalendarIcon, User as UserIcon, ArrowLeft, Tag as TagIcon } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
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

const BlogCategoryPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategoryAndPosts = async () => {
      setLoading(true)
      setError(null)
      try {
        // Fetch category details
        const categoryRes = await axios.get(`${API_BASE}/categories`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
        
        const foundCategory = categoryRes.data.data?.find(cat => cat.slug === slug)
        if (!foundCategory) {
          setError("Category not found.")
          setLoading(false)
          return
        }
        
        setCategory(foundCategory)
        
        // Fetch posts for this category
        const postsRes = await axios.get(`${API_BASE}/blogs/public`, {
          params: { 
            category: slug,
            page: 1, 
            limit: 20 
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
        
        if (postsRes.data.success && postsRes.data.data) {
          setPosts(postsRes.data.data.blogs || [])
        } else {
          setPosts([])
        }
      } catch (err) {
        console.error('Error fetching category data:', err)
        setError("Failed to load category content. Please try again later.")
        setCategory(null)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    
    if (slug) {
      fetchCategoryAndPosts()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 py-16 mx-auto">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-64 mb-8" />
            <Skeleton className="h-6 w-full mb-4" />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xl text-gray-600 mb-6">{error || "Category not found."}</p>
          <Button 
            onClick={() => navigate('/blog')}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg rounded-full px-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  // SEO meta
  const pageTitle = `${category.name} Updates | Blog | Globeflight Kenya`;
  const pageDesc = category.description || `Read the latest updates about ${category.name} from Globeflight Kenya.`;
  const canonicalUrl = `https://globeflight.co.ke/blog/category/${category.slug}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={`Globeflight Kenya blog, ${category.name}, logistics, shipping, Africa logistics, supply chain`} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content="https://globeflight.co.ke/logo.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content="https://globeflight.co.ke/logo.png" />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": category.name,
            "description": pageDesc,
            "url": canonicalUrl,
            "mainEntity": posts.map(post => ({
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
        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://globeflight.co.ke/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://globeflight.co.ke/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": category.name,
                "item": `https://globeflight.co.ke/blog/category/${category.slug}`
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="container px-4 py-16 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button
              onClick={() => navigate('/blog')}
              variant="ghost"
              className="mb-6 text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TagIcon className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {category.name}
              </h1>
            </div>
            
            {category.description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
            
            <div className="mt-6 text-sm text-gray-500">
              {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
            </div>
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <div className="max-w-md mx-auto">
                <TagIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500 mb-6">No articles found in this category</p>
                <Button 
                  onClick={() => navigate('/blog')} 
                  variant="outline" 
                  className="border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-full"
                >
                  Browse All Articles
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
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
                        <span className="truncate">{post.author?.fullName || 'Anonymous'}</span>
                      </div>
                    </div>
                    <h2 className="mb-2 text-xl font-semibold text-green-800 line-clamp-2">
                      {post.title}
                    </h2>
                    <div className="mb-4 text-gray-600 line-clamp-3">
                      {post.shortDescription || "No description available."}
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
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogCategoryPage;
