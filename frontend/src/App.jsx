import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "./stores/useAuthStore";
import { getAuthQueryScope } from "./api/hook";


// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth
import { Login } from "./pages/auth/login";
import { StudentSignup } from "./pages/auth/register/student-signup";
import { StaffsignUp } from "./pages/auth/register/staff-signup";

// Student
import StudentDashboard from "./pages/student/Dashboard";
import StudentGrievances from "./pages/student/Grievances";
import RaiseGrievance from "./pages/student/RaiseGrievance";
import StudentDiscussion from "./pages/student/Discussion";

// Staff
import StaffDashboard from "./pages/staff/Dashboard";
import StaffGrievances from "./pages/staff/Grievances";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminGrievances from "./pages/admin/Grievances";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";
import AdminUsers from "./pages/admin/Users";
import ProtectedRoute from "./pages/auth/protected-route";
import RoleRoute from "./pages/auth/role-route";
import PublicRoute from "./pages/auth/public-route";

const queryClient = new QueryClient();

function AuthQueryCacheLifecycle() {
  const client = useQueryClient();

  useEffect(() => {
    let previous = useAuthStore.getState();
    return useAuthStore.subscribe((state) => {
      const previousScope = getAuthQueryScope(previous.role, previous.user).join(":");
      const nextScope = getAuthQueryScope(state.role, state.user).join(":");
      if (previousScope !== nextScope) client.clear();
      previous = state;
    });
  }, [client]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthQueryCacheLifecycle />
      <Routes>
        {/* Public */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Index />
            </PublicRoute>
          }
        />

        {/* Auth */}
        <Route
          path="/student/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/student/signup" element={<StudentSignup />} />

        <Route
          path="/staff/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/staff/signup" element={<StaffsignUp />} />

        <Route
          path="/admin/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/admin/signup" element={<Navigate to="/admin/login" replace />} />

        {/* Student */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/grievances"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["student"]}>
                <StudentGrievances />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/raise-grievance"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["student"]}>
                <RaiseGrievance />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/discussion"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["student"]}>
                <StudentDiscussion />
              </RoleRoute>
            </ProtectedRoute>
          }
        />


        {/* Staff */}
        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["staff"]}>
                <StaffDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/grievances"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["staff"]}>
                <StaffGrievances />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/grievances"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminGrievances />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminReports />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminSettings />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
