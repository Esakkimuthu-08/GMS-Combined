import StaffAdminLayout from "../../layouts/StaffAdminLayout";
import { useQuery } from "@tanstack/react-query";
import { grievanceService } from "../../api/grievanceService";
import { Link } from "react-router-dom";
import {
  FileText,
  AlertCircle,
  Clock,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import { CardSkeleton } from "../../components/common/SkeletonLoader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Oct", grievances: 18 },
  { month: "Nov", grievances: 24 },
  { month: "Dec", grievances: 14 },
  { month: "Jan", grievances: 32 },
  { month: "Feb", grievances: 28 },
  { month: "Mar", grievances: 41 },
];

const categoryData = [
  { name: "Academic", value: 80 },
  { name: "Facilities", value: 45 },
  { name: "Hostel", value: 30 },
  { name: "Staff Conduct", value: 25 },
  { name: "Attendance", value: 40 },
  { name: "Other", value: 25 },
];

const PIE_COLORS = ["#3A5B22", "#5B8A38", "#82B14E", "#A8D170", "#C9E8A0", "#E4F5C8"];

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-grievances"],
    queryFn: () => grievanceService.getAllGrievances(),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
  });

  const stats = [
    {
      label: "Total Grievances",
      value: data?.total ?? 245,
      icon: FileText,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      border: "border-blue-100",
    },
    {
      label: "Open",
      value: data?.open ?? 32,
      icon: AlertCircle,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      border: "border-red-100",
    },
    {
      label: "In Process",
      value: data?.inProgress ?? 58,
      icon: Clock,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      border: "border-orange-100",
    },
    {
      label: "Resolved",
      value: data?.closed ?? 145,
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      border: "border-green-100",
    },
    {
      label: "Reopened",
      value: data?.reopened ?? 10,
      icon: RotateCcw,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      border: "border-purple-100",
    },
  ];

  return (
    <StaffAdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mb-6">Overview of all grievances across departments</p>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
            : stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`bg-white rounded-xl border ${stat.border} p-5 shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`${stat.bgColor} p-2 rounded-lg`}>
                        <Icon className={stat.iconColor} size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="md:col-span-2 bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5">Monthly Grievance Trend</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 13 }}
                />
                <Bar dataKey="grievances" fill="#3A5B22" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5">By Category</h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: 13 }} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { to: "/admin/grievances", title: "Manage Grievances", desc: "View all grievances" },
            { to: "/admin/users", title: "User Management", desc: "Manage staff & admins" },
            { to: "/admin/reports", title: "Reports", desc: "View analytics" },
            { to: "/admin/settings", title: "Settings", desc: "Configure system" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md hover:border-[#3A5B22]/30 transition-all group"
            >
              <p className="font-semibold text-gray-800 mb-1 group-hover:text-[#3A5B22] transition-colors text-sm">
                {item.title}
              </p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </StaffAdminLayout>
  );
}
