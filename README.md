### StudyFlow Dashboard

Live demo: [studyflow-dashboard-client.vercel.app](https://studyflow-dashboard-client.vercel.app)

A small full-stack app for managing personal courses.

#### Demo accounts

- email: `maria.demo@studyflow.test` or `user.demo@studyflow.test`
- password: `TestUser1!`

#### How it works

The React frontend sends requests to an ASP.NET Core Web API.

Authentication uses ASP.NET Core Identity and cookies. When the app loads, it checks whether the user has an active session before showing the dashboard.

Every course is linked to its owner on the backend. The API filters courses by the authenticated user and prevents users from viewing, editing, or deleting courses that belong to someone else.

#### Features

- signup, login, and logout
- protected dashboard
- user-specific course ownership
- create, edit, and delete courses
- search through courses
- basic stats based on course progress
- persistent data with SQLite

#### Data flow

Login → authentication cookie created  
App load → check current user session  
Dashboard load → fetch the authenticated user's courses  
Add/edit/delete → API updates SQLite and React refreshes its state

#### tech stack

- React
- React Router
- ASP.NET Core Web API
- ASP.NET Core Identity
- Entity Framework Core
- SQLite
- REST API
