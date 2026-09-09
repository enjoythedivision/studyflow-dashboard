const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5067";

export function getAuthHeaders() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function register(email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
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
  const response = await fetch(`${API_URL}/login?useCookies=false`, {
    method: "POST",
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

  const data = await response.json();

  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }

  return data;
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/manage/info`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to load user");
  }

  return response.json();
}

export async function logout() {
  localStorage.removeItem("accessToken");
}
