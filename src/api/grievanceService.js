import apiClient from "./api";

export const grievanceService = {
  getStudentGrievances: () =>
    apiClient.get("/Grievance/getStudentGrievances"),

  getStaffGrievances: () =>
    apiClient.get("/Grievance/assigned"),

  getAllGrievances: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.category) params.append("category", filters.category);
    if (filters.department) params.append("department", filters.department);
    if (filters.status) params.append("status", filters.status);
    return apiClient.get(`/Grievance/getAllGrievances?${params.toString()}`);
  },

  raiseGrievance: (payload) =>
    apiClient.post("/Grievance/raiseGrievance", payload),

  updateGrievanceStatus: (grievanceId, grievanceStatus) =>
    apiClient.put("/Grievance/updateStatus", { grievanceId, grievanceStatus }),

  assignGrievance: (id, staffId) =>
    apiClient.patch(`/Grievance/${id}/assign`, { staffId }),
};
