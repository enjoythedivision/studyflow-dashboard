### StudyFlow Dashboard

Live demo: [studyflow-dashboard-client.vercel.app](https://studyflow-dashboard-client.vercel.app)

A small full-stack app for managing personal courses.

#### Demo accounts

- email: `maria.demo@studyflow.test` or `user.demo@studyflow.test`
- password: `TestUser1!`

#### How it works

The React frontend sends requests to an ASP.NET Core Web API.

Authentication uses ASP.NET Core Identity and access tokens.

Every course is linked to its owner on the backend and the API filters courses by the authenticated user and prevents users from viewing, editing, or deleting courses that belong to someone else.

#### Features

- Signup, login, and logout
- Protected dashboard
- User-specific course ownership
- Create, edit, and delete courses
- Search through courses
- Basic stats based on course progress
- Persistent data with SQLite

#### Data flow

Login: access token created  
App loads: check current user session  
Dashboard load/read courses: fetch the authenticated user's courses  
Add/edit/delete: API updates SQLite and React refreshes its state and re-renders the UI

#### Τech stack

- React
- React Router
- ASP.NET Core Web API
- ASP.NET Core Identity
- Entity Framework Core
- SQLite
- REST API
