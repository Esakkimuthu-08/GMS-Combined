import { jwtDecode } from "jwt-decode";

export const getTokenFromStorage = () => {

  return sessionStorage.getItem("token") || null;
  
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
