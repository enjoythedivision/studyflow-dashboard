export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      {" "}
      <div key={course.id}>
        <h3>{course.title}</h3>
        <h4>{course.difficulty}</h4>
        <p>{course.notes}</p>
        <p>Progress: {course.progress}%</p>
      </div>
    </div>
  );
}
