import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  Menu,
  X,
  BarChart3,
  Users,
  FileText,
  Settings,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { createElement, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import NotificationCenter from "../components/common/NotificationCenter";

export default function StaffAdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();

  const role = user?.Role?.toLowerCase();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const staffNavItems = [
    { label: "Dashboard", path: "/staff/dashboard", icon: BarChart3 },
    { label: "Assigned Grievances", path: "/staff/grievances", icon: ClipboardList },
  ];

  const adminNavItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: BarChart3 },
    { label: "All Grievances", path: "/admin/grievances", icon: ClipboardList },
    { label: "User Management", path: "/admin/users", icon: Users },
    { label: "Reports", path: "/admin/reports", icon: FileText },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const navItems = role === "admin" ? adminNavItems : staffNavItems;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside
        className={`relative flex flex-col border-r bg-white shadow-sm transition-all duration-300 ease-in-out ${sidebarOpen ? "w-60" : "w-[72px]"
          }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b">
          {sidebarOpen && (
            <span className="font-bold text-[#3A5B22] text-sm tracking-tight truncate">
              Grievance Portal
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-500 ml-auto"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {sidebarOpen && role && (
          <div className="px-4 pt-4 pb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {role === "admin" ? "Administrator" : "Staff Member"}
            </span>
          </div>
        )}

        <nav className="flex-1 px-3 py-3 space-y-1">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              title={!sidebarOpen ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(path)
                  ? "bg-[#3A5B22] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              {createElement(icon, { size: 18, className: "shrink-0" })}
              {sidebarOpen && <span className="truncate">{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="border-t px-3 py-4">
          <button
            onClick={handleLogout}
            title={!sidebarOpen ? "Logout" : undefined}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} className="shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-white px-6 flex items-center justify-between shadow-sm">
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900 capitalize">{role}</span> Panel
          </div>
          <NotificationCenter role={role} variant="light" />
          {user && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-[#3A5B22] text-white flex items-center justify-center font-semibold text-xs">
                {(user.Name || user.name || "U").charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block">{user.Name || user.name || user.Email || "User"}</span>
            </div>
          )}
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
