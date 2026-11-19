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
  const [isSaving, setIsSaving] = useState(false);

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
    if (isSaving) return;

    setCourse({
      ...course,
      [e.target.name]:
        e.target.name === "progress" ? Number(e.target.value) : e.target.value,
    });
  };

  // Create Course
  const handleAddCourse = async (e) => {
    e.preventDefault();

    if (isSaving || isLoading) return;

    setIsSaving(true);
    let wasAdded = false;
    let message;

    try {
      await addCourse(course);
      wasAdded = true;
      resetCourseForm();
      await refreshCourses();

      message = "Course added successfully.";
    } catch (error) {
      message = wasAdded
        ? "Course added, but the list could not be refreshed. Please reload the page."
        : "Failed to add course.";
      console.error(error);
    } finally {
      setIsSaving(false);
    }

    alert(message);
  };

  //Update Course
  const handleEditCourse = (courseToEdit) => {
    if (isSaving) return;

    setCourse(courseToEdit);
    setEditingId(courseToEdit.id);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    if (isSaving || isLoading) return;

    setIsSaving(true);
    let wasUpdated = false;
    let message;

    try {
      const response = await updateCourse(course);

      if (response.ok) {
        wasUpdated = true;
        resetCourseForm();
        await refreshCourses();
        message = "Course updated successfully.";
      } else {
        message = "Failed to update course.";
      }
    } catch (error) {
      message = wasUpdated
        ? "Course updated, but the list could not be refreshed. Please reload the page."
        : "Failed to update course.";
      console.error(error);
    } finally {
      setIsSaving(false);
    }

    alert(message);
  };

  //Delete Course
  const handleDeleteCourse = async (id) => {
    if (isSaving || isLoading) return;

    setIsSaving(true);
    let wasDeleted = false;
    let message;

    try {
      const response = await deleteCourse(id);

      if (response.ok) {
        wasDeleted = true;
        if (editingId === id) {
          resetCourseForm();
        }
        await refreshCourses();
        message = "Course deleted successfully.";
      } else {
        message = "Failed to delete course.";
      }
    } catch (error) {
      message = wasDeleted
        ? "Course deleted, but the list could not be refreshed. Please reload the page."
        : "Failed to delete course.";
      console.error(error);
    } finally {
      setIsSaving(false);
    }

    alert(message);
  };

  //Clear All
  const handleClearCourses = async () => {
    if (isSaving || isLoading) return;

    setIsSaving(true);
    let message = "All courses cleared successfully.";

    try {
      const coursesToDelete = await getCourses();

      for (const course of coursesToDelete) {
        const response = await deleteCourse(course.id);

        if (!response.ok) {
          throw new Error("Failed to delete course");
        }

        if (editingId === course.id) {
          resetCourseForm();
        }
      }
    } catch (error) {
      message = "Failed to clear all courses. Some courses may remain.";
      console.error(error);
    } finally {
      try {
        await refreshCourses();
      } catch (error) {
        message += " The list could not be refreshed. Please reload the page.";
        console.error(error);
      } finally {
        setIsSaving(false);
      }
    }

    alert(message);
  };

  return {
    courses,
    course,
    editingId,
    isLoading,
    isSaving,
    error,
    handleChange,
    handleAddCourse,
    handleEditCourse,
    handleUpdateCourse,
    handleDeleteCourse,
    handleClearCourses,
    resetCourseForm,
  };
}
