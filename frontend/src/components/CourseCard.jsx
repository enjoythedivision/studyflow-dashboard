export default function CourseCard({ course, onDelete, onEdit }) {
  return (
    <article className="course-card">
      <div>
        <div className="course-card__top">
          <span className="course-card__tag">{course.difficulty}</span>
        </div>
        <h3 className="course-card__title">{course.title}</h3>
        {course.notes ? (
          <p className="course-card__notes">{course.notes}</p>
        ) : null}
        <div className="course-card__progress">
          <div className="course-card__progress-header">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="course-card__progress-track">
            <div
              className="course-card__progress-fill"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </div>
      <div className="course-card__footer">
        <div className="course-card__actions">
          <button type="button" className="btn-continue" onClick={() => onEdit(course)}>
            Edit
          </button>
          <button type="button" className="btn-delete" onClick={() => onDelete(course.id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
