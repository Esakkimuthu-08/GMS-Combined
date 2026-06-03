import { StudentLayout } from "../../layouts/StudentLayout";
import { Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { grievanceService } from "../../api/grievanceService";
import { TableRowSkeleton } from "../../components/common/SkeletonLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getStatusLabel, getStatusBadgeClass } from "../../utils/statusHelpers";
import { formatDate } from "../../utils/tokenUtils";

const MOCK_GRIEVANCES = [
  { id: "GRV-001", category: "Academic", subject: "Assignment grading issue", date: "2024-01-15", status: "resolved" },
  { id: "GRV-002", category: "Facilities", subject: "Library WiFi not working", date: "2024-01-12", status: "in_progress" },
  { id: "GRV-003", category: "Hostel", subject: "Room maintenance request", date: "2024-01-10", status: "resolved" },
  { id: "GRV-004", category: "Staff Conduct", subject: "Unfair examination conduct", date: "2024-01-08", status: "in_progress" },
  { id: "GRV-005", category: "Attendance", subject: "Attendance record correction", date: "2024-01-05", status: "waiting" },
  { id: "GRV-006", category: "Other", subject: "Canteen food quality", date: "2024-01-03", status: "resolved" },
];

export default function StudentGrievances() {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["student-grievances-list"],
    queryFn: () => grievanceService.getStudentGrievances(),
    select: (res) => res.data?.grievances ?? res.data,
  });

  const grievances = data ?? MOCK_GRIEVANCES;

  return (
    <StudentLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">My Grievances</h1>
        <p className="text-sm text-gray-500 mb-6">Track the status of all your submitted grievances</p>

        {isError && (
          <ErrorMessage
            message={error?.response?.data?.message || "Failed to load grievances. Showing cached data."}
            className="mb-6"
          />
        )}

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["Ticket ID", "Category", "Subject", "Date", "Status", "Action"].map((h) => (
                    <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cols={6} />)
                  : grievances.map((g) => (
                    <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#3A5B22]">{g.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{g.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{g.subject}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(g.date)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(g.status)}`}>
                          {getStatusLabel(g.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#3A5B22] hover:bg-[#3A5B22]/10 rounded-lg transition-colors">
                          <Eye size={14} />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {!isLoading && grievances.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg font-semibold mb-1">No grievances yet</p>
                <p className="text-sm">Raise a new grievance to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
