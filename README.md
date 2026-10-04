# DocAppoint — Doctor Appointment Booking System

**Live Site:** https://docappoint.vercel.app _(update after deployment)_

## ✨ Features

- **Browse Doctors** — View all available doctors with specialty, hospital, rating, and fee information.
- **Secure Authentication** — Email/password + Google OAuth via Better Auth with JWT-based session management.
- **Appointment Booking** — Book appointments with a clean modal form; data saved to MongoDB.
- **Dashboard** — Manage your bookings (update/delete) and view/edit your profile, all in real time.
- **Doctor Search** — Search appointments by doctor name, specialty, or hospital name with instant filtering.
- **Sorting** — Sort all appointments by rating or consultation fee.
- **Fully Responsive** — Mobile-first design that works across all screen sizes.

## 🛠 Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4, HeroUI
- **Auth:** Better Auth with JWT plugin + Google OAuth
- **Database:** MongoDB (via server API)
- **UI Libraries:** react-hot-toast, react-icons, react-hook-form, react-spinners, Swiper.js

## 🚀 Getting Started

1. Copy `.env.example` to `.env.local` and fill in your values
2. `npm install`
3. `npm run dev`
