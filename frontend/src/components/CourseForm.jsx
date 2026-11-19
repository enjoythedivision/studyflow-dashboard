export default function CourseForm(props) {
  const {
    course,
    editingId,
    formError = "",
    handleChange,
    handleUpdateCourse,
    handleAddCourse,
    resetCourseForm,
  } = props;
  const isSaving = props.isSaving ?? false;
  const isLoading = props.isLoading ?? false;
  const isBusy = isSaving || isLoading;
  let submitLabel = editingId ? "Save Changes" : "Add Course";

  if (isSaving) {
    submitLabel = "Please wait…";
  }

  return (
    <form
      className="course-form"
      noValidate
      onSubmit={editingId ? handleUpdateCourse : handleAddCourse}
    >
      <h2>{editingId ? "Edit Course" : "Add a Course"}</h2>

      <div className="form-group">
        <label htmlFor="title">Course Title</label>
        <input
          onChange={handleChange}
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Advanced React..."
          value={course.title}
          disabled={isBusy}
          required
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
          disabled={isBusy}
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
              disabled={isBusy}
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
              disabled={isBusy}
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
              disabled={isBusy}
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
          value={course.notes ?? ""}
          disabled={isBusy}
        />
      </div>
      {formError && (
        <p id="course-form-error" className="course-form__error" role="alert">
          {formError}
        </p>
      )}
      <div className="course-form__actions">
        <button className="submit-btn" type="submit" disabled={isBusy}>
          {submitLabel}
        </button>
        <button
          className="cancel-btn"
          type="button"
          onClick={resetCourseForm}
          disabled={isBusy}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
