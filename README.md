#  Post & Comment Service
A simple backend service to create posts and add nested comments, similar to Instagram or Reddit threads.  
Built with **Node.js**, **Express**, **Prisma ORM**, and **MongoDB**.

---
##   Features

### Core Functionality
- Users can **create posts** with title, content, and author.
- Users can **add comments** on posts.
- Supports **nested comments** (replies to replies).

### Comment Features
- Comments are **text-based** by default.
- **Rich text support** (bold, italics, underline, hyperlinks) can be added via Markdown/HTML (bonus).

---

##   Tech Stack

- **Backend**: Node.js + Express  
- **Database ORM**: Prisma (MongoDB)  
- **Database**: MongoDB Atlas (cloud-hosted)  
 

---
##  Database Design

### Post Model
- `id`: Unique identifier  
- `title`, `content`, `author`  
- `comments`: Relation to `Comment`

### Comment Model
- `id`: Unique identifier  
- `content`: Text content (with optional formatting)  
- `author`  
- `postId`: Belongs to a Post  
- `parentId`: Self-relation for nested replies  

---

##  API Endpoints

### Posts
- `POST /posts` → Create a new post  
- `GET /posts` → List all posts  
- `GET /posts/:postId` → Get post with comments

### Comments
- `POST /posts/:postId/comments` → Add a comment (or reply)  
- `GET /posts/:postId/comments` → List comments for a post  

---

##  Setup & Run

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/post-comments-service.git
cd post-comments-service
```
### 2. Install Dependencies 
```bash
npm install
```

### 3. Setup Environment 
```bash 
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/postCommentsDB?retryWrites=true&w=majority"
```

### 4. Setup prisma 
```bash
 npx prisma generate
```

### 5. Run server 
```bash 
npm run dev 
```

## Architecture Overview
- Express.js handles REST APIs.
- Prisma provides schema & database abstraction.
- MongoDB Atlas stores posts and comments.
- Self-relation in Comment model allows infinite nesting of replies.
