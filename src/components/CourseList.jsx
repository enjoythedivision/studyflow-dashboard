import CourseCard from "./CourseCard";

export default function CourseList({
  courses = [],
  handleEditCourse,
  handleDeleteCourse,
  handleClearCourses,
}) {
  return (
    <section className="course-list">
      <div className="course-list__header">
        <h2>My Courses</h2>

        {courses.length > 0 && (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClearCourses}
          >
            Clear all
          </button>
        )}
      </div>

      <div className="course-list__list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
            />
          ))
        ) : (
          <p className="course-list__empty">
            You haven’t added any courses yet!
          </p>
        )}
      </div>
    </section>
  );
}