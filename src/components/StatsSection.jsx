export default function StatsSection({ courses, overallProgress, completedCourses }) {
  return (
    <section className="stats-section">
      <h2>My Stats</h2>
      {courses.length > 0 ? (
        <>
          <div>Total Courses: {courses.length}</div>
          <div>Overall Progress: {overallProgress()}%</div>
          <div>Completed Courses: {completedCourses()}</div>
        </>
      ) : (
        <p>Add courses to your dashboard to start generating course stats.</p>
      )}
    </section>
  );
}
