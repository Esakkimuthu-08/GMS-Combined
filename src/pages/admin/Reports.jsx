import StaffAdminLayout from "../../layouts/StaffAdminLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Aug", submitted: 12, resolved: 9 },
  { month: "Sep", submitted: 18, resolved: 14 },
  { month: "Oct", submitted: 24, resolved: 20 },
  { month: "Nov", submitted: 14, resolved: 12 },
  { month: "Dec", submitted: 19, resolved: 15 },
  { month: "Jan", submitted: 32, resolved: 24 },
  { month: "Feb", submitted: 28, resolved: 22 },
  { month: "Mar", submitted: 41, resolved: 35 },
];

const categoryData = [
  { name: "Academic", value: 80 },
  { name: "Facilities", value: 45 },
  { name: "Hostel", value: 30 },
  { name: "Staff Conduct", value: 25 },
  { name: "Attendance", value: 40 },
  { name: "Other", value: 25 },
];

const resolutionTrend = [
  { month: "Aug", rate: 75 },
  { month: "Sep", rate: 78 },
  { month: "Oct", rate: 83 },
  { month: "Nov", rate: 86 },
  { month: "Dec", rate: 79 },
  { month: "Jan", rate: 75 },
  { month: "Feb", rate: 79 },
  { month: "Mar", rate: 85 },
];

const PIE_COLORS = ["#3A5B22", "#5B8A38", "#82B14E", "#A8D170", "#C9E8A0", "#E4F5C8"];

const summaryStats = [
  { label: "Total Submitted", value: "188", change: "+12% vs last period" },
  { label: "Total Resolved", value: "151", change: "+18% vs last period" },
  { label: "Avg. Resolution Time", value: "3.2 days", change: "-0.4 days improvement" },
  { label: "Resolution Rate", value: "80.3%", change: "+3.1% vs last period" },
];

export default function AdminReports() {
  return (
    <StaffAdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Reports & Analytics</h1>
        <p className="text-sm text-gray-500 mb-6">Monthly and category-wise grievance analytics</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summaryStats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border shadow-sm p-5">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{s.value}</p>
              <p className="text-xs text-[#3A5B22] font-medium">{s.change}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-5">Monthly Submitted vs Resolved</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="submitted" name="Submitted" fill="#3A5B22" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" name="Resolved" fill="#82B14E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5">Resolution Rate Trend (%)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={resolutionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} unit="%" />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 13 }}
                  formatter={(v) => [`${v}%`, "Resolution Rate"]}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#3A5B22"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#3A5B22" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5">Grievances by Category</h2>
            <ResponsiveContainer width="100%" height={220}>
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
      </div>
    </StaffAdminLayout>
  );
}
