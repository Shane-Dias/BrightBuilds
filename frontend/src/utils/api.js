const API_BASE_URL = "http://localhost:5000/api";

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  return response.json();
};

export const createProject = async (projectData) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  return response.json();
};
