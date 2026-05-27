StudyFlow Dashboard / Live demo: https://studyflow-dashboard-client.vercel.app/

This is a small React app for managing personal courses.

Each user can log in, see their own courses, and create, edit, or delete them. The data is stored in a mock backend (json-server), and the app uses localStorage to keep the user session.

How it works

When a user logs in, the app stores the user in localStorage and in React state. If no user is found, the app redirects to the login page.

Once logged in, the dashboard loads only the courses that belong to that user using their userId.

Courses are fetched from the backend, and each course is linked to a user.

Main features

- Login and signup using a fake backend
- Protected dashboard (only accessible when logged in)
- Create, edit, and delete courses
- Search through courses
- Basic stats based on course progress
- Persistent login using localStorage

Data flow

Login -> user stored in state and localStorage  
Dashboard load -> fetch courses by userId  
Add/edit/delete -> update backend and sync state

Tech stack

- React
- React Router
- useState and useEffect
- JSON Server
- localStorage

What I learned

- Handling authentication flow in React
- Connecting React to an API
- CRUD operations with a backend
- Component structure and state management
- Persisting user session in the browser
