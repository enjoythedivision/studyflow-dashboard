const API_URL = "http://localhost:5067/api/Courses";

export async function getCourses() {
  const response = await fetch(API_URL, {
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return data;
}

export async function addCourse(course) {
  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    const details = await response.text();

    console.error("Backend response:", details);
    console.error("Data sent:", course);

    throw new Error("Failed to add course");
  }

  return response;
}

export async function updateCourse(courseToEdit) {
  const response = await fetch(
    `${API_URL}/${courseToEdit.id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseToEdit),
    }
  );

  return response;
}

export async function deleteCourse(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return response;
}