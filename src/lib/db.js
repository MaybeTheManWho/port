// File: src/lib/db.js
// This is a simple client-side database mock using localStorage
// In a real app, you would use a backend database

export const db = {
    // Blog posts
    getBlogPosts: () => {
      try {
        const posts = localStorage.getItem('blogPosts')
        return posts ? JSON.parse(posts) : sampleBlogPosts
      } catch (error) {
        console.error('Error getting blog posts:', error)
        return sampleBlogPosts
      }
    },
    
    getBlogPost: (slug) => {
      try {
        const posts = db.getBlogPosts()
        return posts.find(post => post.slug === slug) || null
      } catch (error) {
        console.error('Error getting blog post:', error)
        return null
      }
    },
    
    saveBlogPost: (post) => {
      try {
        const posts = db.getBlogPosts()
        const existingIndex = posts.findIndex(p => p.id === post.id)
        
        let updatedPosts
        if (existingIndex >= 0) {
          // Update existing post
          updatedPosts = [
            ...posts.slice(0, existingIndex),
            post,
            ...posts.slice(existingIndex + 1)
          ]
        } else {
          // Add new post
          updatedPosts = [...posts, post]
        }
        
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
        return post
      } catch (error) {
        console.error('Error saving blog post:', error)
        return null
      }
    },
    
    deleteBlogPost: (id) => {
      try {
        const posts = db.getBlogPosts()
        const updatedPosts = posts.filter(post => post.id !== id)
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
        return true
      } catch (error) {
        console.error('Error deleting blog post:', error)
        return false
      }
    },
    
    // Contact requests
    getContactRequests: () => {
      try {
        const requests = localStorage.getItem('contactRequests')
        return requests ? JSON.parse(requests) : []
      } catch (error) {
        console.error('Error getting contact requests:', error)
        return []
      }
    },
    
    saveContactRequest: (request) => {
      try {
        const requests = db.getContactRequests()
        const updatedRequests = [...requests, request]
        localStorage.setItem('contactRequests', JSON.stringify(updatedRequests))
        return request
      } catch (error) {
        console.error('Error saving contact request:', error)
        return null
      }
    },
    
    deleteContactRequest: (id) => {
      try {
        const requests = db.getContactRequests()
        const updatedRequests = requests.filter(request => request.id !== id)
        localStorage.setItem('contactRequests', JSON.stringify(updatedRequests))
        return true
      } catch (error) {
        console.error('Error deleting contact request:', error)
        return false
      }
    },
    
    markContactRequestAsRead: (id) => {
      try {
        const requests = db.getContactRequests()
        const updatedRequests = requests.map(request => 
          request.id === id ? { ...request, read: true } : request
        )
        localStorage.setItem('contactRequests', JSON.stringify(updatedRequests))
        return true
      } catch (error) {
        console.error('Error marking contact request as read:', error)
        return false
      }
    }
  }
  
  // Sample blog posts
  const sampleBlogPosts = [
    {
      id: '1',
      title: 'Getting Started with React and Next.js',
      slug: 'getting-started-with-react-nextjs',
      excerpt: 'Learn how to build modern web applications with React and Next.js. This tutorial covers everything from setup to deployment.',
      content: `
  # Getting Started with React and Next.js
  
  React is a popular JavaScript library for building user interfaces, and Next.js is a React framework that provides additional structure, features, and optimizations.
  
  ## Why React and Next.js?
  
  React allows you to build complex interfaces from small, reusable pieces of code called components. Next.js enhances React with:
  
  - Server-side rendering
  - Static site generation
  - Built-in routing
  - API routes
  - CSS and Sass support
  - Code splitting and bundling
  
  ## Setting Up Your First Project
  
  To create a new Next.js app, run:
  
  \`\`\`bash
  npx create-next-app my-app
  cd my-app
  npm run dev
  \`\`\`
  
  This will set up a new Next.js project and start the development server.
  
  ## Creating Your First Component
  
  Create a new file called \`components/Button.js\`:
  
  \`\`\`jsx
  export default function Button({ children, onClick }) {
    return (
      <button 
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {children}
      </button>
    );
  }
  \`\`\`
  
  ## Routing in Next.js
  
  Next.js has a file-system based router:
  
  - \`pages/index.js\` → \`/\`
  - \`pages/about.js\` → \`/about\`
  - \`pages/blog/[slug].js\` → \`/blog/:slug\`
  
  ## Conclusion
  
  React and Next.js provide a powerful combination for building modern web applications. The learning curve might be steep at first, but the productivity gains are worth it.
  
  Stay tuned for more tutorials in this series!
      `,
      author: 'Your Name',
      date: '2023-02-15',
      coverImage: '/images/blog/react-nextjs.jpg',
      tags: ['React', 'Next.js', 'Web Development'],
      featured: true
    },
    {
      id: '2',
      title: 'Introduction to Cybersecurity Best Practices',
      slug: 'introduction-to-cybersecurity-best-practices',
      excerpt: 'Explore essential cybersecurity practices to protect your applications and data from common threats and vulnerabilities.',
      content: `
  # Introduction to Cybersecurity Best Practices
  
  Cybersecurity is more important than ever in today's digital landscape. This post explores essential practices for protecting your applications and data.
  
  ## Common Threats
  
  Some of the most common threats include:
  
  - **Phishing attacks**: Attempts to steal sensitive information through deceptive emails or websites
  - **Malware**: Malicious software designed to damage or gain unauthorized access to systems
  - **SQL injection**: Inserting malicious SQL code into database queries
  - **Cross-Site Scripting (XSS)**: Injecting client-side scripts into web pages
  - **Denial of Service (DoS)**: Overwhelming systems to make them unavailable
  
  ## Best Practices
  
  ### 1. Keep Software Updated
  
  Always keep your operating systems, applications, and libraries up to date with the latest security patches.
  
  ### 2. Use Strong Authentication
  
  - Implement multi-factor authentication
  - Enforce strong password policies
  - Consider using passwordless authentication where appropriate
  
  ### 3. Encrypt Sensitive Data
  
  Encrypt data both in transit and at rest:
  
  \`\`\`javascript
  // Example of encrypting data with Node.js crypto module
  const crypto = require('crypto');
  
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  
  function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  }
  \`\`\`
  
  ### 4. Implement Proper Access Controls
  
  Follow the principle of least privilege - users should only have access to the resources they need to perform their job.
  
  ### 5. Regular Security Audits
  
  Conduct regular security audits and penetration testing to identify vulnerabilities before they can be exploited.
  
  ## Conclusion
  
  Cybersecurity is not a one-time setup but an ongoing process. By following these best practices, you can significantly reduce the risk of security breaches and protect your digital assets.
      `,
      author: 'Your Name',
      date: '2023-03-10',
      coverImage: '/images/blog/cybersecurity.jpg',
      tags: ['Cybersecurity', 'Security', 'Web Security'],
      featured: true
    },
    {
      id: '3',
      title: 'Building Responsive UI with Tailwind CSS',
      slug: 'building-responsive-ui-with-tailwind-css',
      excerpt: 'Discover how to create beautiful, responsive user interfaces efficiently using Tailwind CSS utility classes.',
      content: `
  # Building Responsive UI with Tailwind CSS
  
  Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without ever leaving your HTML. This approach to styling can significantly speed up your development process.
  
  ## Why Choose Tailwind?
  
  - **No more custom CSS**: With Tailwind's extensive utility classes, you rarely need to write custom CSS
  - **Responsive design made easy**: Built-in responsive modifiers make it simple to build adaptive interfaces
  - **Consistent design system**: Tailwind's design system ensures consistency across your project
  - **Highly customizable**: Configure colors, spacing, breakpoints, and more to match your design needs
  
  ## Getting Started
  
  Install Tailwind CSS in your project:
  
  \`\`\`bash
  npm install -D tailwindcss
  npx tailwindcss init
  \`\`\`
  
  Configure your \`tailwind.config.js\`:
  
  \`\`\`javascript
  module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  \`\`\`
  
  ## Building a Responsive Card Component
  
  Here's a simple example of a responsive card component:
  
  \`\`\`jsx
  function Card({ title, description, imageUrl }) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <div className="h-48 bg-gray-200">
          {/* Image would go here */}
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
      </div>
    );
  }
  \`\`\`
  
  ## Responsive Design with Tailwind
  
  Tailwind makes responsive design straightforward with its responsive modifiers:
  
  \`\`\`jsx
  <div className="text-center md:text-left lg:text-right">
    This text is centered on mobile, left-aligned on medium screens, and right-aligned on large screens.
  </div>
  \`\`\`
  
  ## Conclusion
  
  Tailwind CSS offers a different approach to styling that can dramatically improve your development workflow. By leveraging its utility classes, you can build responsive, custom UIs more efficiently.
      `,
      author: 'Your Name',
      date: '2023-04-05',
      coverImage: '/images/blog/tailwind-css.jpg',
      tags: ['CSS', 'Tailwind', 'UI Design', 'Frontend'],
      featured: false
    }
  ];
  
  // File: src/components/blog/BlogCard.jsx
  'use client'
  
  import Link from 'next/link'
  import { motion } from 'framer-motion'
  
  export default function BlogCard({ post, featured = false }) {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`overflow-hidden rounded-lg bg-dark-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
          featured ? 'md:col-span-2' : ''
        }`}
      >
        <div className="relative">
          {/* Cover Image */}
          <div className={`bg-gradient-to-r from-blue-600/30 to-purple-600/30 w-full ${
            featured ? 'h-64' : 'h-48'
          }`}>
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              {post.title} Cover Image
            </div>
          </div>
          
          {/* Featured Label */}
          {post.featured && (
            <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="text-xs bg-dark-700 text-gray-300 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Title & Excerpt */}
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-xl font-bold mb-2 hover:text-accent transition-colors">
              {post.title}
            </h3>
          </Link>
          
          <p className="text-gray-400 mb-4 flex-grow">
            {post.excerpt}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-700">
            <div className="text-sm text-gray-400">
              {formattedDate}
            </div>
            
            <Link
              href={`/blog/${post.slug}`}
              className="text-accent hover:text-accent/80 text-sm font-medium"
            >
              Read More →
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }
  
  // File: src/components/blog/BlogContent.jsx
  'use client'
  
  import { useState, useEffect } from 'react'
  import Link from 'next/link'
  import { motion } from 'framer-motion'
  import ReactMarkdown from 'react-markdown'
  
  export default function BlogContent({ post }) {
    const [estimatedReadTime, setEstimatedReadTime] = useState('5 min')
    
    useEffect(() => {
      // Calculate estimated read time
      if (post?.content) {
        const wordsPerMinute = 200
        const wordCount = post.content.split(/\s+/).length
        const readTime = Math.ceil(wordCount / wordsPerMinute)
        setEstimatedReadTime(`${readTime} min read`)
      }
    }, [post])
    
    if (!post) {
      return (
        <div className="bg-dark-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <p className="text-gray-400 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog">
            <button className="btn btn-primary">
              Return to Blog
            </button>
          </Link>
        </div>
      )
    }
    
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    return (
      <div className="bg-dark-800 rounded-lg overflow-hidden shadow-lg">
        {/* Cover Image */}
        <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 w-full h-64 sm:h-96">
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {post.title} Cover Image
          </div>
        </div>
        
        <div className="p-6 sm:p-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="text-xs bg-dark-700 text-gray-300 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {post.title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center text-sm text-gray-400 mb-8 pb-6 border-b border-dark-700">
            <div className="mr-6 mb-2">
              <span className="font-medium text-gray-300">{post.author}</span>
            </div>
            <div className="mr-6 mb-2">
              <span>{formattedDate}</span>
            </div>
            <div className="mb-2">
              <span>{estimatedReadTime}</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="prose prose-invert prose-blue max-w-none">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </div>
          
          {/* Author Info */}
          <div className="mt-12 pt-8 border-t border-dark-700">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-dark-700 flex items-center justify-center text-gray-500 mr-4">
                Avatar
              </div>
              <div>
                <h3 className="text-xl font-bold">{post.author}</h3>
                <p className="text-gray-400">
                  Developer, writer, and cybersecurity enthusiast. Sharing knowledge and experiences through blog posts.
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-dark-700 flex justify-between">
            <Link href="/blog">
              <button className="text-accent hover:text-accent/80 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </button>
            </Link>
            
            <div className="flex space-x-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://yourwebsite.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://yourwebsite.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // File: src/app/blog/page.js
  'use client'
  
  import { useState, useEffect } from 'react'
  import { motion } from 'framer-motion'
  import { fadeIn, staggerContainer } from '@/lib/animations'
  import { db } from '@/lib/db'
  import BlogCard from '@/components/blog/BlogCard'
  import PageTransition from '@/components/layout/PageTransition'
  
  export default function BlogPage() {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [selectedTag, setSelectedTag] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    
    useEffect(() => {
      // Fetch blog posts
      const fetchedPosts = db.getBlogPosts()
      setPosts(fetchedPosts)
      setFilteredPosts(fetchedPosts)
    }, [])
    
    // Extract all unique tags from posts
    const allTags = ['all', ...new Set(posts.flatMap(post => post.tags))]
    
    // Filter posts based on selected tag and search query
    useEffect(() => {
      let filtered = posts
      
      // Filter by tag
      if (selectedTag !== 'all') {
        filtered = filtered.filter(post => post.tags.includes(selectedTag))
      }
      
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(query) || 
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
        )
      }
      
      setFilteredPosts(filtered)
    }, [selectedTag, searchQuery, posts])
    
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
                Blog
              </motion.h1>
              <motion.div 
                variants={fadeIn("up", 0.3)} 
                className="w-24 h-1 bg-accent mx-auto"
              />
              <motion.p
                variants={fadeIn("up", 0.4)}
                className="mt-6 text-gray-400 max-w-2xl mx-auto"
              >
                Thoughts, tutorials, and insights on web development, security, and technology.
              </motion.p>
            </motion.div>
  
            {/* Search and Filter */}
            <motion.div
              variants={fadeIn("down", 0.5)}
              initial="hidden"
              animate="visible"
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Tag Filter Dropdown */}
                <div className="md:w-1/3">
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  >
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>
                        {tag === 'all' ? 'All Tags' : tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
            
            {/* Featured Posts */}
            {selectedTag === 'all' && !searchQuery && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.filter(post => post.featured).map(post => (
                    <BlogCard key={post.id} post={post} featured={true} />
                  ))}
                </div>
              </div>
            )}
            
            {/* All Posts */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {selectedTag !== 'all' || searchQuery 
                  ? `${filteredPosts.length} Posts Found` 
                  : 'All Posts'}
              </h2>
              
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="bg-dark-800 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">No posts found</h3>
                  <p className="text-gray-400">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }
  
  // File: src/app/blog/[slug]/page.js
  'use client'
  
  import { useState, useEffect } from 'react'
  import { useParams } from 'next/navigation'
  import { db } from '@/lib/db'
  import BlogContent from '@/components/blog/BlogContent'
  import PageTransition from '@/components/layout/PageTransition'
  
  export default function BlogPostPage() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
      // Fetch blog post by slug
      if (slug) {
        const fetchedPost = db.getBlogPost(slug)
        setPost(fetchedPost)
        setLoading(false)
      }
    }, [slug])
    
    if (loading) {
      return (
        <div className="min-h-screen pt-20">
          <div className="page-container">
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          </div>
        </div>
      )
    }
    
    return (
      <PageTransition>
        <div className="min-h-screen pt-20">
          <div className="page-container max-w-4xl">
            <BlogContent post={post} />
          </div>
        </div>
      </PageTransition>
    )
  }