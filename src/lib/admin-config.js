// This file stores admin configuration
// In production, these values should be stored in environment variables

export const ADMIN_CONFIG = {
    // Admin username
    username: 'admin',
    
    // This is a pre-hashed password for 'password123'
    hashedPassword: '$2a$10$rWAdMEp7zDCuE8Tn9OyZ3.aNrJBD8sLi1u9K9S7k6gOJh4vTqz2gO',
    
    // JWT secret for signing tokens
    // In production, use a strong, random string
    jwtSecret: 'your_jwt_secret_key_change_this_in_production',
  }
  
  /*
  HOW TO CHANGE YOUR ADMIN PASSWORD:
  
  1. Install bcryptjs if you haven't already:
     npm install bcryptjs
  
  2. Create a file called generate-password-hash.js with the following content:
     ------
     const bcrypt = require('bcryptjs');
     
     // Replace 'your-secure-password' with the password you want to use
     const password = 'your-secure-password';
     
     // Generate a salt and hash the password
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(password, salt);
     
     console.log('Your hashed password:');
     console.log(hash);
     ------
  
  3. Run the script with Node.js:
     node generate-password-hash.js
  
  4. Copy the output hash and replace the value of hashedPassword in this file.
  
  5. Remember to save this file and restart your application.
  */