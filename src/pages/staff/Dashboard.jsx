import StaffAdminLayout from "../../layouts/StaffAdminLayout";
import { ClipboardList, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { grievanceService } from "../../api/grievanceService";
import { CardSkeleton } from "../../components/common/SkeletonLoader";

export default function StaffDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["staff-grievances"],
    queryFn: () => grievanceService.getStaffGrievances(),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
  });

  const stats = [
    {
      label: "Assigned Grievances",
      value: data?.assigned ?? 12,
      icon: ClipboardList,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      border: "border-blue-100",
    },
    {
      label: "Pending Responses",
      value: data?.pending ?? 5,
      icon: Clock,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      border: "border-orange-100",
    },
    {
      label: "Resolved Today",
      value: data?.resolvedToday ?? 2,
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      border: "border-green-100",
    },
  ];

  return (
    <StaffAdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Staff Dashboard</h1>
        <p className="text-sm text-gray-500 mb-6">Manage and respond to your assigned grievances</p>

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
              to="/staff/grievances"
              className="flex items-center justify-between p-4 border rounded-xl hover:bg-green-50 hover:border-[#3A5B22]/30 group transition-all"
            >
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-[#3A5B22] transition-colors text-sm">
                  View Assigned Grievances
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Manage your assignments</p>
              </div>
              <span className="text-[#3A5B22] text-lg group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            <div className="flex items-center justify-between p-4 border rounded-xl opacity-50 cursor-not-allowed">
              <div>
                <p className="font-semibold text-gray-800 text-sm">View Reports</p>
                <p className="text-xs text-gray-500 mt-0.5">Performance analytics</p>
              </div>
              <span className="text-gray-400 text-lg">→</span>
            </div>
          </div>
        </div>
      </div>
    </StaffAdminLayout>
  );
}
