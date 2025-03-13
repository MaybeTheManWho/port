'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(prevStatus => ({
      ...prevStatus,
      submitting: true
    }));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: data.message || 'Message sent successfully!' }
        });
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: data.message || 'An error occurred. Please try again.' }
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'An error occurred. Please try again.' }
      });
    }
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      className="bg-gray-800 rounded-lg p-8 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-white">Get in Touch</h2>
      
      {status.submitted ? (
        <div className="bg-green-900/30 border border-green-800 text-green-200 px-4 py-3 rounded mb-6">
          <p>{status.info.msg}</p>
          <button 
            onClick={() => setStatus({ submitted: false, submitting: false, info: { error: false, msg: null } })}
            className="mt-4 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {status.info.error && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded mb-6">
              <p>{status.info.msg}</p>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Hello, I'd like to talk about..."
            ></textarea>
          </div>
          
          <motion.button
            type="submit"
            disabled={status.submitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-md font-medium transition-colors ${
              status.submitting
                ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            {status.submitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}