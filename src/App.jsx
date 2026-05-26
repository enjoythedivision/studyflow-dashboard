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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const [course, setCourse] = useState({
    title: "",
    progress: 0,
    difficulty: "Beginner",
    notes: "",
  });

  const [search, setSearch] = useState("");

  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();

    if (editingId) {
      setCourses(
        courses.map((currentCourse) =>
          currentCourse.id === editingId
            ? { ...course, id: editingId }
            : currentCourse,
        ),
      );

      setEditingId(null);
    } else {
      setCourses([
        ...courses,
        {
          ...course,
          id: Date.now(),
        },
      ]);
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

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleClearCourses = () => {
    setCourses([]);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()),
  );

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

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);
  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup/>}></Route>

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
                    courses={courses}
                    filteredCourses={filteredCourses}
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
