#!/usr/bin/env node

/**
 * This script helps prepare the project for Vercel deployment
 * It ensures that the client build folder is properly configured 
 * and that all necessary files are in place
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Print a message to the console
function log(message) {
  console.log(`[Build] ${message}`);
}

// Copy a file from source to destination
function copyFile(source, dest) {
  try {
    const data = fs.readFileSync(source, 'utf8');
    fs.writeFileSync(dest, data, 'utf8');
    log(`Copied ${source} to ${dest}`);
  } catch (error) {
    log(`Error copying file: ${error}`);
    process.exit(1);
  }
}

// Main build function
async function build() {
  log('Starting build process for Vercel deployment...');
  
  try {
    // Run the regular build command
    log('Building the application...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Make sure client/dist exists
    const distDir = path.resolve(__dirname, 'client', 'dist');
    if (!fs.existsSync(distDir)) {
      log('Error: client/dist directory not found after build');
      process.exit(1);
    }
    
    // Create a Vercel specific _redirects file if it doesn't exist
    const redirectsPath = path.join(distDir, '_redirects');
    if (!fs.existsSync(redirectsPath)) {
      log('Creating _redirects file for SPA routing...');
      fs.writeFileSync(redirectsPath, '/* /index.html 200', 'utf8');
    }
    
    // Ensure the .vercel folder exists for proper deployments
    const vercelDir = path.resolve(__dirname, '.vercel');
    if (!fs.existsSync(vercelDir)) {
      fs.mkdirSync(vercelDir, { recursive: true });
      log('Created .vercel directory');
    }
    
    log('Build completed successfully! Ready for Vercel deployment');
  } catch (error) {
    log(`Build failed: ${error}`);
    process.exit(1);
  }
}

// Run the build
build().catch(error => {
  log(`Unhandled error: ${error}`);
  process.exit(1);
});