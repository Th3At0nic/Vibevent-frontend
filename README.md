# 🎉 VibeEvent – Event Management Web Application (Frontend)

VibeEvent is a modern, full-featured Event Management Web Application frontend built using **React**, **TypeScript**, **TailwindCSS**, **Ant Design**, and **React Router**. This project is part of a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that supports **custom authentication**, **dynamic event operations**, **search & filter**, and an intuitive user interface for performance and ease of use.

---

🌐 **Live Site:** [VibeEvent Frontend](https://vibevent-frontend-event-management.vercel.app/)

## 🚀 Features Overview

### ✅ General Features

- Fully responsive and modern UI using **Ant Design** + **TailwindCSS**
- Custom authentication system with **private route protection**
- Dynamic event listing with real-time **join** functionality
- Beautifully designed layout with **gradient navbar**, subtle footer, and smooth transitions

---

## 📁 Pages & Functionality

### 1. 🏠 Home Page

- Custom-designed landing page (still in progress – optional creativity allowed)

---

### 2. 🧭 Navbar

- Logo and Website Name
- Links: `Home`, `Events`, `Add Event`, `My Events`, `Sign In / Profile`
- Shows **Sign In** button if not logged in
- After login, shows **Profile Picture** with a dropdown:
  - User name (not clickable)
  - Logout button
- Automatically highlights active route based on current path

---

### 3. 📅 Events Page (Private Route)

- Displays all events from the database
- Events are sorted by **date (descending)** and **time**
- Each Event Card shows:
  - ✅ Title
  - ✅ Organizer Name
  - ✅ Date & Time (formatted)
  - ✅ Location
  - ✅ Description
  - ✅ Attendee Count
  - ✅ "Join Event" Button
- "Join Event" Button:
  - Disabled if already joined
  - Shows tooltip "Already joined" on hover
- **Search & Filter System:**
  - Filter by:
    - Today
    - This Week
    - Last Week
    - This Month
    - Last Month
  - Search by title

---

### 4. ➕ Add Event Page (Private Route)

- Allows logged-in users to add a new event
- Event fields:
  - Title
  - Description
  - Date and Time (date picker)
  - Location
  - Organizer Name & Email (prefilled if desired)
  - Attendee Count (default 0)
- After form submission:
  - Event is saved to the database (handled via backend API)
  - Success/error handled via toasts
- Form built using **React Hook Form + Ant Design** custom components

---

### 5. 👤 My Events Page (Private Route)

- Shows all events posted by the logged-in user
- Each card includes:
  - Same data as Events page
  - Two buttons:
    - `Update` → opens modal with pre-filled data (form reused from Add Event page)
    - `Delete` → asks confirmation and deletes the event

---

### 6. 🔐 Authentication System

- Custom-built without third-party auth packages
- Login and Registration forms with:
  - Email & Password
  - Name
  - Photo URL
- Clear and descriptive error handling
- After login:
  - Redirects to Home (or will redirect to originally intended private route)

---

## 🛠️ Technologies Used

| Stack         | Tools & Libraries                                 |
| ------------- | ------------------------------------------------- |
| Frontend      | React, TypeScript, Vite                           |
| UI            | TailwindCSS, Ant Design, React Icons              |
| Form Handling | React Hook Form, Zod (for validation), Controller |
| API           | Redux Toolkit Query (RTK Query)                   |
| Auth Storage  | LocalStorage, Bearer Token                        |
| Date Handling | Moment.js                                         |
| Animations    | Framer Motion (used optionally)                   |
| Notification  | Sonner (toast messages)                           |
| Routing       | React Router DOM v6                               |

---

## 🚀 Project Status & Future Plans

✅ Core features are implemented and functional, including custom authentication, event creation, joining, updating, and deletion.

🛠️ This project is actively being improved and will be gradually enhanced to meet **industry-level standards**.

### 🔮 Planned Enhancements

- 🔍 **Advanced Search & Filtering**  
  Add support for filtering by keyword, location, and organizer name with real-time updates.

- 🧠 **Smart Sorting & Pagination**  
  Implement customizable sorting (e.g., by date, popularity) and efficient pagination for scalability.

- 🗓️ **Event Reminders & RSVP System**  
  Allow users to set event reminders and RSVP to events, improving user engagement.

- 📬 **Email Notifications**  
  Send confirmation emails for event registration, cancellations, or updates.

- 🧾 **Event Categories & Tags**  
  Enable category-based event browsing (e.g., Tech, Religious, Cultural) for better discoverability.

- 💬 **Comments & Feedback**  
  Allow attendees to leave feedback or questions on event pages.

- 👥 **User Profiles & Dashboard**  
  Add a profile page with user activity history, upcoming events, and edit options.

- 📈 **Admin Panel**  
  Add role-based access with admin features like user management, event moderation, and analytics.

- 🌍 **Responsive & PWA Support**  
  Make the app installable as a Progressive Web App (PWA) with full offline capabilities.

---

📌 **Goal:** To evolve this into a **production-ready, scalable, and feature-rich event management system** that showcases clean code architecture, real-world UX practices, and robust front-end engineering.

---

## 🔄 Installation & Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/Th3At0nic/Vibevent-frontend.git
   cd vibeevent-frontend
    npm install
   Run the development server
   npm run dev
   ```
