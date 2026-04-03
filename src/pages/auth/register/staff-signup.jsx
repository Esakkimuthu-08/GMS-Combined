import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/welcome.png";
import { authService } from "../../../api/authService";
import ErrorMessage from "../../../components/common/ErrorMessage";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

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
      setTimeout(() => navigate("/staff/login"), 2000);
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
    "border text-sm rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-[#3A5B22]/40 focus:border-[#3A5B22] transition";

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1 flex justify-center items-center bg-white px-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Create Staff Account</h1>
            <p className="text-gray-500 text-sm">Register to manage and resolve grievances</p>
          </div>

          {success && (
            <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              ✓ Registered successfully! Redirecting to login...
            </div>
          )}

          <ErrorMessage message={error} className="mb-5" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <input
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
              className="w-full flex items-center justify-center gap-2 bg-[#3A5B22] hover:bg-[#2e4a1a] text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
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

      <div className="flex-1 hidden md:block">
        <img src={img} alt="Signup" className="w-full h-screen object-cover" />
      </div>
    </div>
  );
};
