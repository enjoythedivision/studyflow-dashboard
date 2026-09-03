const API_URL = "http://localhost:5067/api/Courses";

export async function getCourses() {
  const response = await fetch(API_URL);
  const data = await response.json();

  if (!response.ok) {
  throw new Error("Failed to fetch courses");
}

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

export async function updateCourse(courseToEdit) {
  const response = await fetch(
    `${API_URL}/${courseToEdit.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseToEdit),
    }
  );

  return response;
}

export async function deleteCourse(courseToDelete) {
  const response = await fetch(`${API_URL}/${courseToDelete.id}`, {
    method: "DELETE",
  });

  return response;
}