# Aspo - Educational Platform

## Team Inter - Hackiwha Hackathon Project

Aspo is an innovative educational platform developed by Team Inter for the Hackiwha hackathon. Our platform aims to enhance the learning experience by connecting students with mentors, providing collaborative workspaces, and offering AI-powered learning tools.

## Team Members

- Dounia Rebah
- Maram
- Maria
- Racim Fethallah

## Project Overview

Aspo is designed to revolutionize the educational experience by providing a comprehensive platform that includes:

- **Interactive Classrooms**: Virtual spaces for learning and teaching
- **Study Groups**: Collaborative environments for peer learning
- **Resource Library**: Centralized repository for educational materials
- **Workspace**: Personal area for organizing and managing learning materials
- **AI-Powered Exercises**: Intelligent tools to enhance learning experience

## Technology Stack

### Frontend

- React 19 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- Radix UI components for accessible UI elements
- PDF rendering and manipulation tools

### Backend

- Node.js with Express
- MongoDB for database (via Mongoose)
- JWT for authentication
- Google AI integration for AI-powered features
- Socket.io for real-time communication

## Features

- **User Authentication**: Secure login and registration system
- **Dashboard**: Personalized overview of learning progress and activities
- **Classrooms**: Virtual spaces for instructor-led learning
- **Study Groups**: Collaborative spaces for peer-to-peer learning
- **Resource Library**: Centralized repository for educational materials
- **Workspace**: Personal area for organizing learning materials
- **AI Tools**: AI-powered exercises and learning assistance
- **Real-time Collaboration**: Interactive whiteboard and communication tools

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or bun package manager

### Installation

1. Clone the repository

   ```
   git clone https://github.com/Rics-Dev/Hackiwha.git
   cd hackiwha
   ```

2. Install dependencies for both client and server

   ```
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables

   - Create a `.env` file in the server directory with necessary configuration

4. Start the development servers

   ```
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend development server
   cd ../client
   npm run dev
   ```

## Project Structure

```
/
├── client/               # Frontend React application
│   ├── public/           # Static assets
│   └── src/              # Source code
│       ├── api/          # API integration
│       ├── assets/       # Images and other assets
│       ├── components/   # Reusable UI components
│       ├── contexts/     # React contexts (auth, etc.)
│       ├── lib/          # Utility functions
│       ├── pages/        # Application pages
│       └── types/        # TypeScript type definitions
└── server/               # Backend Node.js application
    └── src/              # Source code
        ├── config/       # Configuration files
        ├── controllers/  # Request handlers
        ├── middleware/   # Express middleware
        ├── models/       # Database models
        ├── routes/       # API routes
        ├── services/     # Business logic
        └── utils/        # Utility functions
```

## License

This project is licensed under the ISC License.
