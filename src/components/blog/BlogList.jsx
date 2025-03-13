'use client';

import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import BlogCard from './BlogCard';

export default function BlogList({ posts }) {
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
          
          {/* Blog Posts Grid */}
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))
            ) : (
              <motion.div
                variants={fadeIn("up", 0.3)}
                className="col-span-3 text-center py-12"
              >
                <p className="text-gray-400">No blog posts found.</p>
              </motion.div>
            )}
          </motion.div>
          
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