'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import Link from 'next/link';

export default function BlogCard({ post, index }) {
  return (
    <motion.div
      variants={fadeIn("up", 0.3 + index * 0.1)}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-blue-400">{post.date}</span>
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
  );
}