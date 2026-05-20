export default function CourseCard({ course, onDelete, onEdit }) {
  return (
    <div className="course-card">
      {" "}
      <div key={course.id}>
        <h3>{course.title}</h3>
        <h4>{course.difficulty}</h4>
        <p>{course.notes}</p>
        <p>Progress: {course.progress}%</p>
      </div>
      <button onClick={() => onEdit(course)}>Edit</button>
      <button onClick={() => onDelete(course.id)}>Delete</button>
    </div>
  );
}
