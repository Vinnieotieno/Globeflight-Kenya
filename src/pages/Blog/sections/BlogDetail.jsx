'use client'

import React, { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Hero from "@/pages/Blog/sections/Hero";
import CallToActionSection from "@/components/CallToActionSection"
import LearnMore from "@/pages/Blog/sections/LearnMore";
import ScrollOnSideSection from "@/components/ScrollOnSideSection";
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, TagIcon, ThumbsUp, ChevronLeft, ChevronRight, Share2, MessageCircle, UserIcon } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

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

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true)
      try {
        // Fetch blog from backend
        const res = await axios.get(`${API_URL}/blogs/public/${slug}`)
        setPost(res.data.data)
        setLikeCount(res.data.data.likesCount)
        setComments(res.data.data.comments || [])
        setRelatedPosts(res.data.data.relatedPosts || [])
      } catch (err) {
        setError("Failed to load post content.")
      } finally {
        setLoading(false)
      }
    }
    fetchPostData()
  }, [slug])

  useEffect(() => {
    // Check localStorage for like status
    if (post) {
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
      setLiked(!!likedBlogs[post.id]);
    }
  }, [slug, post?.id])

  const handleLike = async () => {
    if (liked) return; // Prevent multiple likes from same device
    try {
      await axios.post(`${API_URL}/blogs/public/${post.id}/like`)
      setLiked(true)
      setLikeCount(likeCount + 1)
      // Store like in localStorage
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
      likedBlogs[post.id] = true;
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
    } catch {}
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    setCommentMsg("")
    try {
      await axios.post(`${API_URL}/blogs/public/${post.id}/comments`, commentForm)
      setCommentMsg("Comment submitted for approval.")
      setCommentForm({ name: "", email: "", comment: "" })
    } catch (err) {
      setCommentMsg(err.response?.data?.message || "Failed to submit comment.")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )
  }

  if (error) return <div className="text-red-500 text-center py-8">{error}</div>

  const readingTime = post.readTime
  const publishDate = post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-sans">
      <Hero />
      {/* Increase max-w-3xl to max-w-5xl and center */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Button
          variant="outline"
          onClick={() => navigate('/blog')}
          className="mb-8 rounded-full border-green-200 bg-white shadow hover:bg-green-50 transition"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Button>
        <article className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-green-100 transition hover:shadow-3xl">
          {post.featuredImage && (
            <img
              src={
                post.featuredImage.startsWith("http")
                  ? post.featuredImage
                  : `${API_URL.replace("/api", "")}/${post.featuredImage.replace(/^\/+/, "")}`
              }
              alt={post.title}
              className="w-full h-72 object-cover rounded-2xl mb-8 shadow-lg border border-green-100"
              style={{ objectPosition: "center" }}
            />
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-900 leading-tight tracking-tight font-display">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
              <TagIcon className="h-4 w-4" />
              {post.category?.name}
            </span>
            <span className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
              <CalendarIcon className="h-4 w-4" />
              {publishDate}
            </span>
            <span className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
              <ClockIcon className="h-4 w-4" />
              {readingTime} min read
            </span>
            <span className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
              <ThumbsUp className="h-4 w-4" />
              {likeCount}
            </span>
            <span className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
              <MessageCircle className="h-4 w-4" />
              {comments.length}
            </span>
            <span className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
              <UserIcon className="h-4 w-4" />
              {post.author?.fullName}
            </span>
          </div>
          <div
            className="prose prose-lg max-w-none mb-12 text-gray-800 font-normal leading-relaxed prose-headings:font-semibold prose-headings:text-green-900 prose-a:text-green-700 prose-a:underline hover:prose-a:text-green-900 prose-img:rounded-xl prose-img:shadow"
            style={{
              fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
              fontSize: "1.15rem"
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-t border-b border-gray-100 py-6 mb-8 gap-4">
            <Button
              variant={liked ? "default" : "outline"}
              onClick={handleLike}
              className={`flex items-center gap-2 rounded-full px-6 py-2 font-semibold shadow-sm transition ${liked ? 'bg-green-500 text-white' : 'text-green-500 border-green-200 hover:bg-green-50'}`}
            >
              <ThumbsUp className="h-4 w-4" />
              {liked ? "Liked" : "Like"} ({likeCount})
            </Button>
            {/* Social Share Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500">Share:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 bg-green-50 hover:bg-green-100 text-green-600 transition"
                title="Share on WhatsApp"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 bg-blue-50 hover:bg-blue-100 text-blue-500 transition"
                title="Share on Twitter"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 transition"
                title="Share on Facebook"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 bg-blue-50 hover:bg-blue-100 text-blue-800 transition"
                title="Share on LinkedIn"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <button
                type="button"
                className="rounded-full p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
                title="Copy link"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCommentMsg("Link copied!");
                  setTimeout(() => setCommentMsg(""), 2000);
                }}
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </article>
        {/* Comments section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-green-800 font-display">Comments</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500 mb-4">No comments yet.</p>
          ) : (
            <ul className="mb-6">
              {comments.map((c) => (
                <li key={c.id} className="mb-4 border-b pb-2">
                  <div className="font-semibold text-green-800">{c.name}</div>
                  <div className="text-gray-500 text-xs">{new Date(c.createdAt).toLocaleString()}</div>
                  <div className="mt-1 text-gray-700">{c.comment}</div>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={handleCommentSubmit} className="space-y-3 bg-green-50 p-6 rounded-xl shadow-inner">
            <input
              type="text"
              placeholder="Your name"
              value={commentForm.name}
              onChange={e => setCommentForm(f => ({ ...f, name: e.target.value }))}
              required
              className="border border-green-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            />
            <input
              type="email"
              placeholder="Your email"
              value={commentForm.email}
              onChange={e => setCommentForm(f => ({ ...f, email: e.target.value }))}
              required
              className="border border-green-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            />
            <textarea
              placeholder="Your comment"
              value={commentForm.comment}
              onChange={e => setCommentForm(f => ({ ...f, comment: e.target.value }))}
              required
              className="border border-green-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              rows={4}
            />
            <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700 rounded-full px-8 py-2 font-semibold text-white shadow">
              Submit Comment
            </Button>
            {commentMsg && <div className="mt-2 text-green-600">{commentMsg}</div>}
          </form>
        </section>
        {/* Related posts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-800 font-display">Related Posts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow rounded-2xl border border-green-100">
                <Link to={`/blog/${relatedPost.slug}`}>
                  {relatedPost.featuredImage && (
                    <img
                      src={
                        relatedPost.featuredImage.startsWith("http")
                          ? relatedPost.featuredImage
                          : `${API_URL.replace("/api", "")}/${relatedPost.featuredImage.replace(/^\/+/, "")}`
                      }
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover rounded-t-2xl"
                    />
                  )}
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 text-green-700 font-display">{relatedPost.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{relatedPost.shortDescription}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <LearnMore />
      <CallToActionSection />
      <ScrollOnSideSection />
    </div>
  )
}