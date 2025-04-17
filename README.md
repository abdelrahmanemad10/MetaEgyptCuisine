# Meta Restaurant Website

A modern, elegant website for "Meta" restaurant in Sheikh Zayed, Egypt. Features include menu display, reservation system, online ordering with Stripe integration, and photo gallery.

## Features

- Responsive design for all device sizes
- Interactive menu with item descriptions and prices
- Online reservation system
- Online ordering with Stripe payment integration
- Photo gallery showcasing the restaurant's ambiance and dishes
- Contact information and location map

## Tech Stack

- Frontend: React, TypeScript, TailwindCSS, shadcn/ui components
- Backend: Express.js, Node.js
- Database: In-memory storage (can be easily replaced with PostgreSQL)
- Payment Processing: Stripe

## Deployment to Vercel

### Prerequisites

- A Vercel account
- Git repository with your code
- Stripe account with API keys

### Steps for Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Connect your Git repository to Vercel:
   - Log in to your Vercel account
   - Click "Add New" > "Project"
   - Import your Git repository
   - Select the repository containing the Meta Restaurant website

3. Configure the project:
   - Vercel should automatically detect this as a Node.js project
   - No need to change the build settings as they're defined in package.json and vercel.json

4. Add environment variables:
   - In the Vercel project settings, go to "Environment Variables"
   - Add the following variables:
     ```
     STRIPE_SECRET_KEY=your_stripe_secret_key
     VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
     ```
   - Set the values to your actual Stripe API keys

5. Deploy the project:
   - Click "Deploy"
   - Vercel will build and deploy your application
   - Once complete, you'll receive a URL for your deployed site

### Post-Deployment

After deployment, verify that all features work correctly in the production environment:

1. Test the navigation and responsive design on different devices
2. Verify that the reservation form works
3. Test the order system including the Stripe checkout process
4. Check that all images and styling are loading correctly

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a .env file with the required environment variables (see .env.example)
4. Start the development server: `npm run dev`
5. The application will be available at http://localhost:5000

## License

MIT