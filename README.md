# City Cinema Server

This is the backend server for the City Cinema application, responsible for managing users, movies, screenings, and rooms, as well as handling authentication and WebSocket communications.

## Features

- User authentication (login, logout, session handling)
- Movie management (CRUD operations)
- Screening management (CRUD operations, seat reservation)
- Room management
- Send email confirmation for reservations
- Real-time seat updates with WebSocket
- MongoDB integration with Mongoose
- Environment variable configuration
- Seed admin user

## Project Structure

```
/models            # Mongoose models
/routes            # Express route handlers
/seeds             # Database seeding scripts
/config            # Configuration files (e.g. session setup)
/middlewares       # Custom Express middlewares
/websocket.js      # WebSocket server setup
/db.js             # MongoDB connection setup
/server.js         # Main server entry point
.env               # Environment variables (not included in repo)
```

## Environment Variables

Make sure to create a `.env` file with the following variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
SESSION_SECRET=your_session_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLIENT_ORIGIN=https://your-frontend-url.com
PORT=3001
```

## Usage

1. Install dependencies:

```
npm install
```

2. Run the server:

```
node server.js
```

## Development

- All environment variables are loaded via `dotenv`.
- MongoDB connection is handled in `db.js`.
- Seeds are handled in `seeds/seedAdmin.js` and executed on startup.
