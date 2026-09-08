#### StudyFlow Dashboard

This is a small full-stack app for managing personal courses.

Each user can create an account, log in, and manage their own courses. Courses are stored in a SQLite database and are only available to the user who created them.

#### How it works

The React frontend sends requests to an ASP.NET Core Web API.

Authentication is handled with ASP.NET Core Identity and cookies. When the app loads, it checks whether the user has an active session before showing the dashboard.

Every course is linked to its owner on the backend. The API filters courses by the authenticated user and prevents users from viewing, editing, or deleting courses that belong to someone else.

#### Main features

- Signup, login, and logout
- Protected dashboard
- User-specific course ownership
- Create, edit, and delete courses (CRUD)
- Search through courses
- Basic stats based on course progress
- Persistent data with SQLite

#### Data flow

Login -> authentication cookie created  
App load -> check current user session  
Dashboard load -> fetch the authenticated user's courses  
Add/edit/delete -> API updates SQLite and React refreshes its state

#### Tech stack

- React
- React Router
- ASP.NET Core Web API
- ASP.NET Core Identity
- Entity Framework Core
- SQLite
- REST API
