import apiClient from "./api";

export const userService = {
  getAllUsers: () =>
    apiClient.get("/Auth/getAllStaff-SignUp"),

  getUserById: (id) =>
    apiClient.get(`/Auth/user/${id}`),

  deleteUser: (id) =>
    apiClient.delete(`/Auth/user/${id}`),
};
