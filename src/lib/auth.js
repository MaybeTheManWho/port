// File: src/lib/auth.js
// This is a simple client-side authentication mock
// In a real app, you would use a proper authentication system

export const auth = {
  // Check if user is logged in
  isLoggedIn: () => {
    try {
      // Check for admin_authenticated (from the admin login page)
      const adminAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
      if (adminAuthenticated) return true;
      
      const authData = localStorage.getItem('authData')
      if (!authData) return false
      
      const { expiresAt } = JSON.parse(authData)
      return new Date().getTime() < expiresAt
    } catch (error) {
      console.error('Error checking auth:', error)
      return false
    }
  },
  
  // Log in user
  login: (username, password) => {
    try {
      // In a real app, this would make an API call to validate credentials
      // For demo purposes, we're using hardcoded credentials
      if (username === 'admin' && password === 'password123') {
        const authData = {
          username,
          isAdmin: true,
          expiresAt: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 hours
        }
        
        localStorage.setItem('authData', JSON.stringify(authData))
        localStorage.setItem('admin_authenticated', 'true'); // For compatibility with admin login
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error logging in:', error)
      return false
    }
  },
  
  // Log out user
  logout: () => {
    try {
      localStorage.removeItem('authData')
      localStorage.removeItem('admin_authenticated')
      return true
    } catch (error) {
      console.error('Error logging out:', error)
      return false
    }
  },
  
  // Get current user
  getUser: () => {
    try {
      // Check admin_authenticated
      const adminAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
      if (adminAuthenticated) {
        return {
          username: 'admin',
          isAdmin: true
        };
      }
      
      const authData = localStorage.getItem('authData')
      if (!authData) return null
      
      const userData = JSON.parse(authData)
      if (new Date().getTime() > userData.expiresAt) {
        // Session expired
        localStorage.removeItem('authData')
        return null
      }
      
      return userData
    } catch (error) {
      console.error('Error getting user:', error)
      return null
    }
  }
}

// File: src/components/admin/LoginForm.jsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { auth } from '@/lib/auth'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const success = auth.login(username, password)
      
      if (success) {
        router.push('/admin')
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-800 rounded-lg shadow-lg p-8 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Administrator Login</h2>
      
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="admin"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="password"
          />
          <p className="mt-1 text-sm text-gray-400">
            <span className="text-accent">Demo credentials:</span> admin / password
          </p>
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
          {loading ? 'Logging in...' : 'Log In'}
        </motion.button>
      </form>
    </motion.div>
  )
}

// File: src/components/admin/ContactTable.jsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '@/lib/db'

