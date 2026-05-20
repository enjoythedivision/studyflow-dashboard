import { useState } from "react";
import "./App.css";
import CourseCard from "./components/CourseCard";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [course, setCourse] = useState({
    title: "",
    progress: 0,
    difficulty: "Beginner",
    notes: "",
  });

  const [courses, setCourses] = useState([]);

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();

    setCourses([
      ...courses,
      {
        ...course,
        id: Date.now(),
      },
    ]);

    setCourse({
      title: "",
      progress: 0,
      difficulty: "Beginner",
      notes: "",
    });
  };

  const handleEditCourse = (course) => {
    setCourse(course);
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <>
      <Header />

      <main className="dashboard">
        <section className="stats-section">
          <h2>My Stats</h2>
          {courses.length > 0
            ? " "
            : "Add courses to your dashboard to start generating course stats."}
        </section>

        <div className="dashboard-content">
          <section className="form-section">
            <h2>Add New Course</h2>
            <form>
              <div>
                <label htmlFor="title">Course Title</label>

                <input
                  onChange={handleChange}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g. Advanced React..."
                  value={course.title}
                />
              </div>

              <div>
                <label htmlFor="progress">Progress</label>

                <input
                  onChange={handleChange}
                  type="range"
                  name="progress"
                  id="progress"
                  min={0}
                  max={100}
                  step={5}
                  value={course.progress}
                />
              </div>

              <div>
                <label>Difficulty</label>

                <div>
                  <input
                    onChange={handleChange}
                    type="radio"
                    id="beginner"
                    name="difficulty"
                    value="Beginner"
                    checked={course.difficulty === "Beginner"}
                  />
                  <label htmlFor="beginner">Beginner</label>
                </div>

                <div>
                  <input
                    onChange={handleChange}
                    type="radio"
                    id="intermediate"
                    name="difficulty"
                    value="Intermediate"
                    checked={course.difficulty === "Intermediate"}
                  />
                  <label htmlFor="intermediate">Intermediate</label>
                </div>

                <div>
                  <input
                    onChange={handleChange}
                    type="radio"
                    id="advanced"
                    name="difficulty"
                    value="Advanced"
                    checked={course.difficulty === "Advanced"}
                  />
                  <label htmlFor="advanced">Advanced</label>
                </div>
              </div>

              <div>
                <label htmlFor="notes">Notes</label>

                <textarea
                  onChange={handleChange}
                  name="notes"
                  id="notes"
                  placeholder="e.g. Need more practice with hooks..."
                  value={course.notes}
                />
              </div>

              <button onClick={handleAddCourse} type="submit">
                Add Course
              </button>
            </form>
          </section>

          <section className="course-list">
            <h2>My Courses</h2> // !!! an empty array is still truthy, so courses ? ... : ... is ALWAYS true even when there are no courses
            {courses.length > 0 ? (
              <>
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onEdit={handleEditCourse}
                    onDelete={handleDeleteCourse}
                  />
                ))}
              </>
            ) : (
              "You haven't added any courses yet!"
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
