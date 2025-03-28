import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Text = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simplified image URL getter - uses only the working API endpoint
  const getImageUrl = async (imageId) => {
    if (!imageId) return null;
    try {
      const response = await axios.get(`http://localhost:5300/Image/get/${imageId}`);
      return response.data.Image?.image || null;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const normalizePosts = (data) => {
    if (!data) return [];
    if (data.Blog && Array.isArray(data.Blog)) return data.Blog;
    if (Array.isArray(data)) return data;
    if (data._id) return [data];
    return [];
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5300/Blog/get");
        const postsData = normalizePosts(response.data);
        
        // Enhance posts with image URLs using the working endpoint
        const postsWithImages = await Promise.all(
          postsData.map(async post => {
            const featuredImageUrl = await getImageUrl(post.FeaturedImage);
            const imageUrl = await getImageUrl(post.image);
            const fullImageUrl = await getImageUrl(post.fullImage);
            const bigImageUrl = await getImageUrl(post.bigImage);
            
            return {
              ...post,
              featuredImageUrl,
              imageUrl,
              fullImageUrl,
              bigImageUrl
            };
          })
        );
        
        setPosts(postsWithImages);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-12 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-12 text-xl text-red-700">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post._id} className="mb-12 pb-8 border-b border-gray-200">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title || 'Untitled Post'}</h1>
            
            {/* Featured Image */}
            {post.featuredImageUrl && (
              <div className="my-5">
                <img 
                  src={post.featuredImageUrl.startsWith('http') ? 
                       post.featuredImageUrl : 
                       `http://localhost:5300${post.featuredImageUrl}`}
                  alt={post.title || 'Featured image'}
                  className="w-52 h-52 rounded-lg"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
            
            {/* Post content */}
            <div 
              className="leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: post.text || '' }} 
            />
            
            {/* Image gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {post.imageUrl && (
                <img
                  src={post.imageUrl.startsWith('http') ? 
                       post.imageUrl : 
                       `http://localhost:5300${post.imageUrl}`}
                  alt={`${post.title || ''} - additional`}
                  className="w-full h-auto rounded"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              {post.fullImageUrl && (
                <img
                  src={post.fullImageUrl.startsWith('http') ? 
                       post.fullImageUrl : 
                       `http://localhost:5300${post.fullImageUrl}`}
                  alt={`${post.title || ''} - full`}
                  className="w-full h-auto rounded"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              {post.bigImageUrl && (
                <img
                  src={post.bigImageUrl.startsWith('http') ? 
                       post.bigImageUrl : 
                       `http://localhost:5300${post.bigImageUrl}`}
                  alt={`${post.title || ''} - large`}
                  className="w-full h-auto rounded"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 text-xl">
          No posts found
        </div>
      )}
    </div>
  );
};

export default Text;