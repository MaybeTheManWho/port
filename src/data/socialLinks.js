// File: src/data/socialLinks.js
export const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: "github.svg",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: "twitter.svg",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/yourusername",
      icon: "instagram.svg",
    },
    {
      name: "Discord",
      url: "https://discord.com/users/yourid",
      icon: "discord.svg",
    },
  ];
  
  // File: src/components/contact/ContactForm.jsx
  'use client'
  
  import { useState } from 'react'
  import { motion } from 'framer-motion'
  
  export default function ContactForm() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      discord: '',
      message: '',
      contactMethod: 'email', // Default to email
    })
    
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    
    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError(null)
      
      try {
        // In a real implementation, you would send this data to your API
        // For demo purposes, we'll simulate a successful submission
        console.log('Form submitted:', formData)
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // Reset form and show success message
        setFormData({
          name: '',
          email: '',
          discord: '',
          message: '',
          contactMethod: 'email',
        })
        setSuccess(true)
        
        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000)
      } catch (err) {
        console.error('Error submitting form:', err)
        setError('There was an error submitting your message. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-dark-800 rounded-lg shadow-lg p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
        
        {success && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-green-900/30 border border-green-800 text-green-200 px-4 py-3 rounded mb-6"
          >
            Your message has been sent successfully! I'll get back to you soon.
          </motion.div>
        )}
        
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded mb-6"
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your name"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Preferred Contact Method
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={formData.contactMethod === 'email'}
                  onChange={handleChange}
                  className="mr-2 text-accent focus:ring-accent"
                />
                <span>Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contactMethod"
                  value="discord"
                  checked={formData.contactMethod === 'discord'}
                  onChange={handleChange}
                  className="mr-2 text-accent focus:ring-accent"
                />
                <span>Discord</span>
              </label>
            </div>
          </div>
          
          {formData.contactMethod === 'email' ? (
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your.email@example.com"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="discord" className="block text-sm font-medium text-gray-300 mb-1">
                Discord Username
              </label>
              <input
                type="text"
                id="discord"
                name="discord"
                value={formData.discord}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="username#0000"
              />
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="How can I help you?"
            ></textarea>
          </div>
          
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-md font-medium transition-colors ${
              loading
                ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                : 'bg-accent text-white hover:bg-blue-600'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </motion.div>
    )
  }
  
  // File: src/components/contact/SocialLinks.jsx
  'use client'
  
  import { motion } from 'framer-motion'
  import { fadeInFromBottom } from '@/lib/animations'
  import { socialLinks } from '@/data/socialLinks'
  
  export default function SocialLinks() {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInFromBottom}
        className="flex flex-wrap justify-center gap-4"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center transition-colors hover:bg-dark-600">
              {/* Using embedded SVGs for social icons */}
              {social.name === "GitHub" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              )}
              {social.name === "Twitter" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              )}
              {social.name === "Instagram" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              )}
              {social.name === "Discord" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              )}
            </div>
            <span className="mt-2 text-sm text-gray-400">{social.name}</span>
          </motion.a>
        ))}
      </motion.div>
    )
  }
  
  // File: src/app/contact/page.js
  'use client'
  
  import { motion } from 'framer-motion'
  import { fadeIn, staggerContainer } from '@/lib/animations'
  import ContactForm from '@/components/contact/ContactForm'
  import SocialLinks from '@/components/contact/SocialLinks'
  import PageTransition from '@/components/layout/PageTransition'
  
  export default function ContactPage() {
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
                Contact Me
              </motion.h1>
              <motion.div 
                variants={fadeIn("up", 0.3)} 
                className="w-24 h-1 bg-accent mx-auto"
              />
              <motion.p
                variants={fadeIn("up", 0.4)}
                className="mt-6 text-gray-400 max-w-2xl mx-auto"
              >
                Have a question or want to work together? Feel free to reach out to me
                through the form below or connect with me on social media.
              </motion.p>
            </motion.div>
  
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
              
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-dark-800 rounded-lg shadow-lg p-6 md:p-8 h-full">
                  <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start">
                      <div className="text-accent mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-gray-400 mt-1">
                          <a 
                            href="mailto:your.email@example.com" 
                            className="hover:text-accent transition-colors"
                          >
                            your.email@example.com
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="text-accent mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Discord</h3>
                        <p className="text-gray-400 mt-1">username#0000</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="text-accent mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Response Time</h3>
                        <p className="text-gray-400 mt-1">
                          Usually within 24-48 hours
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
                  <SocialLinks />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }