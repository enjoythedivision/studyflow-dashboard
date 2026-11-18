export function filterCourses(courses, search) {
  return courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()),
  );
}

export function getCourseStats(courses) {
  let totalProgress = 0;
  let completedCourses = 0;

  for (const course of courses) {
    const progress = Number(course.progress);
    totalProgress += progress;

    if (progress === 100) {
      completedCourses++;
    }
  }

  const overallProgress =
    courses.length === 0 ? 0 : Math.round(totalProgress / courses.length);

  return { overallProgress, completedCourses };
}
