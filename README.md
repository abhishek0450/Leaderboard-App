# 🏆 Leaderboard Application

A responsive leaderboard application built with React.js frontend and Node.js/Express backend.


### 🚀 **Core Functionality**
- **User Management**: Add new users to the leaderboard system
- **Points System**: Users can claim points (random 1-100 points per claim)
- **Real-time Leaderboard**: Automatic ranking based on total points
- **Dynamic Notifications**: Personalized notifications showing who claimed points
- **Pagination**: Handle large numbers of users with paginated display


## 🛠️ Tech Stack

### **Frontend**
- **React 19.1.0**
- **Tailwind CSS**

### **Backend**
- **Node.js**: JavaScript runtime environment
- **MongoDB**: NoSQL database for data persistence



## 🔌 API Endpoints

### **Base URL**: `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/users` | Get all users | None |
| `POST` | `/users` | Add a new user | `{ "name": "string" }` |
| `GET` | `/leaderboard` | Get ranked leaderboard | None |
| `POST` | `/claim` | Claim points for user | `{ "userId": "string" }` |

### **API Response Examples**

#### Get All Users
```javascript
GET /api/users
Response: [
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "points": 250,
    "rank": 1
  }
]
```

#### Add New User
```javascript
POST /api/users
Body: { "name": "Jane Smith" }
Response: {
  "_id": "507f1f77bcf86cd799439012",
  "name": "Jane Smith", 
  "points": 0
}
```

#### Get Leaderboard
```javascript
GET /api/leaderboard
Response: [
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "points": 250,
    "rank": 1
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "points": 180,
    "rank": 2
  }
]
```

#### Claim Points
```javascript
POST /api/claim
Body: { "userId": "507f1f77bcf86cd799439011" }
Response: {
  "message": "Points claimed successfully",
  "claimedPoints": 75,
  "user": { ... }
}
```
