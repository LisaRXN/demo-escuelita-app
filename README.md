# 🌱 Volunteer Management App

![Next.js](https://img.shields.io/badge/Next.js-14-blue)
![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748)
![TanStack Query](https://img.shields.io/badge/Fetch-TanStack%20Query-yellowgreen)


A modern web application to organize and manage volunteer sessions, streamline sign-ups, and track participation.  
Built to simplify coordination while providing a smooth experience for both admins and volunteers.

## ✨ Demo

🔗 [https://demo.laescuelita-app.org](https://demo.laescuelita-app.org)

---

## 🚀 Key Features

### 👥 User Management
- Authentication powered by [Clerk](https://clerk.dev)
- User roles: **admin** / **volunteer**
- Dedicated admin interface for coordinators

### 🗓 Volunteer Sessions
- Session creation and display
- One-click volunteer registration
- Capacity control
- Attendance tracking

### 🛠 Admin Tools
- View registered volunteers per session
- Update attendance status in real time
- Cancel registrations if needed
- Instant UI feedback (toast notifications)

### 📦 Tech Stack

| Layer        | Tech                          |
|--------------|-------------------------------|
| Frontend     | Next.js (App Router)          |
| UI Fetching  | TanStack Query                |
| Validation   | Zod                           |
| Auth         | Clerk                         |
| Backend      | Server Actions (Next.js 14)   |
| Database     | PostgreSQL + Prisma           |


---

## 🙋‍♀️ About the Project

This project was built by Lisa Eriksen as part of an initiative to help coordinate more effectively the educational and community volunteer work of the NGO La Escuelita. The platform is designed to empower small teams to simplify registration, reduce no-shows, and make participation easy and motivating for everyone involved.

---

## 🛠 Local Setup

1. **Clone the repo**  
```bash
git clone https://github.com/your-username/volunteer-app.git
cd volunteer-app
npm install
npm run dev
```
2. **Install dependencies
```bash
npm install
```
3. **Create environment variables
```bash
DATABASE_URL=your_database_url
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```
4. **Run the development server
```bash
npm run dev
```

