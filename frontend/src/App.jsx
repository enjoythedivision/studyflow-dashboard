import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import CourseForm from "./components/CourseForm";
import StatsSection from "./components/StatsSection";
import CourseList from "./components/CourseList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  // USER (AUTH)
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser || savedUser === "undefined") {
        localStorage.removeItem("user");
        return null;
      }

      const parsed = JSON.parse(savedUser);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (error) {
      localStorage.removeItem("user");
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // COURSES (PER USER - LOCAL ONLY)
  const [courses, setCourses] = useState([]);

  // COURSE FORM STATE
  const [course, setCourse] = useState({
    title: "",
    progress: 0,
    difficulty: "Beginner",
    notes: "",
  });

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // HANDLERS
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE COURSE (LOCAL ONLY)
  const handleAddCourse = (e) => {
    e.preventDefault();

    if (editingId) {
      // EDIT
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingId ? { ...course, id: editingId, userId: user.id } : c
        )
      );
      setEditingId(null);
    } else {
      // ADD NEW
      const newCourse = {
        ...course,
        id: Date.now(),
        userId: user.id,
      };
      setCourses((prev) => [...prev, newCourse]);
    }

    setCourse({
      title: "",
      progress: 0,
      difficulty: "Beginner",
      notes: "",
    });
  };

  const handleEditCourse = (courseToEdit) => {
    setCourse(courseToEdit);
    setEditingId(courseToEdit.id);
  };

  // DELETE COURSE (LOCAL ONLY)
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleClearCourses = () => {
    // optional local-only clear
    setCourses([]);
  };

  // FILTERING
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()),
  );

  // STATS
  const overallProgress = () => {
    if (courses.length === 0) return 0;

    let total = 0;
    for (let i = 0; i < courses.length; i++) {
      total += Number(courses[i].progress);
    }

    return Math.round(total / courses.length);
  };

  const completedCourses = () => {
    let total = 0;

    for (let i = 0; i < courses.length; i++) {
      if (courses[i].progress == 100) total++;
    }

    return total;
  };

  console.log("USER:", user);
  // ROUTING
  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />

      <Route path="/signup" element={<Signup setUser={setUser} />} />

      <Route
        path="/"
        element={
          user ? (
            <>
              <Header
                search={search}
                setSearch={setSearch}
                user={user}
                setUser={setUser}
              />
              <main className="dashboard">
                <StatsSection
                  courses={courses}
                  overallProgress={overallProgress}
                  completedCourses={completedCourses}
                />

                <div className="dashboard-content">
                  <section className="form-section">
                    <h2>Add New Course</h2>
                    <CourseForm
                      course={course}
                      editingId={editingId}
                      handleChange={handleChange}
                      handleAddCourse={handleAddCourse}
                    />
                  </section>

                  <CourseList
                    courses={filteredCourses}
                    handleEditCourse={handleEditCourse}
                    handleDeleteCourse={handleDeleteCourse}
                    handleClearCourses={handleClearCourses}
                  />
                </div>
              </main>

              <Footer />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
