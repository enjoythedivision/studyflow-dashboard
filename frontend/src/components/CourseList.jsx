import CourseCard from "./CourseCard";

export default function CourseList({
  courses = [],
  search = "",
  isLoading = false,
  isSaving = false,
  error = "",
  onEdit,
  onDelete,
  onClear,
}) {
  return (
    <section className="course-list">
      <div className="course-list__header">
        <h2>My Courses</h2>

        {!isLoading && !error && courses.length > 0 && onClear && (
          <button type="button" className="clear-btn" onClick={onClear} disabled={isSaving}>
            Clear all
          </button>
        )}
      </div>

      <div className="course-list__list">
        {isLoading ? (
          <p className="course-list__empty" role="status">
            Loading courses…
          </p>
        ) : error ? (
          <p className="course-list__empty" role="alert">
            {error}
          </p>
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={onEdit}
              onDelete={onDelete}
              isSaving={isSaving}
            />
          ))
        ) : (
          <p className="course-list__empty">
            {search
              ? "No matching courses."
              : "You haven’t added any courses yet!"}
          </p>
        )}
      </div>
    </section>
  );
}
