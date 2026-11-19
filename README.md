### StudyFlow Dashboard

Live demo: [studyflow-dashboard-client.vercel.app](https://studyflow-dashboard-client.vercel.app)

A small full-stack app for managing personal courses.

#### Demo

Open the [live dashboard](https://studyflow-dashboard-client.vercel.app) and sign in with either account:

| Account | Email | Password |
| --- | --- | --- |
| Demo 1 | `maria.demo@studyflow.test` | `TestUser1!` |
| Demo 2 | `user.demo@studyflow.test` | `TestUser1!` |

The demo accounts were seeded with four sample courses each, with different progress levels,
difficulties, and study notes. The accounts have separate course lists,
demonstrating user-specific ownership.

Try searching for a course, editing its progress, or adding a new course to see
the dashboard and statistics update. These are shared demo accounts, so their
contents can change as visitors try the app.

#### How it works

The React frontend sends requests to an ASP.NET Core Web API.

Authentication uses ASP.NET Core Identity and access tokens.

Each user can view and manage only their own courses.

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

#### Local setup

Prerequisites:

- Node.js 22.12+ and npm
- .NET 10 SDK
- PostgreSQL running locally, with access to the `createdb` command

##### 1. Clone and install

```bash
git clone https://github.com/enjoythedivision/studyflow-dashboard.git
cd studyflow-dashboard
cd frontend
npm ci
```

##### 2. Configure the database

Create an empty database using your PostgreSQL username:

```bash
createdb -U YOUR_POSTGRES_USER studyflow
```

From the repository root, configure the API connection using .NET User Secrets.
Replace the username and password with your local PostgreSQL credentials:

```bash
cd backend/Studyflow.Api
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=studyflow;Username=YOUR_POSTGRES_USER;Password=YOUR_POSTGRES_PASSWORD"
```

The API also supports a `DATABASE_URL` environment variable, which takes
precedence over `ConnectionStrings:DefaultConnection` if it is set.

##### 3. Start the backend

From `backend/Studyflow.Api`:

```bash
dotnet restore
dotnet run --launch-profile http
```

The API runs at `http://localhost:5067`. Existing Entity Framework migrations
are applied automatically on startup to create the required tables.

You can check the API at `http://localhost:5067/health` and explore its Swagger
UI at `http://localhost:5067/swagger` while running in Development.

##### 4. Start the frontend

Create `frontend/.env.local` with:

```env
VITE_API_URL=http://localhost:5067
```

In a second terminal, from the repository root:

```bash
cd frontend
npm run dev -- --port 5173 --strictPort
```

Open `http://localhost:5173`, create an account through Sign up, then log in
and add your courses. A fresh local database starts empty; the demo accounts
listed above belong to the hosted demo and are not seeded automatically.

Restart the frontend after changing `.env.local`.

##### Frontend checks

From `frontend`:

```bash
npm run lint
npm run build
```
