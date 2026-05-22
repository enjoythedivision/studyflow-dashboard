import CourseCard from "./CourseCard";

export default function CourseList({ courses, filteredCourses, handleEditCourse, handleDeleteCourse, handleClearCourses }) {
  return (
    <section className="course-list">
      <div className="course-list__header">
        <h2>My Courses</h2>
        {courses.length > 0 ? (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClearCourses}
          >
            Clear all
          </button>
        ) : null}
      </div>
      {courses.length > 0 ? (
        <div className="course-list__list">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
            />
          ))}
        </div>
      ) : (
        <p className="course-list__empty">
          You haven&apos;t added any courses yet!
        </p>
      )}
    </section>
  );
}
