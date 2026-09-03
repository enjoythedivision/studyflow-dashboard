const API_URL = "http://localhost:5067/api/Courses";

export async function getCourses() {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data;
}