# Simple Auth Project  

## Overview  
A simple authentication system built with **Node.js, Express, MongoDB, and EJS**.  
The project demonstrates **session-based authentication**, secure password storage, and restricted routes for logged-in users.  

## Tech Stack  
- **Backend:** Node.js, Express  
- **Database:** MongoDB, Mongoose  
- **View Engine:** EJS  
- **Auth & Security:** bcrypt, express-session, connect-mongo, uuid  

## Features  
- User registration with password hashing  
- User login & logout with session-based authentication  
- Dashboard accessible only to authenticated users  
- Email duplication check  
- Password reset flow (with OAuth2 + Nodemailer)  
- Future plans: profile page, password change, Google OAuth login, login attempt limiter  

## API Routes  
| Method | Route       | Description                | Auth Required |  
|--------|------------|----------------------------|---------------|  
| GET    | /register  | Render registration form   | No            |  
| POST   | /register  | Handle registration        | No            |  
| GET    | /login     | Render login form          | No            |  
| POST   | /login     | Handle login               | No            |  
| POST   | /logout    | Handle logout              | Yes           |  
| GET    | /dashboard | Render dashboard page      | Yes           |  

## Key Learnings  
- Learned the difference between **services, middlewares, and utils** in project structure.  
- Gained hands-on experience with **session-based authentication** and secure password handling.  
- Troubleshot real issues (e.g., double-hashing bug in password reset flow).  
- Explored integrating **Google OAuth2 and Nodemailer** for password recovery.  

## Repository  
🔗 [GitHub – simpleAuth](https://github.com/yamwoong/my-project-simpleAuth)  


