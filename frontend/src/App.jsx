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
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "./api/coursesApi";
import { getCurrentUser } from "./api/authApi";

export default function App() {
  const [user, setUser] = useState();
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    }

    loadCurrentUser();
  }, []);

  // COURSE FORM STATE
  const [course, setCourse] = useState({
    title: "",
    progress: 0,
    difficulty: "Beginner",
    notes: "",
  });

  // HANDLER FOR FORM
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  // Get Courses
  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      loadCourses();
    }
  }, [user]);

  // Create Course
  const handleAddCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await addCourse(course);

      if (response.ok) {
        setCourse({
          title: "",
          progress: 0,
          difficulty: "Beginner",
          notes: "",
        });

        const data = await getCourses();
        setCourses(data);

        alert("Course added successfully.");
      }
    } catch (error) {
      alert("Failed to add course.");
      console.error(error);
    }
  };

  //Update Course
  // > CLICK "EDIT" ON A COURSE
  const handleEditCourse = (courseToEdit) => {
    setCourse(courseToEdit);
    setEditingId(courseToEdit.id);
  };

  // > CLICK "UPDATE" IN THE FORM
  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    const response = await updateCourse(course);

    if (response.ok) {
      setCourse({
        title: "",
        progress: 0,
        difficulty: "Beginner",
        notes: "",
      });

      const data = await getCourses();
      setCourses(data);

      alert("Course updated successfully.");
    } else {
      alert("Failed to update course.");
    }
  };

  //Delete Course
  const handleDeleteCourse = async (id) => {
    const response = await deleteCourse(id);

    if (response.ok) {
      const data = await getCourses();
      setCourses(data);

      alert("Course deleted successfully.");
    } else {
      alert("Failed to delete course.");
    }
  };

  //Clear All
  const handleClearCourses = async () => {
    const courses = await getCourses();

    for (const course of courses) {
      await deleteCourse(course.id);
    }

    const data = await getCourses();
    setCourses(data);
  };

  // FILTERING & STATS
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
                      handleChange={handleChange}
                      handleAddCourse={handleAddCourse}
                      handleUpdateCourse={handleUpdateCourse}
                      editingId={editingId}
                    />
                  </section>

                  <CourseList
                    courses={filteredCourses}
                    onDelete={handleDeleteCourse}
                    onEdit={handleEditCourse}
                    onClear={handleClearCourses}
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
