// File: src/data/projects.js
export const projects = [
    {
      id: "project-1",
      title: "Secure Chat Application",
      shortDescription: "End-to-end encrypted messaging platform built with React and Node.js",
      description: "A fully secure chat application featuring end-to-end encryption, message expiration, and secure user authentication. Built using React for the frontend and Node.js for the backend, with MongoDB for data storage.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Crypto.js"],
      images: [
        "/images/projects/project1/cover.jpg",
        "/images/projects/project1/image1.jpg",
        "/images/projects/project1/image2.jpg",
      ],
      category: "Web Application",
      github: "https://github.com/yourusername/secure-chat",
      liveDemo: "https://secure-chat-demo.example.com",
      featured: true
    },
    {
      id: "project-2",
      title: "Vulnerability Scanner",
      shortDescription: "Automated web application security scanner built with Python",
      description: "An automated security tool designed to scan web applications for common vulnerabilities such as SQL injection, XSS, and CSRF. Features a user-friendly interface for configuring scans and viewing detailed reports.",
      technologies: ["Python", "Flask", "SQLite", "Docker", "BeautifulSoup"],
      images: [
        "/images/projects/project2/cover.jpg",
        "/images/projects/project2/image1.jpg",
        "/images/projects/project2/image2.jpg",
      ],
      category: "Security Tool",
      github: "https://github.com/yourusername/vulnerability-scanner",
      liveDemo: null,
      featured: true
    },
    {
      id: "project-3",
      title: "E-commerce Platform",
      shortDescription: "Full-featured online store built with Next.js and Tailwind CSS",
      description: "A modern e-commerce platform with product management, user authentication, shopping cart, and secure checkout functionality. Built with Next.js for server-side rendering and optimal performance.",
      technologies: ["Next.js", "TailwindCSS", "Stripe", "MongoDB", "NextAuth.js"],
      images: [
        "/images/projects/project3/cover.jpg",
        "/images/projects/project3/image1.jpg",
        "/images/projects/project3/image2.jpg",
      ],
      category: "Web Application",
      github: "https://github.com/yourusername/ecommerce-platform",
      liveDemo: "https://ecommerce-demo.example.com",
      featured: true
    },
    {
      id: "project-4",
      title: "Network Traffic Analyzer",
      shortDescription: "Real-time network monitoring tool with anomaly detection",
      description: "A tool for monitoring network traffic in real-time, detecting anomalies, and generating alerts for suspicious activities. Includes a dashboard for visualizing traffic patterns and potential security threats.",
      technologies: ["Python", "Pandas", "TensorFlow", "React", "D3.js"],
      images: [
        "/images/projects/project4/cover.jpg",
        "/images/projects/project4/image1.jpg",
        "/images/projects/project4/image2.jpg",
      ],
      category: "Security Tool",
      github: "https://github.com/yourusername/network-analyzer",
      liveDemo: null,
      featured: false
    },
    {
      id: "project-5",
      title: "Personal Finance Tracker",
      shortDescription: "Expense tracking and budget management application",
      description: "A comprehensive personal finance application that allows users to track expenses, set budgets, and visualize spending patterns. Features include expense categorization, recurring transaction management, and financial goal setting.",
      technologies: ["React", "Firebase", "Chart.js", "TailwindCSS"],
      images: [
        "/images/projects/project5/cover.jpg",
        "/images/projects/project5/image1.jpg",
        "/images/projects/project5/image2.jpg",
      ],
      category: "Web Application",
      github: "https://github.com/yourusername/finance-tracker",
      liveDemo: "https://finance-tracker-demo.example.com",
      featured: false
    },
    {
      id: "project-6",
      title: "Code Review Assistant",
      shortDescription: "AI-powered tool for automated code reviews and improvements",
      description: "An AI-powered tool that analyzes code repositories, provides quality insights, suggests improvements, and identifies potential security vulnerabilities. Integrates with GitHub and GitLab for seamless code review workflows.",
      technologies: ["Python", "TensorFlow", "Flask", "React", "GitHub API"],
      images: [
        "/images/projects/project6/cover.jpg",
        "/images/projects/project6/image1.jpg",
        "/images/projects/project6/image2.jpg",
      ],
      category: "Developer Tool",
      github: "https://github.com/yourusername/code-review-assistant",
      liveDemo: "https://code-review.example.com",
      featured: false
    }
  ];
  
  // File: src/components/projects/ImageCarousel.jsx
  'use client'
  
  import { useState, useEffect } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  
  export default function ImageCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    
    // Auto-transition between images
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 5000)
      
      return () => clearInterval(interval)
    }, [images.length])
    
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }
    
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }
    
    // Handle image placeholder if images array is empty
    if (!images || images.length === 0) {
      return (
        <div className="relative w-full h-64 bg-dark-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No images available</span>
        </div>
      )
    }
    
    return (
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-dark-700"
          >
            {/* Placeholder for image */}
            <div className="w-full h-full bg-dark-700 flex items-center justify-center">
              <div className="text-lg text-gray-400">
                {images[currentIndex].split('/').pop()} {/* Display image filename */}
              </div>
            </div>
            
            {/* When using real images, uncomment this: */}
            {/* <Image
              src={images[currentIndex]}
              alt={`Project image ${currentIndex + 1}`}
              fill
              priority
              style={{ objectFit: 'cover' }}
            /> */}
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={handlePrev}
            className="bg-dark-900/70 hover:bg-dark-900/90 text-white rounded-full p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="bg-dark-900/70 hover:bg-dark-900/90 text-white rounded-full p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Dots indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-accent' : 'bg-gray-400/50'
              }`}
            />
          ))}
        </div>
      </div>
    )
  }
  
  // File: src/components/projects/ProjectCard.jsx
  'use client'
  
  import { useState } from 'react'
  import Link from 'next/link'
  import { motion } from 'framer-motion'
  import ImageCarousel from './ImageCarousel'
  
  export default function ProjectCard({ project }) {
    const [showDetails, setShowDetails] = useState(false)
    
    return (
      <motion.div 
        className="bg-dark-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <ImageCarousel images={project.images} />
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <span className="text-xs font-medium bg-accent/20 text-accent px-2 py-1 rounded">
              {project.category}
            </span>
          </div>
          
          <p className="text-gray-400 mb-4">
            {showDetails ? project.description : project.shortDescription}
          </p>
          
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-dark-700 text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              {showDetails ? "Show Less" : "Show More"}
            </button>
            
            <div className="flex space-x-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }
  
  // File: src/app/projects/page.js
  'use client'
  
  import { useState } from 'react'
  import { motion } from 'framer-motion'
  import { fadeIn, staggerContainer } from '@/lib/animations'
  import { projects } from '@/data/projects'
  import ProjectCard from '@/components/projects/ProjectCard'
  import PageTransition from '@/components/layout/PageTransition'
  
  export default function ProjectsPage() {
    const [filter, setFilter] = useState('all')
    
    // Get unique categories
    const categories = ['all', ...new Set(projects.map(project => project.category))]
    
    // Filter projects based on selected category
    const filteredProjects = filter === 'all' 
      ? projects 
      : projects.filter(project => project.category === filter)
    
    return (
      <PageTransition>
        <div className="min-h-screen pt-20">
          <div className="page-container">
            {/* Page Title */}
            <motion.div
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              animate="visible"
              className="mb-12 text-center"
            >
              <motion.h1
                variants={fadeIn("up", 0.2)}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                My Projects
              </motion.h1>
              <motion.div 
                variants={fadeIn("up", 0.3)} 
                className="w-24 h-1 bg-accent mx-auto"
              />
              <motion.p
                variants={fadeIn("up", 0.4)}
                className="mt-6 text-gray-400 max-w-2xl mx-auto"
              >
                Browse through my recent projects. Each project represents a unique challenge
                that I've tackled using various technologies and approaches.
              </motion.p>
            </motion.div>
  
            {/* Category Filter */}
            <motion.div
              variants={fadeIn("down", 0.5)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    filter === category
                      ? 'bg-accent text-white'
                      : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>
  
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-400 text-lg">
                  No projects found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </PageTransition>
    )
  }