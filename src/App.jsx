import { useState } from "react";
import "./App.css";

function App() {
  const [course, setCourse] = useState({
    title: "",
    progress: 0,
    difficulty: "Beginner",
    notes: "",
  }); //form state

  const [courses, setCourses] = useState([]); //course list

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  }; //for objs

  const handleAddCourse = (e) => {
    e.preventDefault();
    setCourses(
      [...courses, course]
    )
  } //for arrays

  return (
    <>
      <header>header</header>
      <main>
        <section>stats</section>
        <section>
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
              <label htmlFor="level">Difficulty</label>
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
              ></textarea>
            </div>
            <button onClick={handleAddCourse} type="submit">
              Add course
            </button>
          </form>
        </section>
        <section>filters</section>
        <section>course list</section>
        <section>
          {courses.map((course) => (
            <div key={course.id}>
              <h3>{course.title}</h3>
              <h4>{course.difficulty}</h4>
              <p>{course.notes}</p>
              <p>Progress: {course.progress}%</p>
            </div>))}
        </section>
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;
