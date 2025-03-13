'use client';

import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import Link from 'next/link';

export default function ProjectsPage() {
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
            <h1 className="text-4xl font-bold mb-6 text-white">My Projects</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              Here's a selection of projects I've built. Each one presented unique challenges and learning opportunities.
            </p>
          </motion.div>
          
          {/* Coming Soon Section */}
          <motion.div
            variants={fadeIn("up", 0.3)}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-16 text-center shadow-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1
              }}
              className="mb-6 w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </motion.div>
            
            <h2 className="text-3xl font-bold mb-4 text-white">Projects Coming Soon</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm currently working on some exciting new projects. 
              Check back soon to see my latest work showcased here.
            </p>
            
            <div className="w-full max-w-md mx-auto h-2 bg-gray-700 rounded-full mb-10 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
          
          {/* Contact CTA */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            className="mt-20 bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg p-8 shadow-xl text-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Have a project in mind?</h3>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects and creative ideas. If you have a project that needs development expertise, let's talk about how I can help bring your vision to life.
            </p>
            <Link 
              href="/contact"
              className="px-6 py-3 bg-white text-blue-800 hover:bg-gray-100 font-medium rounded-md transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}