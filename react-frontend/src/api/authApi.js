import apiClient from "./apiClient";

export async function registerStudent(studentData) {
    const response = await apiClient.post("/auth/register", studentData);

    return response.data;
}

export async function loginStudent(credentials) {
    const response = await apiClient.post("/auth/login", credentials);

    if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("role", response.data.student.role);
    }

    return response.data;
}

export function logoutStudent() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
}