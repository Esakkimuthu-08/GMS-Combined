import { useNavigate } from "react-router-dom";
import { Users, UserCheck, Shield } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    sessionStorage.setItem("role", role); 
    if (role === "student") {
      navigate("/student/login");
    } else if (role === "staff") {
      navigate("/staff/login");
    } else {
      navigate("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold mb-2">
            Grievance Management System
          </h1>
          <p className="text-muted-foreground text-lg">
            Professional Portal for Student Grievance Resolution
          </p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">
              Select Your Role
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose your role to access the portal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => handleRoleSelect("student")}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl border transition-all hover:-translate-y-2"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-100 text-primary group-hover:scale-110 transition">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Student</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Raise and track grievances
                </p>
                <span className="inline-block px-6 py-2 bg-[#3A5B22] text-white rounded-lg">
                  Enter as Student
                </span>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect("staff")}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl border transition-all hover:-translate-y-2"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-100 text-primary group-hover:scale-110 transition">
                  <UserCheck size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Staff</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Handle and resolve grievances
                </p>
                <span className="inline-block px-6 py-2 bg-[#3A5B22] text-white rounded-lg">
                  Enter as Staff
                </span>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect("admin")}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl border transition-all hover:-translate-y-2"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-100 text-primary group-hover:scale-110 transition">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Admin</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  System administration & analytics
                </p>
                <span className="inline-block px-6 py-2 bg-[#3A5B22] text-white rounded-lg">
                  Enter as Admin
                </span>
              </div>
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2024 Grievance Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
