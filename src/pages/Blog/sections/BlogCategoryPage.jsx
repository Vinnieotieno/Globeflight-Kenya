import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UserIcon } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const BlogCategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndPosts = async () => {
      setLoading(true);
      try {
        // Get all categories to find the ID for this slug
        const catRes = await axios.get(`${API_URL}/categories`);
        const found = catRes.data.data.find((c) => c.slug === slug);
        setCategory(found);

        if (found) {
          // Get blogs for this category
          const blogsRes = await axios.get(`${API_URL}/blogs/public`, {
            params: { category: found.id }
          });
          setPosts(blogsRes.data.data.blogs);
        } else {
          setPosts([]);
        }
      } catch {
        setPosts([]);
      }
      setLoading(false);
    };
    fetchCategoryAndPosts();
  }, [slug]);

  if (loading) {
    return <div className="py-12 text-center">Loading...</div>;
  }

  if (!category) {
    return <div className="py-12 text-center text-red-500">Category not found.</div>;
  }

  return (
    <div className="py-8">
      <h1 className="mb-8 text-3xl font-bold text-green-800 text-center">
        {category.name}
      </h1>
      {posts.length === 0 ? (
        <div className="text-center text-gray-500">No posts in this category.</div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                <h2 className="mb-2 text-xl font-semibold text-green-800 line-clamp-2">
                  {post.title}
                </h2>
                <div className="mb-4 text-gray-600 line-clamp-3">
                  {post.shortDescription}
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
  );
};

export default BlogCategoryPage;
