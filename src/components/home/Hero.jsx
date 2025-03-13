'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fadeIn, staggerContainer } from '@/lib/animations';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = [
    'Cyber Security Engineer',
    'Software Engineer',
    'Systems Administrator'
  ];

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    
    const timeout = setTimeout(() => {
      // Typing effect
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        setTypingSpeed(30);
        
        // If word is complete
        if (displayText === currentTitle) {
          // Wait before deleting
          setTypingSpeed(1000);
          setIsDeleting(true);
        }
      } 
      // Deleting effect
      else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        setTypingSpeed(50);
        
        // If word is deleted
        if (displayText === '') {
          setIsDeleting(false);
          setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, titles, typingSpeed]);

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden min-h-screen flex items-center">
      {/* Background gradient element */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      
      {/* Background particle or grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:40px_40px] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Content */}
          <motion.div
            variants={staggerContainer(0.1, 0.3)}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start text-left md:w-1/2"
          >
            <motion.div
              variants={fadeIn("down", 0.3)}
              className="mb-4 inline-block relative">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-lg sm:text-xl font-medium">
                Hello, my name is
              </span>
            </motion.div>
            
            <motion.h1
              variants={fadeIn("up", 0.4)}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
                Rio
              </span>
            </motion.h1>
            
            <motion.div
              variants={fadeIn("up", 0.5)}
              className="h-16 flex items-center"
            >
              <h2 className="text-xl md:text-3xl font-medium mb-8 text-blue-400">
                I'm a <span className="text-gradient after:content-['|'] after:ml-1 after:animate-pulse">{displayText}</span>
              </h2>
            </motion.div>
            
            <motion.p
              variants={fadeIn("up", 0.6)}
              className="text-gray-300 mb-10 text-lg max-w-xl"
            >
              Passionate about security, programming, and building robust systems.
            </motion.p>
            
            <motion.div
              variants={fadeIn("up", 0.7)}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link 
                href="/projects"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                View Projects
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-3 bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/30 font-medium rounded-md hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right side - Profile Image */}
          <motion.div
            variants={fadeIn("left", 0.5)}
            initial="hidden"
            animate="show"
            className="md:w-1/2 flex justify-center md:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* You need to add your profile image to the public directory */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-[40px] opacity-25 animate-pulse"></div>
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-blue-500/30">
                {/* Replace the src with your actual profile image path */}
                <Image
                  src="/images/profile1.png"
                  alt="Profile Photo"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  className="rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          variants={fadeIn("up", 0.9)}
          initial="hidden"
          animate="show"
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;