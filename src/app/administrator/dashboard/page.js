'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [contactRequests, setContactRequests] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const router = useRouter();

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contacts
        setLoadingContacts(true);
        const contactsResponse = await fetch('/api/contact');
        if (contactsResponse.ok) {
          const contactsData = await contactsResponse.json();
          setContactRequests(contactsData.contacts || []);
        }
        setLoadingContacts(false);
        
        // Fetch blog posts
        try {
          const blogResponse = await fetch('/api/blog');
          if (blogResponse.ok) {
            const blogData = await blogResponse.json();
            setBlogPosts(blogData.posts || []);
          }
        } catch (error) {
          console.error('Error fetching blog posts:', error);
          // Set sample blog posts if API fails
          setBlogPosts([
            {
              id: '1',
              title: 'Example Blog Post',
              slug: 'example-blog-post',
              excerpt: 'This is a sample blog post excerpt.',
              tags: ['example', 'sample'],
              published: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          ]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact request?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Update the state to remove the deleted contact
        setContactRequests(contactRequests.filter(contact => contact.id !== id));
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, read: true }),
      });
      
      if (response.ok) {
        // Update the state to mark the contact as read
        setContactRequests(contactRequests.map(contact => 
          contact.id === id ? { ...contact, read: true } : contact
        ));
      } else {
        console.error('Failed to mark contact as read');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleLogout = () => {
    console.log('Logging out');
    // Redirect to login page
    window.location.href = '/administrator';
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Admin Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard content - rest of the component remains the same */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-gray-800 rounded-lg p-4">
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === 'blogs' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveTab('blogs')}
                  >
                    Blog Posts
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === 'contacts' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveTab('contacts')}
                  >
                    Contact Requests
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    Settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-gray-800 rounded-lg p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">Contact Requests</h3>
                    <p className="text-3xl font-bold text-blue-400">{contactRequests.length}</p>
                    <p className="mt-2 text-sm text-gray-300">
                      {contactRequests.filter(r => !r.read).length} unread requests
                    </p>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">Blog Posts</h3>
                    <p className="text-3xl font-bold text-purple-400">{blogPosts.length}</p>
                    <p className="mt-2 text-sm text-gray-300">
                      {blogPosts.filter(p => p.published).length} published posts
                    </p>
                  </div>
                  
                  <div className="md:col-span-2 bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => {
                          setActiveTab('blogs');
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                      >
                        Create New Blog Post
                      </button>
                      <button
                        onClick={() => setActiveTab('contacts')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      >
                        View Contact Requests
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Blog Posts Tab */}
            {activeTab === 'blogs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Blog Posts</h2>
                  <Link href="/administrator/blog/new">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Create New Post
                    </button>
                  </Link>
                </div>
                
                {blogPosts.length === 0 ? (
                  <div className="text-center py-12 bg-gray-700 rounded-lg">
                    <p className="text-gray-400">No blog posts yet.</p>
                    <Link href="/administrator/blog/new">
                      <button
                        className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Create Your First Post
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium">
                              {post.title}
                              {post.published === false && (
                                <span className="ml-2 text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                                  Draft
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm">
                                View
                              </button>
                            </Link>
                            <Link href={`/administrator/blog/edit/${post.id}`}>
                              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                                Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this post?')) {
                                  // Implement delete functionality
                                  fetch(`/api/blog?id=${post.id}`, { method: 'DELETE' })
                                    .then(response => {
                                      if (response.ok) {
                                        setBlogPosts(blogPosts.filter(p => p.id !== post.id));
                                      } else {
                                        console.error('Failed to delete post');
                                      }
                                    })
                                    .catch(error => console.error('Error deleting post:', error));
                                }
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contact Requests Tab */}
            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Contact Requests</h2>
                
                {loadingContacts ? (
                  <div className="flex justify-center py-12">
                    <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : contactRequests.length === 0 ? (
                  <div className="text-center py-12 bg-gray-700 rounded-lg">
                    <p className="text-gray-400">No contact requests yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contactRequests.map((request) => (
                      <div 
                        key={request.id} 
                        className={`bg-gray-700 rounded-lg p-4 border-l-4 ${
                          request.read ? 'border-gray-500' : 'border-blue-500'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium">{request.name}</h3>
                            <p className="text-sm text-blue-400">{request.email}</p>
                            <p className="text-sm text-gray-400 mt-1">
                              {new Date(request.createdAt).toLocaleString()}
                            </p>
                            <p className="mt-4 text-gray-300">{request.message}</p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            {!request.read && (
                              <button
                                onClick={() => handleMarkAsRead(request.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                              >
                                Mark as Read
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteContact(request.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Admin Settings</h2>
                <div className="space-y-6">
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-300 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current-password"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="new-password"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}