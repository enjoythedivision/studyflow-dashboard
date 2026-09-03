const API_URL = "http://localhost:5067/api/Courses";

export async function getCourses() {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data;
}

export async function addCourse(course) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  return response;
}