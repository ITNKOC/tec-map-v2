# TecMap - Friend Location Tracking API


A RESTful API backend for a geolocation-based social platform that enables users to track the location of their friends in real-time.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Technologies](#technologies)
- [Installation](#installation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Friends Management](#friends-management)
- [Position Tracking](#position-tracking)
- [License](#license)

## Overview

TecMap is a backend service that allows users to create accounts, manage friendships, and share their geographic location with selected friends. It provides a robust API for building location-aware social applications.

## Features

- **User Authentication**: Secure registration and login with JWT token-based authentication
- **User Profile Management**: View, update, and delete user profiles
- **Friend Management**: Add, remove, and view friends
- **Location Sharing**: Update and track the geographical positions of friends
- **Position History**: Store position history for future reference
- **User Discovery**: List all registered users with basic information

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user with email, password, username, and fullname
- `POST /auth/login` - Login and receive a JWT token

### User Profile (Me)
- `GET /me` - Get current user profile details
- `PUT /me` - Update current user profile
- `DELETE /me` - Delete current user account

### Friends Management
- `GET /friends` - Get a list of user's friends
- `POST /friends/:friendId` - Add a new friend by ID
- `DELETE /friends/:friendId` - Remove a friend by ID

### Position Tracking
- `PUT /position` - Update user's current position (latitude and longitude)
- `GET /position/friends` - Get the positions of all friends

### User Discovery
- `GET /users` - Get a list of all registered users (basic information)

## Technologies

- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - Object Data Modeling (ODM) for MongoDB
- **JSON Web Token (JWT)** - For secure authentication
- **MongoDB Atlas** - Cloud-hosted MongoDB service

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tec-map.git
   cd tec-map
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the server:
   ```bash
   node app.js
   ```
   
   The server will run on port 5000 by default (http://localhost:5000).

## Database Schema

### User Schema (tecMap)
```javascript
{
  username: String,        // User's username
  fullname: String,        // User's full name
  email: String,           // User's email (unique)
  password: String,        // User's password
  isAdmin: Boolean,        // Administrator flag
  friends: [ObjectId],     // Array of friend user IDs
  position: [ObjectId]     // Array of position IDs
}
```

### Position Schema
```javascript
{
  user: ObjectId,          // Reference to the user
  long: Number,            // Longitude coordinate
  lat: Number              // Latitude coordinate
}
```

## Authentication

The system uses JWT (JSON Web Token) for authentication:

1. **Registration**: New users provide email, password, username, and fullname
2. **Login**: Users authenticate with email and password to receive a JWT token
3. **Authorization**: Protected routes require a valid JWT token in the Authorization header:
   ```
   Authorization: Bearer <your_token_here>
   ```

## Friends Management

The friend system allows users to:
- See a list of their current friends with usernames
- Add new friends using their user ID
- Remove existing friends
- View the real-time positions of all their friends

Key validations:
- Users cannot add themselves as friends
- Users cannot add the same friend twice
- Users can only view positions of their friends

## Position Tracking

The position tracking system enables:
- Updating user's current geographical position (latitude and longitude)
- Retrieving the positions of all friends
- Storing a history of positions for each user

Position data is stored with references to users, allowing for future features like route tracking, location history, and movement analytics.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created by ITNKOC © 2025
