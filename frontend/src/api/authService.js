import apiClient from "./api";

export const authService = {
  login: (email, password) =>
    apiClient.post("/Approval/login", { email, password }),

  studentSignUp: (payload) =>
    apiClient.post("/Auth/studentSignUp", payload),

  staffSignUp: (payload) =>
    apiClient.post("/Auth/staffSignUp", payload),
};
