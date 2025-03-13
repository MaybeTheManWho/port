import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, message, contactMethod, email, discord } = data;
    
    // Basic validation
    if (!name || !message) {
      return NextResponse.json({ 
        message: "Name and message are required" 
      }, { status: 400 });
    }
    
    // Contact method validation
    if (contactMethod === 'email' && !email) {
      return NextResponse.json({ 
        message: "Email is required when using email contact method" 
      }, { status: 400 });
    }
    
    if (contactMethod === 'discord' && !discord) {
      return NextResponse.json({ 
        message: "Discord username is required when using Discord contact method" 
      }, { status: 400 });
    }
    
    // Create contact data with timestamp - maintain exact format expected by admin
    const contactData = {
      id: Date.now().toString(),
      name,
      email: contactMethod === 'email' ? email : '',
      message,
      discord: contactMethod === 'discord' ? discord : '',
      contactMethod,
      createdAt: new Date().toISOString()
    };
    
    // File path for the contacts.json file
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'contacts.json');
    
    // Ensure the data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Read existing contacts or create new array - using synchronous APIs for reliability
    let contacts = [];
    try {
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        contacts = JSON.parse(fileData);
        
        // Make sure contacts is an array
        if (!Array.isArray(contacts)) {
          contacts = [];
        }
      }
    } catch (err) {
      console.error('Error reading contacts file:', err);
      // If there's an error reading, we'll just start with an empty array
    }
    
    // Add new contact to the array
    contacts.push(contactData);
    
    // Write the updated contacts back to the file - using synchronous for reliability
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), 'utf8');
    
    return NextResponse.json({ 
      message: "Message sent successfully!" 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ 
      message: "Error processing your request. Please try again." 
    }, { status: 500 });
  }
}