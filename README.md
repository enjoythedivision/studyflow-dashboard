### StudyFlow Dashboard

Live demo: [studyflow-dashboard-client.vercel.app](https://studyflow-dashboard-client.vercel.app)

A small full-stack app for managing personal courses.

#### Demo

Open the [live dashboard](https://studyflow-dashboard-client.vercel.app) and sign in with either account:

| Account | Email | Password |
| --- | --- | --- |
| Demo 1 | `maria.demo@studyflow.test` | `TestUser1!` |
| Demo 2 | `user.demo@studyflow.test` | `TestUser1!` |

Each account has four sample courses with different progress levels,
difficulties, and study notes. The accounts have separate course lists,
demonstrating user-specific ownership.

Try searching for a course, editing its progress, or adding a new course to see
the dashboard and statistics update. These are shared demo accounts, so their
contents can change as visitors try the app.

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
- Persistent data with PostgreSQL on Neon

#### Data flow

Login: access token created  
App loads: check current user session  
Dashboard load/read courses: fetch the authenticated user's courses  
Add/edit/delete: API updates PostgreSQL and React refreshes its state and re-renders the UI

#### Τech stack

- React
- React Router
- ASP.NET Core Web API
- ASP.NET Core Identity
- Entity Framework Core
- PostgreSQL (Neon)
- REST API
