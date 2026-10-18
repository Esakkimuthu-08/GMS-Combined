import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const signupRoutes = {
  student: "/student/signup",
  staff: "/staff/signup",
};

export default function SignupMobileNavigation({ activeRole }) {
  const navigate = useNavigate();

  return (
    <div className="mb-6 md:hidden">
      <button
        type="button"
        onClick={() => navigate("/", { replace: true })}
        className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#3A5B22]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Home
      </button>

      <div
        className="mt-3 grid grid-cols-2 rounded-lg border bg-gray-50 p-1"
        role="group"
        aria-label="Choose signup role"
      >
        {Object.entries(signupRoutes).map(([role, route]) => {
          const isActive = role === activeRole;

          return (
            <button
              key={role}
              type="button"
              aria-pressed={isActive}
              onClick={() => navigate(route, { replace: true })}
              className={`min-h-10 rounded-md px-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-white text-[#3A5B22] shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {role === "student" ? "Student" : "Staff"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
