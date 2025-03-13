'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BlogContent({ title, date, content, tags }) {
  // Function to process markdown-style formatting
  const [processedContent, setProcessedContent] = useState('');

  useEffect(() => {
    if (content) {
      // Process markdown-style content
      let htmlContent = content;
      
      // Process headers (## Header)
      htmlContent = htmlContent.replace(/## (.*?)($|\n)/g, '<h2 class="text-2xl font-bold my-4 text-white">$1</h2>$2');
      htmlContent = htmlContent.replace(/### (.*?)($|\n)/g, '<h3 class="text-xl font-bold my-3 text-white">$1</h3>$2');
      
      // Process bold (*** text ***)
      htmlContent = htmlContent.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold">$1</strong>');
      
      // Process italic (** text **)
      htmlContent = htmlContent.replace(/\*\*(.*?)\*\*/g, '<em class="italic">$1</em>');
      
      // Process links ([text](url))
      htmlContent = htmlContent.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
      
      // Process images (![alt](url))
      htmlContent = htmlContent.replace(/!\[(.*?)\]\((.*?)\)/g, '<div class="my-6"><img src="$2" alt="$1" class="max-w-full rounded-md shadow-lg" /></div>');
      
      // Process paragraphs (lines that don't start with a special character)
      htmlContent = htmlContent.replace(/^(?!<h|<div|<img|<ul|<ol|<li|<blockquote)(.+)$/gm, '<p class="mb-4 text-gray-300 leading-relaxed">$1</p>');
      
      // Process blockquotes
      htmlContent = htmlContent.replace(/> (.*?)($|\n)/g, '<blockquote class="pl-4 border-l-4 border-blue-500 italic text-gray-400 my-4">$1</blockquote>$2');
      
      // Process lists
      htmlContent = htmlContent.replace(/- (.*?)($|\n)/g, '<li class="ml-6 list-disc text-gray-300 mb-2">$1</li>$2');
      
      // Wrap list items in <ul>
      htmlContent = htmlContent.replace(/(<li.*?>.*?<\/li>(\n|$))+/g, '<ul class="my-4">$&</ul>');
      
      setProcessedContent(htmlContent);
    }
  }, [content]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeIn('up', 0.3)}
      className="max-w-4xl mx-auto"
    >
      {/* Blog Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">{title}</h1>
        <div className="flex justify-center items-center text-gray-400 text-sm">
          <time>{new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</time>
          
          {tags && tags.length > 0 && (
            <div className="flex items-center ml-6">
              <span className="mr-2">•</span>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Blog Content with improved styling */}
      <motion.div
        variants={fadeIn('up', 0.4)}
        className="prose prose-lg max-w-none bg-gray-800/50 p-8 rounded-lg shadow-lg border border-gray-700"
      >
        {/* Content column with line indicator */}
        <div className="relative">
          {/* Vertical line indicator */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-full"></div>
          
          {/* Content with left padding for the line */}
          <div className="pl-6" dangerouslySetInnerHTML={{ __html: processedContent }} />
        </div>
      </motion.div>
      
      {/* Back to blog link */}
      <motion.div
        variants={fadeIn('up', 0.5)}
        className="mt-12 text-center"
      >
        <Link
          href="/blog"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          ← Back to all posts
        </Link>
      </motion.div>
    </motion.div>
  );
}