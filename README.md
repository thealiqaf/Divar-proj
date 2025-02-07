# Divar Clone - Online Advertisement Platform

This project is a **Node.js-based online advertisement platform**, similar to **Divar**. Users can **post ads, browse approved ads, manage their listings**, and **admins can approve or reject ads**.
The platform includes authentication, authorization, pagination, filtering, email verification, and more.

## Features

- **User Authentication** (Register, Login, JWT-based Auth)
- **Admin & User Roles**
- **Post Ads** (With Images, Category & City Selection)
- **Approve/Reject Ads (Admin Only)**
- **Filter & Search Ads** (By Price, Category, City, etc.)
- **Pagination for Ads & Pending Ads**
- **Email Verification for Users**
- **Admin Dashboard Features**
  - View Pending Ads
  - Approve/Reject Ads
  - See Total Pending Ads

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, Bcrypt
- **Email Service:** Nodemailer
- **File Uploads:** Multer
- **API Testing:** Postman

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/divar-clone.git
   cd divar-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. **Run the server**
   ```bash
   npm start
   ```
   The server will start at `http://localhost:3000/`.

## API Routes

### Authentication

| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| POST   | `/api/auth/register`   | Register a new user          |
| POST   | `/api/auth/login`      | Login and receive JWT        |
| POST   | `/api/auth/verify-email` | Verify email after registration |

### Ads

| Method | Endpoint          | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/api/ads/`       | Create a new ad (Authenticated users only) |
| GET    | `/api/ads/`       | Get all approved ads |
| GET    | `/api/ads/:id`    | Get a single ad |
| PATCH  | `/api/ads/:id`    | Edit an ad (Only owner or admin) |
| DELETE | `/api/ads/:id`    | Delete an ad (Only owner or admin) |

### Admin

| Method | Endpoint                | Description             |
|--------|------------------------|-------------------------|
| GET    | `/api/admin/pending-ads` | View all pending ads   |
| PATCH  | `/api/admin/approve/:id` | Approve an ad          |
| PATCH  | `/api/admin/reject/:id`  | Reject an ad           |

### Favorites & Reports

| Method | Endpoint             | Description                         |
|--------|---------------------|-------------------------------------|
| POST   | `/api/favorites/:id` | Add/remove an ad from favorites   |
| POST   | `/api/reports/:id`   | Report an ad                      |

## License

This project is licensed under the **MIT License**.


## Contribution

Contributions are welcome! Feel free to fork the repository, submit issues, or create pull requests.

```
