import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ADMIN_CONFIG } from '@/lib/admin-config';

export async function POST(request) {
  try {
    console.log('Temp login API called');
    const { username, password } = await request.json();
    console.log('Received credentials:', { username, password });

    // Direct comparison for testing only
    if (username !== 'admin' || password !== 'password123') {
      console.log('Invalid credentials provided');
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Credentials matched');

    // Create a JWT token
    const token = sign(
      { username },
      ADMIN_CONFIG.jwtSecret,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    console.log('JWT token created');

    // Set a cookie with the token
    cookies().set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: '/',
    });

    console.log('Cookie set successfully');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}