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
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // COURSES (PER USER)
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/courses?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [user]);

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

  // CREATE COURSE (API)
  const handleAddCourse = (e) => {
    e.preventDefault();

    if (editingId) {
      //EDIT
      fetch(`http://localhost:3000/courses/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...course,
          userId: user.id,
          id: editingId,
        }),
      })
        .then((res) => res.json())
        .then((updatedCourse) => {
          setCourses((prev) =>
            prev.map((c) => (c.id === editingId ? updatedCourse : c)),
          );
        });

      setEditingId(null);
    } else {
      //ADD NEW
      fetch("http://localhost:3000/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...course,
          userId: user.id,
        }),
      })
        .then((res) => res.json())
        .then((newCourse) => {
          setCourses((prev) => [...prev, newCourse]);
        });
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

  // DELETE COURSE (API)
  const handleDeleteCourse = (id) => {
    fetch(`http://localhost:3000/courses/${id}`, {
      method: "DELETE",
    }).then(() => {
      setCourses(courses.filter((course) => course.id !== id));
    });
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
              <Header search={search} setSearch={setSearch} />

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
