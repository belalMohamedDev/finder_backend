# 🔍 Finder - Missing Persons & Found Items Management System

A comprehensive Node.js backend API for managing missing persons reports and found items with AI-powered image analysis and real-time notifications.

## ✨ Key Features

- 🔐 **User Authentication & Authorization** - JWT-based secure authentication system
- 👤 **User Management** - Complete user profile management with image uploads
- 🚨 **Missing Persons Reports** - Create and manage missing person alerts with AI analysis
- 🔍 **Found Items Management** - Track and report found items with location details
- 🤖 **AI Integration** - Automated image analysis for missing person reports
- 📱 **Push Notifications** - Real-time Firebase notifications for nearby alerts
- 📍 **Location-Based Alerts** - Address-based notification system
- 🖼️ **Image Processing** - Automatic image optimization and storage
- 📊 **Notification System** - Comprehensive notification tracking and management
- 🐳 **Docker Support** - Containerized deployment with Docker and Docker Compose
- 🔧 **Environment Configuration** - Flexible environment-based configuration

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing and security
- **Multer** - File upload handling
- **Sharp** - Image processing and optimization
- **Morgan** - HTTP request logger
- **Express Validator** - Input validation and sanitization

### AI & Notifications

- **Firebase Admin** - Push notification service
- **Axios** - HTTP client for AI service communication
- **Custom AI Service** - External AI analysis service

### Development & Deployment

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancing
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Nodemon** - Development server with auto-reload

## 📁 Project Structure

```
finder/
├── 📁 src/
│   ├── 📁 config/
│   │   ├── 📁 mongoDb/          # Database configuration
│   │   └── 📁 firebase/         # Firebase configuration
│   ├── 📁 middleware/           # Express middleware
│   ├── 📁 modules/              # MongoDB models
│   │   ├── userModel.js         # User schema and logic
│   │   ├── missingModel.js      # Missing person schema
│   │   ├── findModel.js         # Found item schema
│   │   └── notificationModel.js # Notification schema
│   ├── 📁 routes/               # API route definitions
│   │   ├── authRoute.js         # Authentication routes
│   │   ├── userRoute.js         # User management routes
│   │   ├── missingRoute.js      # Missing person routes
│   │   ├── findRoute.js         # Found item routes
│   │   └── notificationRoute.js # Notification routes
│   ├── 📁 services/             # Business logic
│   │   ├── authService.js       # Authentication logic
│   │   ├── UserService.js       # User management logic
│   │   ├── missingService.js    # Missing person logic
│   │   ├── findService.js       # Found item logic
│   │   └── notificationService.js # Notification logic
│   ├── 📁 utils/                # Utility functions
│   ├── 📁 uploads/              # File upload directory
│   └── server.js                # Main application entry point
├── 📁 ai/                       # AI service integration
├── 📁 nginx/                    # Nginx configuration
├── 📄 config.env                # Environment variables
├── 📄 package.json              # Dependencies and scripts
├── 📄 Dockerfile                # Docker configuration
├── 📄 docker-compose.yml        # Multi-container setup
└── 📄 .eslintrc.json           # ESLint configuration
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Docker & Docker Compose (for containerized deployment)
- Firebase project (for push notifications)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd finder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `config.env` file in the root directory:

```env
# Server Configuration
PORT=8080
NODE_ENV=development
BASE_URL=http://localhost:4040

# Database Configuration
DB_URL=

# JWT Configuration
JWT_SECRET_KEY=
JWT_EXPIER_TIME=

# Firebase Configuration (for notifications)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
```

### 4. Run the Application

#### Development Mode

```bash
npm run start:dev
```

#### Production Mode

```bash
npm run start:prod
```

### 5. Docker Deployment (Optional)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in production mode
docker-compose -f docker-compose.prod.yml up --build
```

## 🔐 API Authentication

The application uses **JWT (JSON Web Tokens)** for authentication:

### Authentication Flow

1. **Register/Login** - Users authenticate via `/v1/api/auth` endpoints
2. **Token Generation** - JWT tokens are generated with configurable expiration
3. **Protected Routes** - Include `Authorization: Bearer <token>` header
4. **Token Validation** - Middleware validates tokens on protected endpoints

### Example Authentication Header

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### JWT Configuration

- **Secret Key**: Configurable via `JWT_SECRET_KEY`
- **Expiration**: Configurable via `JWT_EXPIER_TIME` (default: 90 days)
- **Algorithm**: HS256

## 🌍 Localization

The application supports localization through:

- **Error Messages**: Localized error responses
- **Validation Messages**: Customizable validation error messages
- **Notification Content**: Localized push notification content

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=4040
BASE_URL=https://your-domain.com
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/finder
JWT_SECRET_KEY=production-secret-key
```

### Docker Production Deployment

```bash
# Build production image
docker build -t finder-backend:prod .

# Run with production compose
docker-compose -f docker-compose.prod.yml up -d
```

### Nginx Configuration

The project includes Nginx configuration for:

- Reverse proxy setup
- Load balancing
- Static file serving
- SSL termination (configure as needed)

## 📚 API Examples

### User Registration

```http
POST /v1/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "+1234567890",
  "password": "securepassword123",
  "address": "123 Main St, City, Country"
}
```

### Create Missing Person Report

```http
POST /v1/api/missing
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data

{
  "name": "Jane Doe",
  "age": 25,
  "address": "456 Oak Ave, City, Country",
  "clothesLastSeenWearing": "Blue jeans, white shirt",
  "description": "Last seen at the mall",
  "image": <file-upload>
}
```

### Report Found Item

```http
POST /v1/api/find
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data

{
  "address": "789 Pine St, City, Country",
  "description": "Found a red backpack",
  "image": <file-upload>
}
```

## 🔧 Environment Variables Documentation

| Variable          | Description               | Default               | Required |
| ----------------- | ------------------------- | --------------------- | -------- |
| `PORT`            | Server port               | 8080                  | No       |
| `NODE_ENV`        | Environment mode          | development           | No       |
| `BASE_URL`        | Base URL for image URLs   | http://localhost:4040 | Yes      |
| `DB_URL`          | MongoDB connection string | -                     | Yes      |
| `JWT_SECRET_KEY`  | JWT signing secret        | -                     | Yes      |
| `JWT_EXPIER_TIME` | JWT expiration time       | 90d                   | No       |

## 📞 Contact Information

### Developer Details

- **Email**: [belalagwa0@gmail.com]
- **Phone**: [01069225923]


### Project Support

For technical support, bug reports, or feature requests, please contact the developer or create an issue in the project repository.


---

**Built with ❤️ for helping communities find missing loved ones and return lost items to their owners.**
