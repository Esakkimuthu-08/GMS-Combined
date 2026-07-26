import { StudentLayout } from "../../layouts/StudentLayout";
import { FileText, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { grievanceService } from "../../api/grievanceService";
import { CardSkeleton } from "../../components/common/SkeletonLoader";
import { useAuthStore } from "@/stores/useAuthStore";

export default function StudentDashboard() {

  const role = useAuthStore((state) => state.role);

  const { data, isLoading } = useQuery({
    queryKey: ["student-grievances"],
    queryFn: () => grievanceService.getStudentGrievances(),
    select: (res) => res.data,
    enabled: role?.role == "student",
    staleTime: 1000 * 60 * 5,
  })


  const displayName = data?.[0]?.student?.name ?? "Student";


  const stats = [
    {
      label: "Total Grievances",
      value: data?.length ?? 0,
      icon: FileText,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      border: "border-blue-100",
    },
    {
      label: "In Progress",
      value: data?.inProgress ?? 3,
      icon: Clock,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      border: "border-yellow-100",
    },
    {
      label: "Resolved",
      value: data?.resolved ?? 5,
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      border: "border-green-100",
    },
  ];

  return (
    <StudentLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Welcome, {displayName} 👋
        </h1>
        <p className="text-sm text-gray-500 mb-6">Here's the status of your grievances</p>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
            : stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`bg-white rounded-xl border ${stat.border} p-6 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <Icon className={stat.iconColor} size={22} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-5">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/student/raise-grievance"
              className="flex items-center justify-between p-4 border rounded-xl hover:bg-green-50 hover:border-[#3A5B22]/30 group transition-all"
            >
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-[#3A5B22] transition-colors text-sm">
                  Raise New Grievance
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Submit a new complaint or request</p>
              </div>
              <span className="text-[#3A5B22] text-lg group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            <Link
              to="/student/grievances"
              className="flex items-center justify-between p-4 border rounded-xl hover:bg-green-50 hover:border-[#3A5B22]/30 group transition-all"
            >
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-[#3A5B22] transition-colors text-sm">
                  View My Grievances
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Check status and details</p>
              </div>
              <span className="text-[#3A5B22] text-lg group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
