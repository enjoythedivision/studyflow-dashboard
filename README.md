### StudyFlow Dashboard

Live demo: [studyflow-dashboard-client.vercel.app](https://studyflow-dashboard-client.vercel.app)

A small full-stack app for managing personal courses.

#### Try the demo — for recruiters

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

#### Database setup

From the project root, store the Neon PostgreSQL URL unchanged in backend secrets:

```sh
dotnet user-secrets set "DATABASE_URL" 'YOUR_NEON_POSTGRESQL_URL' --project backend/Studyflow.Api
```

Run `npm run dev`. The API applies migrations automatically at startup.
The new database starts empty; create an account using Sign up.

#### Deployment: Render API + Vercel frontend

Push the changes to GitHub. On [Render](https://dashboard.render.com), create a
**Web Service** from this repository with these settings:

| Setting | Value |
| --- | --- |
| Root Directory | `backend/Studyflow.Api` |
| Language | Docker |
| Dockerfile Path | `./Dockerfile` |
| Instance Type | Free |
| Health Check Path | `/health` |
| Environment variable `PORT` | `8080` |
| Environment variable `DATABASE_URL` | The original Neon PostgreSQL URL |

The Dockerfile builds and starts the API. No custom build/start commands are needed.
After deployment, check `https://YOUR_RENDER_HOST/health` for `{"status":"ok"}`.
Store `DATABASE_URL` only in Render's backend environment settings.

On Vercel, use Root Directory `frontend`, build command `npm run build`, and
output directory `dist`. Set `VITE_API_URL` to the Render HTTPS URL, without a trailing
slash or `/api/Courses`, and redeploy the frontend. The existing CORS policy allows
`https://studyflow-dashboard-client.vercel.app`; update it if your frontend domain differs.

[Render Free](https://render.com/docs/free) sleeps after inactivity; the first request
can take about a minute. Database records remain in Neon. An API restart may require
signing in again because the token encryption keys are stored on the API filesystem.
