import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/welcome.png";
import { authService } from "../../../api/authService";
import ErrorMessage from "../../../components/common/ErrorMessage";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import SignupMobileNavigation from "./signup-mobile-navigation";

export const StaffsignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    const payload = {
      name: formData.userName,
      email: formData.email,
      passwordHash: formData.password,
    };

    try {
      await authService.staffSignUp(payload);
      setSuccess(true);
      setTimeout(() => navigate("/staff/login", { replace: true }), 2000);
    } catch (err) {
      if (err.response?.status === 400) {
        setError("User already exists with this email.");
      } else {
        setError(err.response?.data?.message || "Something went wrong. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "min-h-[44px] w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]/40 focus:border-[#3A5B22] transition";

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full min-w-0 flex-1 items-center justify-center bg-white px-4 py-6 sm:px-6 sm:py-8 lg:w-1/2 lg:px-8">
        <div className="w-full max-w-lg">
          <SignupMobileNavigation activeRole="staff" />
          <div className="mb-6 sm:mb-8">
            <h1 className="mb-1 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">Create Staff Account</h1>
            <p className="text-sm text-gray-500 sm:text-base">Register to manage and resolve grievances</p>
          </div>

          {success && (
            <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              ✓ Registered successfully! Redirecting to login...
            </div>
          )}

          <ErrorMessage message={error} className="mb-5" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="staff-full-name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                  id="staff-full-name"
                name="userName"
                type="text"
                required
                value={formData.userName}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            <div>
                <label htmlFor="staff-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                  id="staff-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@institution.edu"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="staff-password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  id="staff-password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="staff-confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <input
                  id="staff-confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="min-h-[44px] w-full flex items-center justify-center gap-2 bg-[#3A5B22] hover:bg-[#2e4a1a] text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading && <LoadingSpinner size="sm" className="text-white" />}
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/staff/login" className="text-[#3A5B22] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2">
        <img src={img} alt="Signup" className="h-screen w-full object-cover" />
      </div>
    </div>
  );
};
