# Eventrr - Event Management Platform

## Overview

Eventrr is a MERN stack event management application that allows users to create, manage, and join events seamlessly. It provides real-time updates, role-based access, and a smooth user experience.

## Deployment

**Frontend URL:** [https://eventrr.vercel.app](https://eventrr.vercel.app)

Backend URL: [https://eventr-b.onrender.com](https://eventr-b.onrender.com)



### Frontend

- **User Authentication:** Secure authentication with login, registration, and guest login.
- **Event Dashboard:** View upcoming and past events, search by title of events or categories.
- **Event Creation:** Form-based event creation with title, description, date, category, image upload, and location.
- **Real-Time Updates:** Shows updated attendee count and prevents same user from joining again.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views.

### Backend

- **Authentication API:** JWT-based authentication (for token).
- Password Hashing: Using bcryptjs
- **Event Management API:** CRUD operations for event handling with ownership restrictions (users can edit or delete event created by them, and only join or leave events created by others).
- **Real-Time Updates:** WebSocket integration for live attendee tracking.
- **Database:** MongoDB Atlas for event and user data storage.
- **Image Hosting:** Cloudinary for event images.

## Tech Stack

- **Frontend:** (Vite) React.js, JavaScript, Tailwind CSS, React Icons, React Hot Toast
- **Backend:** Node.js, Express.js, bcryptjs, JWT
- **Database:** MongoDB Atlas
- **Hosting:** Vercel (Frontend), Render (Backend)
- **Real-Time Attendee List update:** Socket.IO
- **Image Hosting:** Cloudinary


## User Credentials

- **Test User:**
  ```sh
  Email: test@email.com
  Password: 123456
  ```

## Contribution

Feel free to fork the repository and create a pull request for improvements.

## License

This project is open-source and available under the MIT License.

