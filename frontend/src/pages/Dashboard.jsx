import { useState } from "react";
import useCourses from "../hooks/useCourses";
import { filterCourses, getCourseStats } from "../utils/courseStats";
import CourseForm from "../components/CourseForm";
import StatsSection from "../components/StatsSection";
import CourseList from "../components/CourseList";
import Header from "../components/Header";

export default function Dashboard({ user, onLogout }) {
  const [search, setSearch] = useState("");

  const {
    courses,
    course,
    editingId,
    isLoading,
    isSaving,
    formError,
    error,
    handleChange,
    handleAddCourse,
    handleEditCourse,
    handleUpdateCourse,
    handleDeleteCourse,
    handleClearCourses,
    resetCourseForm
  } = useCourses(user);

  const filteredCourses = filterCourses(courses, search);
  const { overallProgress, completedCourses } = getCourseStats(courses);

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
            <CourseForm
              course={course}
              handleChange={handleChange}
              handleAddCourse={handleAddCourse}
              handleUpdateCourse={handleUpdateCourse}
              editingId={editingId}
              isSaving={isSaving}
              formError={formError}
              isLoading={isLoading}
              resetCourseForm={resetCourseForm}
            />
          </section>

          <CourseList
            courses={filteredCourses}
            search={search}
            isLoading={isLoading}
            isSaving={isSaving}
            error={error}
            onDelete={handleDeleteCourse}
            onEdit={handleEditCourse}
            onClear={handleClearCourses}
          />
        </div>
      </main>
    </>
  );
}
