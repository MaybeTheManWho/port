'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewBlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create blog post');
      }

      // Redirect to the dashboard
      router.push('/administrator/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Simple markdown to HTML conversion for preview
  const convertMarkdownToHtml = (markdown) => {
    if (!markdown) return '';
    
    // Convert headers
    let html = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Convert bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Convert lists
    html = html.replace(/^\s*\n\* (.*)/gim, '<ul>\n<li>$1</li>');
    html = html.replace(/^\* (.*)/gim, '<li>$1</li>');
    html = html.replace(/^\s*\n\- (.*)/gim, '<ul>\n<li>$1</li>');
    html = html.replace(/^\- (.*)/gim, '<li>$1</li>');
    html = html.replace(/^([0-9]+)\. (.*)/gim, '<ol start="$1">\n<li>$2</li>');
    html = html.replace(/<\/ul>\s*\n<ul>/g, '');
    html = html.replace(/<\/ol>\s*\n<ol>/g, '');
    html = html.replace(/<\/ul>\s*(?![\s\S]*<ul>)/g, '</ul>');
    html = html.replace(/<\/ol>\s*(?![\s\S]*<ol>)/g, '</ol>');
    
    // Convert paragraphs
    html = html.replace(/^\s*(.+)/gim, (match) => {
      if (match.match(/^<[^>]+>/)) return match;
      return `<p>${match}</p>`;
    });
    
    // Convert line breaks
    html = html.replace(/\n/g, '<br>');
    
    return html;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Create New Blog Post</h1>
            <Link
              href="/administrator/dashboard"
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          {/* Preview Toggle */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              {previewMode ? 'Back to Editor' : 'Preview'}
            </button>
          </div>

          {previewMode ? (
            // Preview Mode
            <div className="bg-gray-700 rounded-lg p-6">
              <h1 className="text-3xl font-bold mb-4">{title || 'Untitled Post'}</h1>
              
              {excerpt && (
                <div className="italic text-gray-300 mb-6 border-l-4 border-indigo-500 pl-4">
                  {excerpt}
                </div>
              )}
              
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(content) }}
              />
              
              {tags && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {tags.split(',').map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-600 text-sm px-3 py-1 rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-900/50 text-red-300 p-4 rounded-md">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter post title"
                />
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-1">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows="2"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Brief summary of the post (optional)"
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
                  Content *
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="20"
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Write your post content using Markdown..."
                />
                <p className="text-xs text-gray-400 mt-1">
                  Supports Markdown: # Header, **bold**, *italic*, [link](https://example.com), etc.
                </p>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Separate tags with commas (e.g. NextJS, React, Tailwind)"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="published"
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded"
                />
                <label htmlFor="published" className="ml-2 block text-sm text-gray-300">
                  Publish immediately
                </label>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Link
                  href="/administrator/dashboard"
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Saving...' : 'Save Post'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}