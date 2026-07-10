import StaffAdminLayout from "../../layouts/StaffAdminLayout";
import { Eye, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { grievanceService } from "../../api/grievanceService";
import { TableRowSkeleton } from "../../components/common/SkeletonLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getStatusLabel, getStatusBadgeClass, getPriorityBadgeClass } from "../../utils/statusHelpers";



export default function StaffGrievances() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["staff-grievances-list"],
    queryFn: () => grievanceService.getStaffGrievances(),
    select: (res) => res.data?.grievances ?? res.data,
  });

  const grievances = data || [];

  const mapStatus = (status) => {
    const statusMap = { 0: "new", 1: "open", 2: "in_progress", 3: "resolved", 4: "closed" };
    return statusMap[status] || "open";
  };

  return (
    <StaffAdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Assigned Grievances</h1>
        <p className="text-sm text-gray-500 mb-6">Manage and respond to grievances assigned to you</p>

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
                  {["Ticket ID", "Student Name", "Category", "Priority", "Status", "Actions"].map((h) => (
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
                        <td className="px-6 py-4 text-sm text-gray-700">Student #{g.studentId}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{g.grievanceCategory}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityBadgeClass(g.priority || "Medium")}`}>
                            {g.priority || "Medium"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(mapStatus(g.status))}`}>
                            {getStatusLabel(mapStatus(g.status))}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#3A5B22] hover:bg-[#3A5B22]/10 rounded-lg transition-colors">
                              <Eye size={14} /> View
                            </button>
                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#3A5B22] hover:bg-[#3A5B22]/10 rounded-lg transition-colors">
                              <MessageSquare size={14} /> Reply
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>

            {!isLoading && grievances.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg font-semibold mb-1">No grievances assigned</p>
                <p className="text-sm">You have no pending assignments at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StaffAdminLayout>
  );
}
