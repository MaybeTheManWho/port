'use client';

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import BlogContent from '@/components/blog/BlogContent';
import PageTransition from '@/components/layout/PageTransition';

export default function BlogPostPage({ params }) {
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      try {
        // Try to fetch the post from the API
        const response = await fetch(`/api/blog?slug=${slug}`);

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const postData = await response.json();
        setPost(postData);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  // Show 404 if the post can't be found
  if (!loading && !post && !error) {
    notFound();
  }

  // Show loading state
  if (loading) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </PageTransition>
    );
  }

  // Show error state
  if (error) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-red-900/30 border border-red-800 text-red-200 px-6 py-4 rounded-lg inline-block">
            <h2 className="text-xl font-bold mb-2">Error Loading Post</h2>
            <p>{error}</p>
            <button
              onClick={() => router.push('/blog')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Fall back to a "Not Found" page if there's no post
  if (!post) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/blog')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Blog
          </button>
        </div>
      </PageTransition>
    );
  }

  // Render the post
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <BlogContent
          title={post.title}
          date={post.createdAt || post.date}
          content={post.content}
          tags={post.tags || []}
        />
      </div>
    </PageTransition>
  );
}