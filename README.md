# 🚀 GoVenture - Online Ticket Booking Platform

GoVenture is a full-stack **Online Ticket Booking Platform** built with the **MERN Stack**. The platform allows users to discover and book travel tickets such as **Bus, Train, Launch, and Plane** tickets. It also provides dedicated dashboards for **Users**, **Vendors**, and **Admins** with role-based access control.

---

## 🌐 Live Demo

* **Live Website:** https://go-venture-kappa.vercel.app/
* **Client Repository:** https://github.com/omarfaruq2806/Go-Venture
* **Server Repository:** https://github.com/omarfaruq2806/goventure-server

---

# 📖 Project Purpose

The purpose of this project is to build a complete online ticket booking platform where users can search, filter, and purchase travel tickets securely. Vendors can manage and publish their own tickets, while administrators have full control over users, vendors, tickets, and advertisements.

---

# ✨ Key Features

### 🔐 Authentication

* Better Auth Authentication
* Email & Password Login
* Google Sign In
* Protected Routes
* Persistent Login Session

### 👤 User Features

* Browse all available tickets
* Search tickets by destination
* Filter by transport type
* Sort tickets by price
* Book tickets securely
* Stripe Payment Integration
* View Transaction History
* Responsive User Dashboard

### 🏪 Vendor Features

* Add New Tickets
* Manage Added Tickets
* View Requested Bookings
* Revenue Overview Dashboard
* Cannot add tickets after being marked as Fraud

### 👑 Admin Features

* Manage Users
* Promote Users to Vendor/Admin
* Mark Vendor as Fraud
* Manage Tickets
* Advertise Featured Tickets
* Role Based Dashboard

### 🎨 UI Features

* Fully Responsive Design
* Dark & Light Theme Toggle
* Pagination
* Search & Filter
* Modern Dashboard
* Beautiful DaisyUI Components

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* React
* Tailwind CSS
* DaisyUI
* Lucide React
* React Hook Form
* React Hot Toast

## Backend

* Express.js
* MongoDB
* Better Auth
* Stripe

---

# 📦 NPM Packages Used

### Frontend

* better-auth
* tailwindcss
* daisyui
* lucide-react
* react-hook-form
* react-hot-toast

### Backend

* express
* mongodb
* stripe
* better-auth

---

# 🔑 Environment Variables

## Client (.env.local)

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
BETTER_AUTH_URL=
```

## Server (.env)

```env
PORT=
MONGODB_URI=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

STRIPE_SECRET_KEY=
```

---

# 📂 Installation

## Clone Client

```bash
git clone <client-repository-url>
cd client
npm install
npm run dev
```

## Clone Server

```bash
git clone <server-repository-url>
cd server
npm install
npm run dev
```

---

# 📱 User Roles

### 👤 User

* Book Tickets
* View Transactions
* Manage Profile

### 🏪 Vendor

* Add Tickets
* Manage Tickets
* Revenue Overview
* Requested Bookings

### 👑 Admin

* Manage Users
* Manage Tickets
* Advertise Tickets
* Mark Vendor as Fraud

---

# 💳 Payment Gateway

Stripe Checkout has been integrated for secure online ticket payments.

---

# 🔒 Authentication

Authentication is implemented using **Better Auth**, including:

* Email & Password Authentication
* Google OAuth Login
* Session Management
* Role Based Authorization

---

# 📈 Future Improvements

* Ticket Cancellation
* Refund System
* Email Notifications
* Seat Selection
* Ticket QR Code
* Real-time Booking Status
* Wishlist
* Multi-language Support

---

# 👨‍💻 Author

**Md Omar Faruq**

GitHub: https://github.com/omarfaruq2806

LinkedIn: https://linkedin.com/in/omarfaruk28/

---

# 📄 License

This project is developed for educational and portfolio purposes.
