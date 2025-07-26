# Voting_System_Backend
A secure and scalable backend for a digital voting platform using **Node.js**, **Express**, and **MongoDB**. This system allows authenticated users to vote once, view real-time results, and enables admin users to manage the candidate list.

![WhatsApp Image 2025-07-23 at 21 05 42_57895f1f](https://github.com/user-attachments/assets/d0ab6294-edbe-42ce-820d-56116f9e2e9e)

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: BcryptJS

---
## 📁 Folder Structure

```
/src/controllers    → Logic of the Backend Workflow  
/src/models         → Mongoose schemas (User, Candidate)
/src/routes         → Express routes (auth, vote, profile, admin)
/src/middleware     → JWT auth & admin validation
.env                → Secrets like Mongo URI, JWT secret
/src/server.js      → Main server file
```
## 🚀 Features

### 👥 User Functionality
- Signup/Login via Aadhar card number and password
- Vote for one candidate only once
- View all candidates and live vote count
- Change password

### 👮 Admin Functionality
- Create, update, delete candidates
- Cannot vote

### 🗳️ Voting System
- Each user can vote only once
- Voting allowed only for non-admin users
- Results visible in descending vote count

---

## 📦 API Endpoints

### 🔐 Auth Routes
| Method | Endpoint         | Description                                    |
|--------|------------------|------------------------------------------------|
| POST   | `/auth/register`   | Register user with Adhar + UserName + password |
| POST   | `/auth/login`    | Login with UserName + password                 |

### 🗳️ Voting Routes
| Method | Endpoint               | Description                      |
|--------|------------------------|---------------------------------|
| GET    | `/candidates`          | Fetch all candidates            |
| POST   | `/vote/:candidateId`   | Vote for a candidate            |
| GET    | `/candidate/:id`       | Sorted live vote count          |


### ⚙️ Admin Routes (Protected)
| Method | Endpoint                         | Description                |
|--------|----------------------------------|----------------------------|
| POST   | `/admin/candidates`              | Add new candidate          |
| PUT    | `/admin/candidates/:id`          | Update a candidate         |
| DELETE | `/admin/candidates/:id`          | Delete a candidate         |

---

## 🛡️ Security Measures

- JWT tokens for secure route access
- Password hashing with bcrypt
- Admin-only access controlled via middleware
- One-person-one-vote enforced by `hasVoted` flag

---

## ✅ Prerequisites

- Node.js and npm
- MongoDB Atlas or local MongoDB
- `.env` file with:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

---


## 📌 License

This project is open-source and free to use.

---
