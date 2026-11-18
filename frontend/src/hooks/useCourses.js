import { useState, useEffect } from "react";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../api/coursesApi";

export default function useCourses(user) {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Course form state
  const [course, setCourse] = useState({
    title: "",
    progress: 0,
    difficulty: "Beginner",
    notes: "",
  });

  // Get Courses
  useEffect(() => {
    async function loadCourses() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        setError("Could not load your courses.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      loadCourses();
    }
  }, [user]);

  //Helper function for clearing form state
  function resetCourseForm() {
    setCourse({
      title: "",
      progress: 0,
      difficulty: "Beginner",
      notes: "",
    });

    setEditingId(null);
  }

  async function refreshCourses() {
    const data = await getCourses();
    setCourses(data);
  }

  // Handler for form
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]:
        e.target.name === "progress" ? Number(e.target.value) : e.target.value,
    });
  };

  // Create Course
  const handleAddCourse = async (e) => {
    e.preventDefault();

    try {
      await addCourse(course);

      resetCourseForm();

      await refreshCourses();

      alert("Course added successfully.");
    } catch (error) {
      alert("Failed to add course.");
      console.error(error);
    }
  };

  //Update Course
  const handleEditCourse = (courseToEdit) => {
    setCourse(courseToEdit);
    setEditingId(courseToEdit.id);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await updateCourse(course);

      if (response.ok) {
        resetCourseForm();
        await refreshCourses();
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
        await refreshCourses();
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
    try {
      const coursesToDelete = await getCourses();

      for (const course of coursesToDelete) {
        const response = await deleteCourse(course.id);

        if (!response.ok) {
          throw new Error("Failed to delete course");
        }
      }
    } catch (error) {
      alert("Failed to clear all courses. Some courses may remain.");
      console.error(error);
    } finally {
      try {
        await refreshCourses();
      } catch (error) {
        alert("Failed to refresh courses. Please reload the page.");
        console.error(error);
      }
    }
  };

  return {
    courses,
    course,
    editingId,
    isLoading,
    error,
    handleChange,
    handleAddCourse,
    handleEditCourse,
    handleUpdateCourse,
    handleDeleteCourse,
    handleClearCourses,
    resetCourseForm
  };
}
