import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/welcome.png";
import { authService } from "../../../api/authService";
import ErrorMessage from "../../../components/common/ErrorMessage";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import SignupMobileNavigation from "./signup-mobile-navigation";

export const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNo: "",
    userName: "",
    staffNo: "",
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
      rollNo: formData.rollNo,
      name: formData.userName,
      email: formData.email,
      passwordHash: formData.password,
      staffCode: formData.staffNo,
    };

    try {
      await authService.studentSignUp(payload);
      setSuccess(true);
      setTimeout(() => navigate("/student/login", { replace: true }), 2000);
    } catch (err) {
      if (err.response?.status === 400) {
        setError("User already exists with this email or roll number.");
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
        <div className="w-full max-w-lg lg:max-w-xl">
          <SignupMobileNavigation activeRole="student" />
          <div className="mb-6 sm:mb-8">
            <h1 className="mb-1 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">Create your account</h1>
            <p className="text-sm text-gray-500 sm:text-base">Sign up as a student to get started</p>
          </div>

          {success && (
            <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              ✓ Registered successfully! Redirecting to login...
            </div>
          )}

          <ErrorMessage message={error} className="mb-5" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="student-roll-no" className="block text-sm font-medium text-gray-700 mb-1.5">Roll No</label>
                <input
                  id="student-roll-no"
                  name="rollNo"
                  type="text"
                  required
                  value={formData.rollNo}
                  onChange={handleChange}
                  placeholder="e.g. 22CS001"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="student-full-name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  id="student-full-name"
                  name="userName"
                  type="text"
                  required
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="student-staff-code" className="block text-sm font-medium text-gray-700 mb-1.5">Staff Code</label>
                <input
                  id="student-staff-code"
                  name="staffNo"
                  type="text"
                  required
                  value={formData.staffNo}
                  onChange={handleChange}
                  placeholder="Your advisor's staff code"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="student-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  id="student-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="student-password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  id="student-password"
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
                <label htmlFor="student-confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <input
                  id="student-confirm-password"
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

            <label className="flex min-h-11 items-center gap-3 text-sm leading-relaxed text-gray-600">
              <input type="checkbox" required className="h-4 w-4 shrink-0 accent-[#3A5B22]" />
              I agree to the terms & policy
            </label>

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
              <Link to="/student/login" className="text-[#3A5B22] font-semibold hover:underline">
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