export default function ContactTable({ requests, onDelete, onMarkAsRead }) {
  const [selectedRequest, setSelectedRequest] = useState(null)
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      onDelete(id)
    }
  }
  
  const handleMarkAsRead = (id) => {
    onMarkAsRead(id)
  }
  
  if (!requests || requests.length === 0) {
    return (
      <div className="bg-dark-800 rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold mb-2">No contact requests</h3>
        <p className="text-gray-400">
          You haven't received any contact requests yet.
        </p>
      </div>
    )
  }
  
  return (
    <div className="bg-dark-800 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-dark-600">
          <thead className="bg-dark-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark-800 divide-y divide-dark-700">
            {requests.map((request) => (
              <tr 
                key={request.id} 
                className={`hover:bg-dark-700 transition-colors ${
                  !request.read ? 'bg-dark-700/50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{request.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.contactMethod === 'email' ? (
                    <div className="text-gray-300">{request.email}</div>
                  ) : (
                    <div className="text-gray-300">{request.discord}</div>
                  )}
                  <div className="text-xs text-gray-400">
                    {request.contactMethod}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                  {new Date(request.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.read 
                      ? 'bg-green-900/30 text-green-200' 
                      : 'bg-blue-900/30 text-blue-200'
                  }`}>
                    {request.read ? 'Read' : 'Unread'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="text-accent hover:text-blue-400 mr-3"
                  >
                    View
                  </button>
                  {!request.read && (
                    <button
                      onClick={() => handleMarkAsRead(request.id)}
                      className="text-green-400 hover:text-green-300 mr-3"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(request.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Message Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 rounded-lg p-6 max-w-2xl w-full mx-4"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Message from {selectedRequest.name}</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">Contact Method</p>
                <p className="font-medium">
                  {selectedRequest.contactMethod === 'email' ? 'Email' : 'Discord'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Contact Details</p>
                <p className="font-medium">
                  {selectedRequest.contactMethod === 'email' 
                    ? selectedRequest.email 
                    : selectedRequest.discord}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Date</p>
                <p className="font-medium">
                  {new Date(selectedRequest.date).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className={`font-medium ${
                  selectedRequest.read ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {selectedRequest.read ? 'Read' : 'Unread'}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">Message</p>
              <div className="bg-dark-700 rounded-md p-4">
                <p className="whitespace-pre-wrap">{selectedRequest.message}</p>
              </div>
            </div>
            
            <div className="flex justify-between">
              {!selectedRequest.read && (
                <button
                  onClick={() => {
                    handleMarkAsRead(selectedRequest.id)
                    setSelectedRequest({...selectedRequest, read: true})
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => {
                  handleDelete(selectedRequest.id)
                  setSelectedRequest(null)
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md ml-auto"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

// File: src/components/admin/BlogEditor.jsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'

export default function BlogEditor({ post = null }) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: [],
    featured: false,
  })
  
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const router = useRouter()
  
  // Initialize form with post data if editing
  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        tags: [...post.tags], // Clone the tags array
      })
    } else {
      // Generate a new ID for new posts
      setFormData({
        ...formData,
        id: uuidv4(),
      })
    }
  }, [post])
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }
  
  const handleSlugify = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
    
    setFormData({
      ...formData,
      slug,
    })
  }
  
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      })
      setTagInput('')
    }
  }
  
  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // Validate form
      if (!formData.title || !formData.slug || !formData.content) {
        throw new Error('Please fill out all required fields')
      }
      
      // Add current date and author
      const updatedPost = {
        ...formData,
        date: post?.date || new Date().toISOString(),
        author: 'Your Name', // Replace with actual author name
      }
      
      // Save post
      db.saveBlogPost(updatedPost)
      
      // Redirect to admin blog page
      router.push('/admin/blog')
    } catch (err) {
      console.error('Error saving blog post:', err)
      setError(err.message || 'An error occurred while saving the blog post')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-800 rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">
        {post ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h2>
      
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleSlugify}
              required
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter post title"
            />
          </div>
          
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">
              Slug *
            </label>
            <div className="flex">
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="flex-grow px-4 py-2 bg-dark-700 border border-dark-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="enter-post-slug"
              />
              <button
                type="button"
                onClick={handleSlugify}
                className="px-4 py-2 bg-dark-600 text-white rounded-r-md hover:bg-dark-500 transition-colors"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-1">
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Brief summary of the post (displayed in blog listing)"
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
            Content * (Markdown supported)
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="15"
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent font-mono"
            placeholder="# Write your post content here
            
This content supports Markdown formatting.

## Subheading

- List item 1
- List item 2

```javascript
// Code blocks are supported too
function helloWorld() {
  console.log('Hello, world!');
}
```"
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-300 mb-1">
            Cover Image URL
          </label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="/images/blog/your-image.jpg"
          />
          <p className="mt-1 text-xs text-gray-400">
            For demo purposes, this field is not required. In a real application, you would upload an image.
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Tags
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-grow px-4 py-2 bg-dark-700 border border-dark-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Add a tag"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-accent text-white rounded-r-md hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <div
                key={tag}
                className="bg-dark-700 text-gray-300 px-3 py-1 rounded-full flex items-center"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-accent border-dark-600 rounded focus:ring-accent bg-dark-700"
            />
            <span className="ml-2 text-gray-300">
              Featured Post (displayed prominently on the blog page)
            </span>
          </label>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            className="px-4 py-2 bg-dark-600 text-white rounded-md hover:bg-dark-500 transition-colors"
          >
            Cancel
          </button>
          
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              loading
                ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                : 'bg-accent text-white hover:bg-blue-600'
            }`}
          >
            {loading ? 'Saving...' : 'Save Post'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

// File: src/app/admin/page.js
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/lib/animations'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import PageTransition from '@/components/layout/PageTransition'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalContacts: 0,
    unreadContacts: 0,
  })
  
  const router = useRouter()
  
  // Check if user is logged in
  useEffect(() => {
    const currentUser = auth.getUser()
    
    if (!currentUser) {
      router.push('/admin/login')
      return
    }
    
    setUser(currentUser)
    
    // Get statistics
    const posts = db.getBlogPosts()
    const contacts = db.getContactRequests()
    const unreadContacts = contacts.filter(contact => !contact.read)
    
    setStats({
      totalPosts: posts.length,
      totalContacts: contacts.length,
      unreadContacts: unreadContacts.length,
    })
    
    setLoading(false)
  }, [router])
  
  const handleLogout = () => {
    auth.logout()
    router.push('/admin/login')
  }
  
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
        <div className="page-container">
          {/* Admin Header */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="visible"
            className="mb-8 md:flex md:items-center md:justify-between"
          >
            <motion.div variants={fadeIn("up", 0.2)}>
              <h1 className="text-3xl font-bold">Administrator Dashboard</h1>
              <p className="text-gray-400 mt-1">
                Welcome back, {user?.username || 'Admin'}!
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn("down", 0.3)} 
              className="mt-4 md:mt-0 flex space-x-3"
            >
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-dark-700 text-white rounded-md hover:bg-dark-600 transition-colors"
              >
                Log Out
              </button>
            </motion.div>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {/* Blog Posts Stats */}
            <motion.div
              variants={fadeIn("up", 0.3)}
              className="bg-dark-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold">{stats.totalPosts}</h2>
                  <p className="text-gray-400">Blog Posts</p>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  href="/admin/blog"
                  className="text-accent hover:text-blue-400 text-sm font-medium"
                >
                  Manage Posts →
                </Link>
              </div>
            </motion.div>
            
            {/* Contact Requests Stats */}
            <motion.div
              variants={fadeIn("up", 0.4)}
              className="bg-dark-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-500/20 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold">{stats.totalContacts}</h2>
                  <p className="text-gray-400">Contact Requests</p>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  href="/admin/contacts"
                  className="text-accent hover:text-blue-400 text-sm font-medium"
                >
                  View All Contacts →
                </Link>
              </div>
            </motion.div>
            
            {/* Unread Contact Requests Stats */}
            <motion.div
              variants={fadeIn("up", 0.5)}
              className="bg-dark-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold">{stats.unreadContacts}</h2>
                  <p className="text-gray-400">Unread Messages</p>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  href="/admin/contacts"
                  className="text-accent hover:text-blue-400 text-sm font-medium"
                >
                  View Unread Messages →
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Quick Actions */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn("up", 0.6)}
            className="bg-dark-800 rounded-lg p-6 shadow-lg mb-8"
          >
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/admin/blog/new">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-accent hover:bg-blue-600 text-white rounded-md transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Blog Post
                </motion.button>
              </Link>
              
              <Link href="/admin/contacts">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-dark-700 hover:bg-dark-600 text-white rounded-md transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  View Contact Requests
                </motion.button>
              </Link>
            </div>
          </motion.div>
          
          {/* Recent Activity - For a real app, you would implement this section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn("up", 0.7)}
            className="bg-dark-800 rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <p className="text-gray-400">
              In a real application, this section would display recent actions such as new comments, 
              recently published posts, or system notifications.
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

// File: src/app/admin/login/page.js
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/lib/animations'
import { auth } from '@/lib/auth'
import LoginForm from '@/components/admin/LoginForm'
import PageTransition from '@/components/layout/PageTransition'

export default function AdminLoginPage() {
  const router = useRouter()
  
  // Check if user is already logged in
  useEffect(() => {
    if (auth.isLoggedIn()) {
      router.push('/admin')
    }
  }, [router])
  
  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        <div className="page-container max-w-lg">
          {/* Page Title */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="visible"
            className="mb-8 text-center"
          >
            <motion.h1
              variants={fadeIn("up", 0.2)}
              className="text-4xl font-bold mb-4"
            >
              Administrator Login
            </motion.h1>
            <motion.div 
              variants={fadeIn("up", 0.3)} 
              className="w-24 h-1 bg-accent mx-auto"
            />
            <motion.p
              variants={fadeIn("up", 0.4)}
              className="mt-6 text-gray-400"
            >
              Please log in to access the administration area.
            </motion.p>
          </motion.div>
          
          <LoginForm />
        </div>
      </div>
    </PageTransition>
  )
}

// File: src/app/admin/blog/page.js
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/lib/animations'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import PageTransition from '@/components/layout/PageTransition'

export default function AdminBlogPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  
  const router = useRouter()
  
  // Check if user is logged in
  useEffect(() => {
    const currentUser = auth.getUser()
    
    if (!currentUser) {
      router.push('/admin/login')
      return
    }
    
    setUser(currentUser)
    
    // Get blog posts
    const fetchedPosts = db.getBlogPosts()
    setPosts(fetchedPosts)
    
    setLoading(false)
  }, [router])
  
  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const success = db.deleteBlogPost(id)
      
      if (success) {
        // Update posts list
        setPosts(posts.filter(post => post.id !== id))
      }
    }
  }
  
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
        <div className="page-container">
          {/* Admin Header */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="visible"
            className="mb-8 md:flex md:items-center md:justify-between"
          >
            <motion.div variants={fadeIn("up", 0.2)}>
              <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
              <p className="text-gray-400 mt-1">
                Create, edit, and manage your blog posts
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn("down", 0.3)} 
              className="mt-4 md:mt-0 flex space-x-3"
            >
              <Link href="/admin">
                <button className="px-4 py-2 bg-dark-700 text-white rounded-md hover:bg-dark-600 transition-colors">
                  Back to Dashboard
                </button>
              </Link>
              
              <Link href="/admin/blog/new">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-accent text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Create New Post
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Blog Posts Table */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn("up", 0.4)}
            className="bg-dark-800 rounded-lg shadow-lg overflow-hidden"
          >
            {posts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-dark-600">
                  <thead className="bg-dark-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-dark-800 divide-y divide-dark-700">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-dark-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{post.title}</div>
                          <div className="text-xs text-gray-400">
                            /blog/{post.slug}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                          {new Date(post.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            post.featured 
                              ? 'bg-purple-900/30 text-purple-200' 
                              : 'bg-blue-900/30 text-blue-200'
                          }`}>
                            {post.featured ? 'Featured' : 'Published'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link 
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="text-gray-400 hover:text-white mr-3"
                          >
                            View
                          </Link>
                          <Link 
                            href={`/admin/blog/edit/${post.id}`}
                            className="text-accent hover:text-blue-400 mr-3"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-400">
                  No blog posts found. Get started by creating your first post.
                </p>
                <Link href="/admin/blog/new">
                  <button className="mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-blue-600 transition-colors">
                    Create New Post
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

// File: src/app/admin/blog/new/page.js
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import { auth } from '@/lib/auth'
import BlogEditor from '@/components/admin/BlogEditor'
import PageTransition from '@/components/layout/PageTransition'

export default function AdminNewBlogPage() {
  const router = useRouter()
  
  // Check if user is logged in
  useEffect(() => {
    const currentUser = auth.getUser()
    
    if (!currentUser) {
      router.push('/admin/login')
    }
  }, [router])
  
  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        <div className="page-container">
          {/* Admin Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn("up", 0.2)}
            className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold">Create New Blog Post</h1>
              <p className="text-gray-400 mt-1">
                Create and publish a new blog post
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link href="/admin/blog">
                <button className="px-4 py-2 bg-dark-700 text-white rounded-md hover:bg-dark-600 transition-colors">
                  Back to Posts
                </button>
              </Link>
            </div>
          </motion.div>
          
          <BlogEditor />
        </div>
      </div>
    </PageTransition>
  )
}

// File: src/app/admin/blog/edit/[id]/page.js
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import BlogEditor from '@/components/admin/BlogEditor'
import PageTransition from '@/components/layout/PageTransition'

export default function AdminEditBlogPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const router = useRouter()
  
  // Check if user is logged in and fetch post
  useEffect(() => {
    const currentUser = auth.getUser()
    
    if (!currentUser) {
      router.push('/admin/login')
      return
    }
    
    if (id) {
      // Find post by ID
      const posts = db.getBlogPosts()
      const foundPost = posts.find(p => p.id === id)
      
      if (foundPost) {
        setPost(foundPost)
      } else {
        // Post not found, redirect to blog list
        router.push('/admin/blog')
      }
    }
    
    setLoading(false)
  }, [id, router])
  
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
  
  if (!post) {
    return (
      <div className="min-h-screen pt-20">
        <div className="page-container">
          <div className="bg-dark-800 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Post not found</h2>
            <p className="text-gray-400 mb-6">
              The blog post you're trying to edit doesn't exist or has been removed.
            </p>
            <Link href="/admin/blog">
              <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-blue-600 transition-colors">
                Back to Posts
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        <div className="page-container">
          {/* Admin Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn("up", 0.2)}
            className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold">Edit Blog Post</h1>
              <p className="text-gray-400 mt-1">
                Editing "{post.title}"
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link href="/admin/blog">
                <button className="px-4 py-2 bg-dark-700 text-white rounded-md hover:bg-dark-600 transition-colors">
                  Back to Posts
                </button>
              </Link>
            </div>
          </motion.div>
          
          <BlogEditor post={post} />
        </div>
      </div>
    </PageTransition>
  )
}

// File: src/app/admin/contacts/page.js
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/lib/animations'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import ContactTable from '@/components/admin/ContactTable'
import PageTransition from '@/components/layout/PageTransition'

export default function AdminContactsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState([])
  
  const router = useRouter()
  
  // Check if user is logged in
  useEffect(() => {
    const currentUser = auth.getUser()
    
    if (!currentUser) {
      router.push('/admin/login')
      return
    }
    
    setUser(currentUser)
    
    // Get contact requests
    const fetchedContacts = db.getContactRequests()
    setContacts(fetchedContacts)
    
    setLoading(false)
  }, [router])
  
  const handleDeleteContact = (id) => {
    const success = db.deleteContactRequest(id)
    
    if (success) {
      // Update contacts list
      setContacts(contacts.filter(contact => contact.id !== id))
    }
  }
  
  const handleMarkAsRead = (id) => {
    const success = db.markContactRequestAsRead(id)
    
    if (success) {
      // Update contacts list
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, read: true } : contact
      ))
    }
  }
  
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
        <div className="page-container">
          {/* Admin Header */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="visible"
            className="mb-8 md:flex md:items-center md:justify-between"
          >
            <motion.div variants={fadeIn("up", 0.2)}>
              <h1 className="text-3xl font-bold">Contact Requests</h1>
              <p className="text-gray-400 mt-1">
                View and manage contact requests from your website
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn("down", 0.3)} 
              className="mt-4 md:mt-0"
            >
              <Link href="/admin">
                <button className="px-4 py-2 bg-dark-700 text-white rounded-md hover:bg-dark-600 transition-colors">
                  Back to Dashboard
                </button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Filters - Could be implemented in a real app */}
          
          {/* Contact Requests Table */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn("up", 0.4)}
          >
            <ContactTable
              requests={contacts}
              onDelete={handleDeleteContact}
              onMarkAsRead={handleMarkAsRead}
            />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}