'use client';

import { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import Link from 'next/link';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        // Try to fetch from API first
        const response = await fetch('/api/blog');
        
        if (response.ok) {
          const data = await response.json();
          if (data.posts && Array.isArray(data.posts)) {
            // Sort by date (newest first)
            const sortedPosts = [...data.posts]
              .filter(post => post.published !== false)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            setBlogPosts(sortedPosts);
          }
        } else {
          // Fallback to sample data if API fails
          setBlogPosts([
            {
              id: 1,
              slug: 'getting-started-with-nextjs',
              title: 'Getting Started with Next.js',
              createdAt: '2023-03-01T00:00:00.000Z',
              excerpt: 'Learn how to set up a Next.js project and create your first pages.',
              tags: ['Next.js', 'React', 'Tutorial']
            },
            {
              id: 2,
              slug: 'mastering-css-grid',
              title: 'Mastering CSS Grid Layout',
              createdAt: '2023-02-15T00:00:00.000Z',
              excerpt: 'A comprehensive guide to using CSS Grid for modern web layouts.',
              tags: ['CSS', 'Web Development', 'Design']
            },
            {
              id: 3,
              slug: 'react-best-practices',
              title: 'React Best Practices in 2023',
              createdAt: '2023-01-20T00:00:00.000Z',
              excerpt: 'Stay up to date with the latest React patterns and practices.',
              tags: ['React', 'JavaScript', 'Best Practices']
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
        // Fallback to sample data on error
        setBlogPosts([
          {
            id: 1,
            slug: 'getting-started-with-nextjs',
            title: 'Getting Started with Next.js',
            createdAt: '2023-03-01T00:00:00.000Z',
            excerpt: 'Learn how to set up a Next.js project and create your first pages.',
            tags: ['Next.js', 'React', 'Tutorial']
          },
          {
            id: 2,
            slug: 'mastering-css-grid',
            title: 'Mastering CSS Grid Layout',
            createdAt: '2023-02-15T00:00:00.000Z',
            excerpt: 'A comprehensive guide to using CSS Grid for modern web layouts.',
            tags: ['CSS', 'Web Development', 'Design']
          },
          {
            id: 3,
            slug: 'react-best-practices',
            title: 'React Best Practices in 2023',
            createdAt: '2023-01-20T00:00:00.000Z',
            excerpt: 'Stay up to date with the latest React patterns and practices.',
            tags: ['React', 'JavaScript', 'Best Practices']
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1, 0.1)}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div
            variants={fadeIn("down", 0.2)}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-6 text-white">Blog</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              Explore my thoughts, tutorials, and insights on web development, design, and technology.
            </p>
          </motion.div>
          
          {/* Loading state */}
          {loading && (
            <motion.div variants={fadeIn("up", 0.3)} className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </motion.div>
          )}
          
          {/* Error state */}
          {error && (
            <motion.div variants={fadeIn("up", 0.3)} className="text-center py-12">
              <p className="text-red-400 mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 rounded-md text-white">
                Try Again
              </button>
            </motion.div>
          )}
          
          {/* Blog Posts Grid */}
          {!loading && !error && (
            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogPosts.length > 0 ? (
                blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={fadeIn("up", 0.3 + index * 0.1)}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm text-blue-400">
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {post.tags && post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <h2 className="text-xl font-bold mb-3 text-white">{post.title}</h2>
                      <p className="text-gray-300 mb-5">{post.excerpt}</p>
                      
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-block text-blue-400 font-medium hover:text-blue-300 transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div variants={fadeIn("up", 0.3)} className="col-span-3 text-center py-12">
                  <p className="text-gray-400">No blog posts found.</p>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {/* Newsletter Signup */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            className="mt-20 bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg p-8 shadow-xl"
          >
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-white">Stay Updated</h3>
              <p className="text-gray-200 mb-6">
                Subscribe to my newsletter to receive updates on new articles, tutorials, and projects.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-gray-700 text-white"
                />
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}