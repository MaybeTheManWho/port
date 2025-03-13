import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

// Paths for storing blog data
const postsDir = path.join(process.cwd(), 'data', 'blog');
const postsFile = path.join(process.cwd(), 'data', 'posts.json');

// Ensure the data directories exist
const ensureDirectoriesExist = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }
};

// Read posts from JSON index file
const readPosts = () => {
  ensureDirectoriesExist();
  
  if (!fs.existsSync(postsFile)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(postsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading posts file:', error);
    return [];
  }
};

// Write posts to JSON index file
const writePosts = (posts) => {
  ensureDirectoriesExist();
  
  try {
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error('Error writing posts file:', error);
    throw error;
  }
};

// Process markdown to HTML
const markdownToHtml = async (markdown) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  
  return result.toString();
};

// GET handler - retrieve all blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');
    
    const posts = readPosts();
    
    // If slug is provided, return a specific post
    if (slug) {
      const post = posts.find(post => post.slug === slug);
      
      if (!post) {
        return NextResponse.json(
          { message: 'Post not found' },
          { status: 404 }
        );
      }
      
      // Read the markdown content
      const filePath = path.join(postsDir, `${post.id}.md`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { content } = matter(fileContent);
      
      // Convert markdown to HTML
      const htmlContent = await markdownToHtml(content);
      
      return NextResponse.json({
        ...post,
        content: htmlContent,
      });
    }
    
    // If id is provided, return a specific post for editing
    if (id) {
      const post = posts.find(post => post.id === id);
      
      if (!post) {
        return NextResponse.json(
          { message: 'Post not found' },
          { status: 404 }
        );
      }
      
      // Read the markdown content
      const filePath = path.join(postsDir, `${post.id}.md`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { content } = matter(fileContent);
      
      return NextResponse.json({
        ...post,
        content,
      });
    }
    
    // Return all posts (without content for listing)
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { message: 'Error fetching blog posts' },
      { status: 500 }
    );
  }
}

// POST handler - create a new blog post
export async function POST(request) {
  try {
    const { title, content, excerpt, published = false, tags = [] } = await request.json();
    
    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { message: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    
    // Create new post metadata
    const id = uuidv4();
    const newPost = {
      id,
      title,
      slug,
      excerpt: excerpt || '',
      tags,
      published,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Create markdown file with frontmatter
    const fileContent = matter.stringify(content, {
      title,
      excerpt,
      tags,
      published,
      date: new Date().toISOString(),
    });
    
    // Save markdown file
    const filePath = path.join(postsDir, `${id}.md`);
    fs.writeFileSync(filePath, fileContent);
    
    // Update posts index
    const posts = readPosts();
    posts.push(newPost);
    writePosts(posts);
    
    return NextResponse.json(
      { message: 'Post created successfully', post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { message: 'Error creating blog post' },
      { status: 500 }
    );
  }
}

// PUT handler - update a blog post
export async function PUT(request) {
  try {
    const { id, title, content, excerpt, published, tags } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { message: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    // Get existing posts
    const posts = readPosts();
    
    // Find the post to update
    const postIndex = posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Generate new slug if title changed
    let slug = posts[postIndex].slug;
    if (title && title !== posts[postIndex].title) {
      slug = title
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
    }
    
    // Update post metadata
    posts[postIndex] = {
      ...posts[postIndex],
      title: title || posts[postIndex].title,
      slug,
      excerpt: excerpt !== undefined ? excerpt : posts[postIndex].excerpt,
      tags: tags || posts[postIndex].tags,
      published: published !== undefined ? published : posts[postIndex].published,
      updatedAt: new Date().toISOString(),
    };
    
    // If content is provided, update the markdown file
    if (content) {
      const filePath = path.join(postsDir, `${id}.md`);
      
      // Read existing file to get frontmatter
      const existingFile = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(existingFile);
      
      // Update frontmatter
      const updatedFrontmatter = {
        ...frontmatter,
        title: title || frontmatter.title,
        excerpt: excerpt !== undefined ? excerpt : frontmatter.excerpt,
        tags: tags || frontmatter.tags,
        published: published !== undefined ? published : frontmatter.published,
        updatedAt: new Date().toISOString(),
      };
      
      // Create new file content
      const fileContent = matter.stringify(content, updatedFrontmatter);
      
      // Save updated file
      fs.writeFileSync(filePath, fileContent);
    }
    
    // Save updated posts index
    writePosts(posts);
    
    return NextResponse.json({
      message: 'Post updated successfully',
      post: posts[postIndex],
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { message: 'Error updating blog post' },
      { status: 500 }
    );
  }
}

// DELETE handler - delete a blog post
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    // Get existing posts
    const posts = readPosts();
    
    // Filter out the post to delete
    const updatedPosts = posts.filter(post => post.id !== id);
    
    // If the length is the same, the post wasn't found
    if (posts.length === updatedPosts.length) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Delete the markdown file
    const filePath = path.join(postsDir, `${id}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Save updated posts index
    writePosts(updatedPosts);
    
    return NextResponse.json({
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { message: 'Error deleting blog post' },
      { status: 500 }
    );
  }
}