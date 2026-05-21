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

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();

    if (editingId) {
      setCourses(
        courses.map((currentCourse) => {
          if (currentCourse.id === editingId) {
            return {
              ...course,
              id: editingId,
            };
          }

          return currentCourse;
        }),
      );

      setEditingId(null);
    } else {
      setCourses([
        ...courses,
        {
          ...course,
          id: Date.now(),
        },
      ]);
    }

    setCourse({
      title: "",
      progress: 0,
      difficulty: "Beginner",
      notes: "",
    });
  };

  const handleEditCourse = (courseToEdit) => {
    setCourse(courseToEdit);
    setEditingId(courseToEdit.id);
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
            <form className="course-form">
              <div className="form-group">
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

              <div className="form-group">
                <label htmlFor="progress">Progress ({course.progress}%)</label>

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

              <div className="form-group">
                <label>Difficulty</label>

                <div className="radio-group">
                  <div className="radio-option">
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

                  <div className="radio-option">
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

                  <div className="radio-option">
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
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes</label>

                <textarea
                  onChange={handleChange}
                  name="notes"
                  id="notes"
                  placeholder="e.g. Need more practice with hooks..."
                  value={course.notes}
                />
              </div>

              <button
                className="submit-btn"
                onClick={handleAddCourse}
                type="submit"
              >
                {editingId ? "Save Changes" : "Add Course"}
              </button>
            </form>
          </section>

          {/* !!! an empty array is still truthy, so courses ? ... : ... is ALWAYS
          true even when there are no courses */}

          <section className="course-list">
            <h2>My Courses</h2>
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
