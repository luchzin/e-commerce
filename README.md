# 🛒 Next.js E-Commerce Platform

![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=flat&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue?style=flat&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Under%20Development-orange)

A **full-featured e-commerce platform** built with Next.js, allowing users to sign up as buyers, sellers, or both.  
Sellers can list products, manage inventory, and view sales, while buyers can browse, purchase, review items, and track orders.

---

## 🚀 Features

### ✅ User Authentication

- Email/password registration & login
- OAuth (Google, Facebook) integration
- Role system (buyer/seller/both)

### ✅ Seller Features

- Create, edit, and manage product listings
- Upload multiple product images
- Track inventory and sales
- View order history

### ✅ Buyer Features

- Browse and search products
- Add to cart and checkout
- Leave reviews and ratings
- Wishlist functionality

### ✅ Core Functionality

- Responsive design (mobile-friendly)
- Secure payment processing (Stripe / PayPal)
- Order tracking
- Admin dashboard

---

## 🗄 Database Schema

### **User Table**

| Field            | Type     | Constraints                   |
| ---------------- | -------- | ----------------------------- |
| `_id`            | ObjectId | Primary Key                   |
| `username`       | String   | NOT NULL                      |
| `email`          | String   | UNIQUE, NOT NULL              |
| `password`       | String   | NULLABLE                      |
| `phone_number`   | String   | NULLABLE                      |
| `avatar_url`     | String   | NULLABLE                      |
| `bio`            | String   | NULLABLE                      |
| `created_at`     | DateTime | DEFAULT current timestamp     |
| `updated_at`     | DateTime | AUTO UPDATE on modification   |
| `social_link_id` | ObjectId | Foreign Key → SocialLink.\_id |

---

### **SocialLink Table**

| Field        | Type     | Constraints               |
| ------------ | -------- | ------------------------- |
| `_id`        | ObjectId | Primary Key               |
| `created_at` | DateTime | DEFAULT current timestamp |
| `updated_at` | DateTime | AUTO UPDATE               |
| `facebook`   | String   | NULLABLE                  |
| `instagram`  | String   | NULLABLE                  |
| `twitter`    | String   | NULLABLE                  |
| `telegram`   | String   | NULLABLE                  |

---

### **Product Table**

| Field          | Type        | Constraints               |
| -------------- | ----------- | ------------------------- |
| `_id`          | ObjectId    | Primary Key               |
| `created_at`   | DateTime    | DEFAULT current timestamp |
| `updated_at`   | DateTime    | AUTO UPDATE               |
| `creator_id`   | ObjectId    | Foreign Key → Users.\_id  |
| `description`  | String      | NOT NULL                  |
| `price`        | Number      | NOT NULL                  |
| `images`       | [String]    | Array of image URLs       |
| `stock`        | Number      | Default: 0                |
| `category`     | String      | NOT NULL                  |
| `rating`       | Number(0-5) | Default: 0                |
| `reviewsCount` | Number      | Default: 0                |

---

### **ProductReview Table**

| Field         | Type     | Constraints               |
| ------------- | -------- | ------------------------- |
| `_id`         | ObjectId | Primary Key               |
| `created_at`  | DateTime | DEFAULT current timestamp |
| `updated_at`  | DateTime | AUTO UPDATE               |
| `reviewer_id` | ObjectId | Foreign Key → Users.\_id  |
| `content`     | String   | NOT NULL                  |
| `like`        | Number   | Default: 0                |

---

## 🛠 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** Next.js API Routes
- **Database:** [MongoDB](https://www.mongodb.com/) (with Mongoose)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Payments:** [Stripe](https://stripe.com/) / [PayPal](https://www.paypal.com/)

---

## ⚡ Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/luchzin/e-commerce.git
   cd nextjs-ecommerce
   ```
