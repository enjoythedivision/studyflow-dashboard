import { useState } from "react";
import "./App.css";

function App() {

const [course, setCourse] = useState({
  title: "",
  progress: 0,
  difficulty: "Beginner",
  notes: "",
});

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
                type="text"
                id="title"
                placeholder="e.g. Advanced  React..."
              />
            </div>
            <div>
              <label htmlFor="progress">Progress</label>
              <input type="range" id="progress" min={0} max={100} step={5} />
            </div>
            <div>
              <label htmlFor="level">Difficulty</label>
              <div>
                <input
                  type="radio"
                  id="beginner"
                  name="difficulty"
                  value="Beginner"
                />

                <label htmlFor="beginner">Beginner</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="intermediate"
                  name="difficulty"
                  value="Intermediate"
                />

                <label htmlFor="intermediate">Intermediate</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="advanced"
                  name="difficulty"
                  value="Advanced"
                />

                <label htmlFor="advanced">Advanced</label>
              </div>
            </div>
            <div>
              <label htmlFor="notes">Notes</label>
              <textarea name="notes" id="notes" placeholder="e.g. Need more practice with hooks..."></textarea>
            </div>
            <button type="submit">Add course</button>
          </form>
        </section>
        <section>filters</section>
        <section>course list</section>
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;
