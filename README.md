# ⚙️ NeoMotors Server

<div align="center">

### Premium Luxury Car Booking Platform — Backend API

Scalable REST API powering the NeoMotors luxury car marketplace built with Express.js, MongoDB, JWT Authentication, and Better Auth integration.

![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge\&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-5-black?style=for-the-badge\&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge\&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

# 📌 Overview

NeoMotors Server is the backend API service for the NeoMotors luxury car booking platform.

This server handles:

* 🔐 Authentication verification
* 🚘 Car data management
* 📅 Booking operations
* 👤 User-specific resources
* 🔎 Search & filtering
* 🗄️ MongoDB database operations
* 🔒 Protected API routes using JWT

The backend is designed using a clean REST architecture with scalable route handling and MongoDB collections.

---

# ✨ Core Features

## 🔐 Authentication & Authorization

* JWT Verification Middleware
* Better Auth integration
* Secure protected routes
* Token-based API access
* JWKS authentication flow

## 🚘 Car Management APIs

* Get all cars
* Get single car details
* Add new cars
* Update existing cars
* Delete cars
* Manage user-added vehicles

## 📅 Booking System APIs

* Create bookings
* Get user bookings
* Delete bookings
* Automatic booking count updates

## 🔎 Search & Filter System

* Search cars by name
* Filter by brand
* MongoDB regex-based search

## 🗄️ Database Features

* MongoDB native driver
* Multiple collections
* Optimized queries
* ObjectId-based document handling

---

# 🧱 Tech Stack

| Category               | Technology        |
| ---------------------- | ----------------- |
| Runtime                | Node.js           |
| Framework              | Express.js 5      |
| Database               | MongoDB           |
| Authentication         | JWT + Better Auth |
| Environment Management | dotenv            |
| CORS Handling          | cors              |

---

# 📂 Project Structure

```bash
neo-motors-server/
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── .env
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/alfaazahmed7/neomotors-server.git
cd neomotors-server
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

CLIENT_URL=http://localhost:3000
```

---

# ▶️ Run the Server

```bash
node index.js
```

Server will run on:

```bash
http://localhost:5000
```

---

# 📡 API Endpoints

## 🚘 Cars APIs

| Method | Endpoint    | Description            |
| ------ | ----------- | ---------------------- |
| GET    | `/cars`     | Get all cars           |
| GET    | `/cars/:id` | Get single car details |
| GET    | `/search`   | Search & filter cars   |

---

## 📅 Booking APIs

| Method | Endpoint              | Protected |
| ------ | --------------------- | --------- |
| POST   | `/booking`            | ✅         |
| GET    | `/booking/:userId`    | ✅         |
| DELETE | `/booking/:bookingId` | ✅         |

---

## 🚗 User Added Cars APIs

| Method | Endpoint           | Protected |
| ------ | ------------------ | --------- |
| POST   | `/add-car`         | ✅         |
| GET    | `/add-car/:userId` | ✅         |
| PATCH  | `/add-car/:id`     | ✅         |
| DELETE | `/add-car/:carId`  | ✅         |

---

# 🔐 Authentication Flow

NeoMotors Server uses JWT verification through Better Auth JWKS.

### Authentication Process

1. User logs in from client application
2. Client receives JWT token
3. Token is sent in Authorization header
4. Server verifies token using JWKS
5. Protected routes become accessible

### Authorization Header Example

```http
Authorization: Bearer your_jwt_token
```

---

# 🗄️ MongoDB Collections

| Collection | Purpose                      |
| ---------- | ---------------------------- |
| `cars`     | Stores available luxury cars |
| `booking`  | Stores booking information   |
| `add-car`  | Stores user-added vehicles   |

---

# 🔎 Search & Filtering

The `/search` endpoint supports:

### Search by Car Name

```bash
/search?search=ferrari
```

### Filter by Brand

```bash
/search?brand=BMW
```

### Combined Search & Filter

```bash
/search?search=mustang&brand=Ford
```

---

# 🛡️ Security Features

* JWT token validation
* Protected middleware routes
* Environment variable protection
* Secure MongoDB connection
* CORS enabled
* Unauthorized request handling
* Forbidden access handling

---

# 🚀 Performance & Architecture

### Backend Design Goals

* Lightweight API structure
* Fast MongoDB queries
* Minimal middleware overhead
* Clean route organization
* Scalable REST architecture

### Optimizations

* MongoDB native driver
* Efficient ObjectId querying
* Regex search optimization
* Incremental booking count updates

---

# 📦 Installed Dependencies

```json
{
  "express": "^5.2.1",
  "mongodb": "^7.2.0",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "jose-cjs": "^6.2.3"
}
```

---

# 🧪 API Testing

You can test the APIs using:

* Postman
* Thunder Client
* Insomnia
* Hoppscotch

---

# 🤝 Contributing

Contributions are welcome.

If you'd like to improve NeoMotors Server:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

# 👨‍💻 Developer

### Alfaaz Ahmed

Full Stack Web Developer focused on building scalable modern web applications using Next.js, MongoDB, Express.js, and modern JavaScript ecosystems.

---

<div align="center">

### ⭐ If you like this project, give it a star on GitHub ⭐

Built with ❤️ using Node.js, Express & MongoDB.

</div>
