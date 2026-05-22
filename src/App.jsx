import { useState, useEffect } from "react";
import "./App.css";
import CourseForm from "./components/CourseForm";
import StatsSection from "./components/StatsSection";
import CourseList from "./components/CourseList";
import CourseCard from "./components/CourseCard";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  const [course, setCourse] = useState({
    title: "",
    progress: 0,
    difficulty: "Beginner",
    notes: "",
  });

  const [search, setSearch] = useState("");

  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");

    if (savedCourses) {
      return JSON.parse(savedCourses);
    }

    return [];
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
        courses.map((currentCourse) => {
          if (currentCourse.id === editingId) {
            return {
              ...course,
              id: editingId,
            };
          }

          return currentCourse;
        }),
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
      if (courses[i].progress == 100) {
        total += 1;
      }
    }
    return total;
  };

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  return (
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
  )}