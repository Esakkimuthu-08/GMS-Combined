import { useNavigate } from "react-router-dom";
import { Users, UserCheck, Shield, FilePlus2, ClipboardCheck, MessageCircle } from "lucide-react";

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
        <div className="max-w-7xl mx-auto w-full px-4 py-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl leading-tight font-bold mb-2">
            Grievance Management System
          </h1>
          <p className="hidden md:block max-w-2xl mx-auto text-muted-foreground text-base lg:text-lg leading-relaxed">
            Professional Portal for Student Grievance Resolution
          </p>
          <div className="md:hidden max-w-xl mx-auto">
            <p className="text-sm sm:text-base font-semibold text-[#3A5B22] mb-2">
              Your voice matters.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Raise concerns, track progress, and stay connected with your institution—all in one place.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-none md:flex-1 flex items-center justify-center px-4 py-6 md:py-12">
        <div className="max-w-4xl w-full min-w-0">
          <div className="md:hidden flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/student/login")}
              className="min-h-[48px] w-full max-w-sm rounded-lg bg-[#3A5B22] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#2e4a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A5B22] focus-visible:ring-offset-2"
            >
              Login
            </button>
          </div>

          <section className="md:hidden mt-6" aria-label="Portal features">
            <div className="grid gap-3">
              <article className="flex items-center gap-3 rounded-xl border border-border/70 bg-white/80 px-4 py-3 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-[#3A5B22]">
                  <FilePlus2 size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-gray-900">Raise Grievances</h2>
                  <p className="text-xs leading-relaxed text-muted-foreground">Submit concerns easily.</p>
                </div>
              </article>
              <article className="flex items-center gap-3 rounded-xl border border-border/70 bg-white/80 px-4 py-3 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-[#3A5B22]">
                  <ClipboardCheck size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-gray-900">Track Progress</h2>
                  <p className="text-xs leading-relaxed text-muted-foreground">Stay informed about grievance status.</p>
                </div>
              </article>
              <article className="flex items-center gap-3 rounded-xl border border-border/70 bg-white/80 px-4 py-3 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-[#3A5B22]">
                  <MessageCircle size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-gray-900">Stay Connected</h2>
                  <p className="text-xs leading-relaxed text-muted-foreground">Receive updates and communicate with staff.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="hidden md:block" aria-labelledby="role-selection-heading">
            <div className="text-center mb-12">
              <h2 id="role-selection-heading" className="text-2xl font-semibold mb-4 lg:text-3xl">
                Select Your Role
              </h2>
              <p className="text-base text-muted-foreground lg:text-lg">
                Choose your role to access the portal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              <button
                type="button"
                onClick={() => handleRoleSelect("student")}
                className="group flex w-full min-w-0 flex-col bg-white rounded-xl shadow-md hover:shadow-xl border transition-all hover:-translate-y-2"
              >
                <div className="flex h-full w-full flex-1 flex-col items-center p-3 text-center lg:p-8">
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-primary transition group-hover:scale-110 lg:mb-6 lg:h-16 lg:w-16">
                    <Users className="h-5 w-5 lg:h-8 lg:w-8" />
                  </div>
                  <h3 className="mb-2 text-base font-bold lg:text-xl">Student</h3>
                  <p className="mb-4 min-h-[2.25rem] flex-1 text-xs text-muted-foreground lg:mb-6 lg:min-h-0 lg:text-sm">
                    Raise and track grievances
                  </p>
                  <span className="mt-auto inline-block rounded-lg bg-[#3A5B22] px-2 py-2 text-xs text-white lg:px-6 lg:text-base">
                    Enter as Student
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect("staff")}
                className="group flex w-full min-w-0 flex-col bg-white rounded-xl shadow-md hover:shadow-xl border transition-all hover:-translate-y-2"
              >
                <div className="flex h-full w-full flex-1 flex-col items-center p-3 text-center lg:p-8">
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-primary transition group-hover:scale-110 lg:mb-6 lg:h-16 lg:w-16">
                    <UserCheck className="h-5 w-5 lg:h-8 lg:w-8" />
                  </div>
                  <h3 className="mb-2 text-base font-bold lg:text-xl">Staff</h3>
                  <p className="mb-4 min-h-[2.25rem] flex-1 text-xs text-muted-foreground lg:mb-6 lg:min-h-0 lg:text-sm">
                    Handle and resolve grievances
                  </p>
                  <span className="mt-auto inline-block rounded-lg bg-[#3A5B22] px-2 py-2 text-xs text-white lg:px-6 lg:text-base">
                    Enter as Staff
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect("admin")}
                className="group flex w-full min-w-0 flex-col bg-white rounded-xl shadow-md hover:shadow-xl border transition-all hover:-translate-y-2"
              >
                <div className="flex h-full w-full flex-1 flex-col items-center p-3 text-center lg:p-8">
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-primary transition group-hover:scale-110 lg:mb-6 lg:h-16 lg:w-16">
                    <Shield className="h-5 w-5 lg:h-8 lg:w-8" />
                  </div>
                  <h3 className="mb-2 text-base font-bold lg:text-xl">Admin</h3>
                  <p className="mb-4 min-h-[2.25rem] flex-1 text-xs text-muted-foreground lg:mb-6 lg:min-h-0 lg:text-sm">
                    System administration & analytics
                  </p>
                  <span className="mt-auto inline-block rounded-lg bg-[#3A5B22] px-2 py-2 text-xs text-white lg:px-6 lg:text-base">
                    Enter as Admin
                  </span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:py-6 text-center text-xs sm:text-sm leading-relaxed text-muted-foreground">
          © 2024 Grievance Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
