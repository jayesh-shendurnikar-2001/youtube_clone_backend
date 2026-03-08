# YouTube Clone - Backend

## 📌 Project Overview

This is the **backend API for the YouTube Clone application** built using **Node.js, Express.js, and MongoDB**.

It provides APIs for:

* User authentication
* Channel management
* Video upload and management
* Comments system
* Secure routes with authentication middleware

The backend connects with the **React frontend** and stores data in **MongoDB**.

Frontend Repository:
https://github.com/jayesh-shendurnikar-2001/youtube_clone_frontend

---

# 🚀 Features

* User Registration & Login
* JWT Authentication
* Create and Manage Channels
* Upload and Manage Videos
* Add Comments to Videos
* Protected Routes using Middleware
* MongoDB Database Integration
* API Structure using MVC Pattern

---

# 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* dotenv

---

# 📂 Project Structure

```
controller
│
├── authController.js
├── channelController.js
├── commentController.js
└── videoController.js

middleware
│
└── authMiddleware.js

models
│
├── Channel.js
├── Comments.js
├── User.js
└── Video.js

routes
│
├── authRoutes.js
├── channelRouter.js
├── commentRoutes.js
└── videoRoutes.js

seed.js
server.js
.env
package.json
```

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash
git clone https://github.com/jayesh-shendurnikar-2001/youtube_clone_backend.git
```

## 2️⃣ Go to project directory

```bash
cd youtube_clone_backend
```

## 3️⃣ Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a **.env** file in the root directory.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# ▶️ Run the Server

Start the development server:

```
npm run dev
```

or

```
node server.js
```

Server will run on:

```
http://localhost:5000
```

---

# 🌐 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Channels

```
POST /api/channels/create
GET /api/channels/:id
PUT /api/channels/edit-channel/:id
```

## Videos

```
POST /api/videos/create
GET /api/videos
GET /api/videos/:id
PUT /api/videos/update/:id
DELETE /api/videos/delete/:id
```

## Comments

```
POST /api/comments/create
GET /api/comments/:videoId
DELETE /api/comments/:id
```

---

# 🧪 Database Seeder

To insert sample data:

```
node seed.js
```

This will create sample:

* Users
* Channels
* Videos
* Comments

---

# 🔐 Authentication

Protected routes use **JWT Token**.

Token must be sent in request headers:

```
Authorization: Bearer <token>
```

Handled by:

```
middleware/authMiddleware.js
```

---

# 👨‍💻 Author

**Jayesh Shendurnikar**

---
