const API_URL = "http://localhost:5067";

export async function register(email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create account");
  }
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login?useCookies=true`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/manage/info`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load user");
  }

  return response.json();
}
