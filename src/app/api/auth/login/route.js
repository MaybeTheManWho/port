import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { ADMIN_CONFIG } from '@/lib/admin-config';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Check if credentials match with stored credentials
    // Using environment variables or a config file for admin credentials
    // In production, you should use a hashed password
    if (username !== ADMIN_CONFIG.username) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password (if using bcrypt for hashing)
    const passwordMatch = await bcrypt.compare(password, ADMIN_CONFIG.hashedPassword);
    
    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create a JWT token
    const token = sign(
      { username },
      ADMIN_CONFIG.jwtSecret,
      { expiresIn: '1d' } // Token expires in 1 day
    );

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}