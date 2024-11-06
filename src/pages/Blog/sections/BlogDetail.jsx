import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Hero from "@/pages/Blog/sections/Hero";
import CallToActionSection from "@/components/CallToActionSection";
import LearnMore from "@/pages/Blog/sections/LearnMore";
import Top from "@/components/Top";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, ClockIcon, TagIcon, ThumbsUp } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [previousPost, setPreviousPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Track the like count

  // Helper function to calculate reading time (assuming 200 words per minute)
  const calculateReadingTime = (content) => {
    const words = content.replace(/<\/?[^>]+(>|$)/g, "").split(" ").length;
    return Math.ceil(words / 200); // estimated reading time in minutes
  };

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const postRes = await axios.get(`https://globeflight.co.ke/wp-json/wp/v2/posts?slug=${slug}&_embed`);
        if (postRes.data.length > 0) {
          const fetchedPost = postRes.data[0];
          setPost(fetchedPost);

          // Fetch previous and next posts
          const prevNextRes = await Promise.all([
            axios.get(`https://globeflight.co.ke/wp-json/wp/v2/posts?per_page=1&order=desc&before=${fetchedPost.date}`),
            axios.get(`https://globeflight.co.ke/wp-json/wp/v2/posts?per_page=1&order=asc&after=${fetchedPost.date}`)
          ]);
          setPreviousPost(prevNextRes[0].data[0] || null);
          setNextPost(prevNextRes[1].data[0] || null);

          // Fetch related posts based on category
          const categoryId = fetchedPost.categories[0];
          const relatedRes = await axios.get(
            `https://globeflight.co.ke/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=3`
          );
          setRelatedPosts(relatedRes.data.filter((p) => p.id !== fetchedPost.id)); // Exclude current post

          // Simulate initial like count (in real app, get from API)
          setLikeCount(0); // Assuming the blog initially has 100 likes
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        setError("Failed to load post content.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [slug]);

  // Handle like button click
  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1); // Decrease like count if unliking
    } else {
      setLikeCount((prev) => prev + 1); // Increase like count if liking
    }
    setLiked(!liked);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const readingTime = calculateReadingTime(post.content.rendered);
  const publishDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const postUrl = window.location.href;

  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />

      {/* Back to Blog Button */}
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/blog')}>
          &larr; Back to Blog
        </Button>
      </div>

      <div className="text-center max-w-3xl mx-auto">
        {/* Category, Date, and Reading Time */}
        <div className="flex justify-center items-center gap-4 text-muted-foreground mb-4 text-sm">
          <span className="flex items-center gap-1">
            <TagIcon className="h-4 w-4" />
            {post._embedded['wp:term'][0][0].name}
          </span>
          <span className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            {publishDate}
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            {readingTime} min read
          </span>
        </div>

        {/* Featured Image */}
        {post._embedded['wp:featuredmedia'] && (
          <img
            src={post._embedded['wp:featuredmedia'][0].source_url}
            alt={post.title.rendered}
            className="w-full max-w-md mx-auto my-8 rounded-lg shadow-lg object-cover"
          />
        )}

        {/* Title and Content */}
        <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
        <div
          className="text-lg mb-8 text-justify"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>

      {/* Navigation for Previous and Next Post */}
      <div className="flex justify-between mt-6 text-center">
        {previousPost && (
          <Link
            to={`/blog/${previousPost.slug}`}
            className="block bg-green-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            &larr; {previousPost.title.rendered}
          </Link>
        )}
        {nextPost && (
          <Link
            to={`/blog/${nextPost.slug}`}
            className="block bg-green-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            {nextPost.title.rendered} &rarr;
          </Link>
        )}
      </div>

      {/* Related Posts Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Related Blogs</h2>
        <div className="grid sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {relatedPosts.map((relatedPost) => (
            <Link to={`/blog/${relatedPost.slug}`} key={relatedPost.id} className="block">
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                {relatedPost._embedded['wp:featuredmedia'] && (
                  <img
                    src={relatedPost._embedded['wp:featuredmedia'][0].source_url}
                    alt={relatedPost.title.rendered}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-lg font-bold mb-2 line-clamp-2">
                  {relatedPost.title.rendered}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {relatedPost.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Social Sharing and Like Button */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold mb-4">Share this blog:</h3>
        <div className="flex justify-center gap-4 mb-6">
          <a href={`https://wa.me/?text=${postUrl}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">WhatsApp</Button>
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${post.title.rendered}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Twitter</Button>
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Facebook</Button>
          </a>
          <a href={`https://www.linkedin.com/shareArticle?url=${postUrl}&title=${post.title.rendered}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">LinkedIn</Button>
          </a>
        </div>

        {/* Like Button with Count */}
        <Button 
          variant={liked ? "default" : "outline"} 
          onClick={handleLike} 
          className="flex items-center gap-2 bg-green-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        >
          <ThumbsUp className="h-4 w-4" />
          {liked ? "Liked" : "Like"} ({likeCount})
        </Button>
      </div>
      <LearnMore/>

      <CallToActionSection />
      <Top />
    </div>
  );
}
