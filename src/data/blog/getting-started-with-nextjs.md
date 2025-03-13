---
title: "Getting Started with Next.js"
excerpt: "Learn how to set up a Next.js project and create your first pages."
date: "2023-03-01"
tags: ["Next.js", "React", "Tutorial"]
published: true
---

# Getting Started with Next.js

Next.js is a powerful React framework that makes it easy to build server-rendered applications, static websites, and more.

## Setting Up Your First Project

To create a new Next.js project, run the following command in your terminal:

```bash
npx create-next-app my-next-app
```

This will create a new Next.js application in the `my-next-app` directory.

## Project Structure

A basic Next.js project structure looks like this:

```
my-next-app/
├── node_modules/
├── pages/
│   ├── _app.js
│   ├── index.js
├── public/
├── styles/
│   ├── globals.css
│   ├── Home.module.css
├── package.json
├── next.config.js
```

The `pages` directory is where you'll put your application's pages. Each file in this directory automatically becomes a route.

## Creating Your First Page

To create a new page, add a file to the `pages` directory. For example, to create an "About" page, create a file at `pages/about.js`:

```jsx
export default function About() {
  return (
    <div>
      <h1>About Me</h1>
      <p>This is the about page of my Next.js website.</p>
    </div>
  );
}
```

Now, you can navigate to `/about` in your browser to see this page.

## Running Your App

To run your Next.js application in development mode, use the following command:

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`.

## Next Steps

From here, you can explore more of Next.js's features:

- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes
- CSS modules
- Image optimization
- And much more!