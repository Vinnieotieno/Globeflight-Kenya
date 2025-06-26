'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Tag, ThumbsUp, ChevronLeft, ChevronRight, Share2, MessageCircle, User, Eye, Bookmark, MoreHorizontal, Twitter, Facebook, Linkedin, Link2 } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"

// API Configuration
const API_BASE = (() => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:5000/api';
    } else {
      return 'https://globeflight.co.ke/api';
    }
  }
  return 'http://localhost:5000/api';
})();

// Simulated components
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
)

export default function BlogDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [comments, setComments] = useState([])
  const [commentForm, setCommentForm] = useState({ name: "", email: "", comment: "" })
  const [commentMsg, setCommentMsg] = useState("")
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get(`${API_BASE}/blogs/public/${slug}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
        
        if (res.data.success && res.data.data) {
          setPost(res.data.data)
          setLikeCount(res.data.data.likesCount || 0)
          setComments(res.data.data.comments || [])
          setRelatedPosts(res.data.data.relatedPosts || [])
        } else {
          setError("Blog post not found.")
        }
      } catch (err) {
        console.error('Error fetching blog post:', err)
        if (err.response?.status === 404) {
          setError("Blog post not found.")
        } else {
          setError("Failed to load blog post. Please try again later.")
        }
      } finally {
        setLoading(false)
      }
    }
    fetchPostData()
  }, [slug])

  useEffect(() => {
    if (post) {
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
      setLiked(!!likedBlogs[post.id]);
      const bookmarkedBlogs = JSON.parse(localStorage.getItem("bookmarkedBlogs") || "{}");
      setBookmarked(!!bookmarkedBlogs[post.id]);
    }
  }, [slug, post?.id])

  const handleLike = async () => {
    if (liked || !post) return;
    try {
      await axios.post(`${API_BASE}/blogs/public/${post.id}/like`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      setLiked(true)
      setLikeCount(likeCount + 1)
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
      likedBlogs[post.id] = true;
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
    } catch (err) {
      console.error('Error liking blog:', err)
    }
  }

  const handleBookmark = () => {
    if (!post) return;
    const bookmarkedBlogs = JSON.parse(localStorage.getItem("bookmarkedBlogs") || "{}");
    if (bookmarked) {
      delete bookmarkedBlogs[post.id];
    } else {
      bookmarkedBlogs[post.id] = true;
    }
    localStorage.setItem("bookmarkedBlogs", JSON.stringify(bookmarkedBlogs));
    setBookmarked(!bookmarked);
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    setCommentMsg("")
    if (!post) return
    
    try {
      await axios.post(`${API_BASE}/blogs/public/${post.id}/comments`, commentForm, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      setCommentMsg("Comment submitted for approval.")
      setCommentForm({ name: "", email: "", comment: "" })
    } catch (err) {
      console.error('Error submitting comment:', err)
      setCommentMsg(err.response?.data?.message || "Failed to submit comment. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Skeleton className="h-12 w-32 mb-8 rounded-full" />
          <Skeleton className="h-[400px] w-full mb-8 rounded-3xl" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xl text-gray-600 mb-6">{error || "Blog post not found."}</p>
          <Button 
            onClick={() => navigate('/blog')}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg rounded-full px-8"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  const readingTime = post.readTime || 5
  const publishDate = post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section with Featured Image */}
      <div className="relative">
        {post.featuredImage && (
          <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
            <img
              src={
                post.featuredImage.startsWith("http")
                  ? post.featuredImage
                  : `${API_BASE.replace("/api", "")}/${post.featuredImage.replace(/^\/+/, "")}`
              }
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Back Button */}
            <div className="absolute top-8 left-8">
              <Button
                onClick={() => navigate('/blog')}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 rounded-full px-6 py-3 transition-all duration-200"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Button>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <div className="container mx-auto max-w-5xl">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-medium">
                      <Tag className="h-4 w-4" />
                      {post.category?.name || 'Uncategorized'}
                    </span>
                    <div className="flex items-center gap-6 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {publishDate || 'Not published'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {readingTime} min read
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.viewsCount || 0} views
                      </span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    {post.title}
                  </h1>
                  
                  <div className="flex items-center gap-4">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${post.author?.fullName || 'Anonymous'}&background=22c55e&color=fff`}
                      alt={post.author?.fullName || 'Anonymous'}
                      className="w-12 h-12 rounded-full border-2 border-white/50"
                    />
                    <div>
                      <p className="text-white font-medium">{post.author?.fullName || 'Anonymous'}</p>
                      <p className="text-white/70 text-sm">Author</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* If no featured image, show a styled header */}
        {!post.featuredImage && (
          <div className="bg-gradient-to-br from-green-600 to-green-700 text-white py-20">
            <div className="container mx-auto max-w-5xl px-4">
              <Button
                onClick={() => navigate('/blog')}
                className="mb-8 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 rounded-full"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Button>
              
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium">
                  <Tag className="h-4 w-4" />
                  {post.category?.name || 'Uncategorized'}
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-white/80">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author?.fullName || 'Anonymous'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {publishDate || 'Not published'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {readingTime} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Floating Action Bar */}
        <div className="sticky top-4 z-50 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-100 p-2 flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <Button
                variant={liked ? "default" : "ghost"}
                onClick={handleLike}
                className={`rounded-full ${liked ? 'bg-green-600 text-white hover:bg-green-700' : 'hover:bg-green-50'}`}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                {likeCount}
              </Button>
              
              <Button
                variant="ghost"
                className="rounded-full hover:bg-green-50"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {comments.length}
              </Button>
              
              <Button
                variant={bookmarked ? "default" : "ghost"}
                onClick={handleBookmark}
                className={`rounded-full ${bookmarked ? 'bg-green-600 text-white hover:bg-green-700' : 'hover:bg-green-50'}`}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCommentMsg("Link copied!");
                  setTimeout(() => setCommentMsg(""), 2000);
                }}
                className="rounded-full hover:bg-green-50"
              >
                <Link2 className="h-4 w-4" />
              </Button>
              
              <div className="relative group">
                <Button variant="ghost" className="rounded-full hover:bg-green-50">
                  <Share2 className="h-4 w-4" />
                </Button>
                
                {/* Share dropdown */}
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Twitter className="h-4 w-4" /> Twitter
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Facebook className="h-4 w-4" /> Facebook
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:italic
              prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-green-800
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-2xl prose-pre:shadow-lg
              prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2
              prose-strong:text-gray-900 prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Author Bio */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 mb-12 border border-green-100">
          <div className="flex items-start gap-6">
            <img 
              src={`https://ui-avatars.com/api/?name=${post.author?.fullName || 'Anonymous'}&background=22c55e&color=fff&size=128`}
              alt={post.author?.fullName || 'Anonymous'}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">About the Author</h3>
              <p className="text-lg font-medium text-green-700 mb-3">{post.author?.fullName || 'Anonymous'}</p>
              <p className="text-gray-600 leading-relaxed">
                {post.author?.bio || 'Contributing writer at Globeflight Kenya, sharing insights and stories that matter to our community.'}
              </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <section className="mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-600" />
              Comments ({comments.length})
            </h2>
            
            {comments.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <ul className="space-y-4 mb-8">
                {comments.map((c) => (
                  <li key={c.id} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start gap-4">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${c.name}&background=e5e7eb&color=374151`}
                        alt={c.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{c.name}</h4>
                          <time className="text-sm text-gray-500">
                            {new Date(c.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </time>
                        </div>
                        <p className="text-gray-700">{c.comment}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            
            {/* Comment Form */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Leave a Comment</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={commentForm.name}
                    onChange={e => setCommentForm(f => ({ ...f, name: e.target.value }))}
                    required
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-200"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={commentForm.email}
                    onChange={e => setCommentForm(f => ({ ...f, email: e.target.value }))}
                    required
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-200"
                  />
                </div>
                <textarea
                  placeholder="Share your thoughts..."
                  value={commentForm.comment}
                  onChange={e => setCommentForm(f => ({ ...f, comment: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-200 resize-none"
                  rows={4}
                />
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={handleCommentSubmit}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-8 py-3 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Post Comment
                  </Button>
                  {commentMsg && (
                    <p className={`text-sm ${commentMsg.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
                      {commentMsg}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">You Might Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                  <article className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    {relatedPost.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={
                            relatedPost.featuredImage.startsWith("http")
                              ? relatedPost.featuredImage
                              : `${API_BASE.replace("/api", "")}/${relatedPost.featuredImage.replace(/^\/+/, "")}`
                          }
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {relatedPost.shortDescription}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {relatedPost.publishedAt && new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {relatedPost.readTime || 5} min
                        </span>
                      </div>
                    </CardContent>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}