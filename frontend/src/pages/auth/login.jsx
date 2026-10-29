import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import img from "../../assets/welcome.png";
import { useAuthStore } from "../../stores/useAuthStore";
import { authService } from "../../api/authService";
import ErrorMessage from "../../components/common/ErrorMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const signupPath = location.pathname === "/admin/login"
    ? null
    : location.pathname.replace("/login", "/signup");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authService.login(email, password);
      const token = response.data.token;
      const decodedUser = jwtDecode(token);

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", decodedUser.Role?.toLowerCase());

      login(token, decodedUser);

      const role = decodedUser.Role?.toLowerCase();
      navigate(`/${role}/dashboard`, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1 flex justify-center items-center bg-white px-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <p className="text-3xl font-bold text-gray-900 mb-1">Welcome back</p>
            <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
          </div>

          <ErrorMessage message={error} className="mb-5" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]/40 focus:border-[#3A5B22] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]/40 focus:border-[#3A5B22] transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#3A5B22] hover:bg-[#2e4a1a] text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading && <LoadingSpinner size="sm" className="text-white" />}
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {signupPath && (
            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link to={signupPath} className="text-[#3A5B22] font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 hidden md:block">
        <img src={img} alt="Login" className="w-full h-screen object-cover" />
      </div>
    </div>
  );
};
