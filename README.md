# 🐾 ProjectPawradise: Pet Management Dashboard

ProjectPawradise is a full-stack MERN application designed for animal shelters and rescues to manage their residents. It features a redundant backend architecture using PM2 and MongoDB for high availability.

## 🚀 Key Features
* **Pet Inventory:** Create, Read, Update, and Delete (CRUD) pet profiles.
* **Redundant Architecture:** Backend clustering with PM2 for self-healing and zero downtime.
* **Database Reliability:** Configured for MongoDB Replica Sets (Atlas or Local).
* **Responsive UI:** Built with React and TanStack Query for smooth data fetching.

---

## 🛠 Tech Stack
* **Frontend:** React, Vite, Axios, TanStack Query (React Query).
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (Mongoose ODM).
* **DevOps:** PM2 (Process Management).

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/ProjectPawradise.git](https://github.com/your-username/ProjectPawradise.git)
cd ProjectPawradise
```
### 2. Backend Setup
```bash
cd server
pnpm install
```
### 3. Frontend Setup
```bash
cd ../client
pnpm install
```
## Running the Project

### Development Mode (Standard)
```bash
# In /server
pnpm dev

# In /client
pnpm dev
```
### Production Mode (Redundant with pm2)
```bash
cd server
pnpx pm2 start src/app.js --name "pawradise-api" -i max
```
## 🔌 API Documentation

| Method | Endpoint           | Description                              |
|-------|--------------------|------------------------------------------|
| GET   | /api/animals       | Fetch all pet profiles.                  |
| POST  | /api/animals       | Add a new pet to the database.           |
| GET   | /api/animals/:id   | Get details of a specific pet.           |
| PUT   | /api/animals/:id   | Update pet information.                  |
| DELETE| /api/animals/:id   | Remove a pet from the records.           |

### Example Request (POST)

**Endpoint:** `/api/animals`  
**Method:** `POST`  
**Content-Type:** `application/json`

```json
{
  "name": "Buddy",
  "species": "Dog",
  "location": "CAS",
  "status": "Healthy"
}
```
