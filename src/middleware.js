import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Using jose instead of jsonwebtoken for Edge compatibility

// This middleware runs on every request
export const middleware = async (request) => {
  // Get the pathname from the request
  const { pathname } = request.nextUrl;

  // For development: add a bypass option
  // Check if the request has a bypass query parameter
  const { searchParams } = new URL(request.url);
  const bypass = searchParams.get('bypass') === 'true';
  if (bypass) {
    console.log('Bypassing middleware authentication');
    return NextResponse.next();
  }
  
  // For emergency access using localStorage
  const emergencyHeader = request.headers.get('x-emergency-access');
  if (emergencyHeader === 'true') {
    console.log('Emergency access header detected');
    return NextResponse.next();
  }

  // Only run on admin dashboard routes, not the login page
  if (pathname.startsWith('/administrator/dashboard')) {
    console.log('Middleware triggered for path:', pathname);
    
    // DEVELOPMENT BYPASS - REMOVE IN PRODUCTION
    console.log('DEVELOPMENT MODE: Bypassing JWT verification');
    return NextResponse.next();
    
    // The code below would be used in production to properly verify JWT
    /*
    // Get the admin_token cookie
    const cookie = request.cookies.get('admin_token');
    
    // Check if the cookie exists
    if (!cookie || !cookie.value) {
      console.log('No admin_token cookie found, redirecting to login');
      // Redirect to login page if no token is found
      return NextResponse.redirect(new URL('/administrator', request.url));
    }

    try {
      // Verify the JWT token using jose instead of jsonwebtoken
      // NOTE: This code is commented out for now since we're bypassing verification in development
      const jwtSecret = new TextEncoder().encode('your_jwt_secret_key_change_this_in_production');
      await jwtVerify(cookie.value, jwtSecret);
      console.log('JWT token verified successfully');
      
      // If token is valid, allow the request to proceed
      return NextResponse.next();
    } catch (error) {
      console.log('JWT verification failed:', error.message);
      // If token is invalid (expired, tampered), redirect to login
      return NextResponse.redirect(new URL('/administrator', request.url));
    }
    */
  }

  // For all other routes, proceed normally
  return NextResponse.next();
};

// Configure which paths this middleware will run on
export const config = {
  matcher: ['/administrator/dashboard/:path*'],
};