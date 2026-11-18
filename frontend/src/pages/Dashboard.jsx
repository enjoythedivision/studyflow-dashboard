import { useState, useEffect } from "react";
import CourseForm from "../components/CourseForm";
import StatsSection from "../components/StatsSection";
import CourseList from "../components/CourseList";
import Header from "../components/Header";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../api/coursesApi";

export default function Dashboard({ user, onLogout }) {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

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
      [e.target.name]:
        e.target.name === "progress" ? Number(e.target.value) : e.target.value,
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
      await addCourse(course);

      setCourse({
        title: "",
        progress: 0,
        difficulty: "Beginner",
        notes: "",
      });

      const data = await getCourses();
      setCourses(data);

      alert("Course added successfully.");
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

    try {
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
        setEditingId(null);

        alert("Course updated successfully.");
      } else {
        alert("Failed to update course.");
      }
    } catch (error) {
      alert("Failed to update course.");
      console.error(error);
    }
  };

  //Delete Course
  const handleDeleteCourse = async (id) => {
    try {
      const response = await deleteCourse(id);

      if (response.ok) {
        const data = await getCourses();
        setCourses(data);
        alert("Course deleted successfully.");
      } else {
        alert("Failed to delete course.");
      }
    } catch (error) {
      alert("Failed to delete course.");
      console.error(error);
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
    <>
      <Header
        search={search}
        setSearch={setSearch}
        user={user}
        handleLogout={onLogout}
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
    </>
  );
}
