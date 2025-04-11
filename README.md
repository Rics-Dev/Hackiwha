# Fullstack Application Template

A modern, production-ready fullstack application template featuring a React frontend and Express backend, both built with TypeScript.

## 📋 Overview

This template provides a complete setup for building full-stack web applications with:

- **Frontend**: React 19 with TypeScript, Vite, and Tailwind CSS
- **Backend**: Express with TypeScript, structured with best practices
- **Development**: Hot Module Replacement (HMR), ESLint, and more
- **Deployment**: Ready-to-deploy configuration for both client and server

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or later recommended)
- npm or another package manager

### Installation

1. Clone this repository
2. Install dependencies for both client and server:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Development

1. Start the backend server:

```bash
cd server
npm run dev
```

2. In a separate terminal, start the frontend development server:

```bash
cd client
npm run dev
```

3. Open your browser and navigate to:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api/v1

## 🏗️ Project Structure

```
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   ├── src/                # Source files
│   │   ├── api/            # API client and utilities
│   │   ├── assets/         # Images, fonts, etc.
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/            # Utility functions and helpers
│   │   ├── pages/          # Page components
│   │   └── types/          # TypeScript type definitions
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.ts      # Vite configuration
│
├── server/                 # Backend Express application
│   ├── src/                # Source files
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions
│   │   ├── app.ts          # Express app setup
│   │   └── server.ts       # Server entry point
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies and scripts
```

## 📦 Features

### Frontend

- **React 19**: Latest version with improved performance
- **TypeScript**: Type safety throughout the application
- **Vite**: Fast development server and optimized builds
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **API Integration**: Pre-configured proxy for backend communication
- **Component Library**: Includes Radix UI primitives

### Backend

- **Express**: Fast, unopinionated web framework
- **TypeScript**: Type safety throughout the application
- **Structured Architecture**: Controllers, services, and routes pattern
- **Error Handling**: Centralized error handling middleware
- **Logging**: Winston logger for application logs
- **Security**: Helmet for securing HTTP headers
- **CORS**: Configured for development and production

## 🛠️ Available Scripts

### Client

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run lint`: Lint the codebase
- `npm run preview`: Preview the production build locally

### Server

- `npm run dev`: Start the development server with hot-reload
- `npm run build`: Build for production
- `npm run start`: Start the production server
- `npm run lint`: Lint the codebase
- `npm run test`: Run tests

## 🔄 API Communication

The frontend is configured to communicate with the backend API through a proxy:

```typescript
// In vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    },
  }
}
```

This allows you to make requests to `/api/*` endpoints from the frontend, which will be automatically proxied to the backend server during development.

## 🚢 Deployment

### Frontend

1. Build the frontend:

```bash
cd client
npm run build
```

2. The build output will be in the `client/dist` directory, which can be deployed to any static hosting service.

### Backend

1. Build the backend:

```bash
cd server
npm run build
```

2. The build output will be in the `server/dist` directory.

3. Start the production server:

```bash
npm run start
```

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
