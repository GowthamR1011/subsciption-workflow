# Subscription Workflow API

A robust RESTful API for managing user subscriptions and authentication built with Node.js, Express, and MongoDB.

## Features

- User Authentication (JWT-based)
- User Management
- Subscription Management
- Error Handling Middleware
- MongoDB Database Integration
- Environment-based Configuration
- Cookie-based Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone "https://github.com/GowthamR1011/subsciption-workflow.git"
cd subscription-workflow
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Setup `.env.development.local` to `.env` for development
   - Setup `.env.production.local` to `.env` for production

## Project Structure

```
├── config/             # Configuration files
├── controllers/        # Route controllers
├── database/          # Database connection and setup
├── middlewares/       # Custom middleware
├── models/           # Database models
├── routes/           # API routes
├── app.js            # Main application file
└── package.json      # Project dependencies
```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with nodemon

## API Endpoints

### Authentication
- `POST /api/v1/auth/register`: Register a new user
- `POST /api/v1/auth/login`: Login user
- `POST /api/v1/auth/logout`: Logout user

### Users
- `GET /api/v1/users`: Get all users
- `GET /api/v1/users/:id`: Get user by ID
- `PUT /api/v1/users/:id`: Update user
- `DELETE /api/v1/users/:id`: Delete user

### Subscriptions
- `GET /api/v1/subscriptions`: Get all subscriptions
- `POST /api/v1/subscriptions`: Create new subscription
- `GET /api/v1/subscriptions/:id`: Get subscription by ID
- `PUT /api/v1/subscriptions/:id`: Update subscription
- `DELETE /api/v1/subscriptions/:id`: Delete subscription

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- bcryptjs for Password Hashing
- dotenv for Environment Variables
- ESLint for Code Linting

## Error Handling

The application includes a centralized error handling middleware that processes all errors and returns appropriate HTTP status codes and error messages.

## Security Features

- JWT-based Authentication
- Password Hashing
- Cookie-based Session Management
- Environment Variable Protection
- Input Validation





