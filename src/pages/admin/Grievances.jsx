import StaffAdminLayout from "../../layouts/StaffAdminLayout";
import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { grievanceService } from "../../api/grievanceService";
import { TableRowSkeleton } from "../../components/common/SkeletonLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getStatusLabel, getStatusBadgeClass } from "../../utils/statusHelpers";

const MOCK_GRIEVANCES = [
  { id: "GRV-001", studentName: "John Doe", category: "Academic", department: "Engineering", status: "closed" },
  { id: "GRV-002", studentName: "Jane Smith", category: "Facilities", department: "Science", status: "in_progress" },
  { id: "GRV-003", studentName: "Mike Johnson", category: "Hostel", department: "Commerce", status: "open" },
  { id: "GRV-004", studentName: "Sarah Williams", category: "Staff Conduct", department: "Engineering", status: "in_progress" },
  { id: "GRV-005", studentName: "Tom Brown", category: "Attendance", department: "Arts", status: "closed" },
];

export default function AdminGrievances() {
  const [filters, setFilters] = useState({ search: "", category: "", department: "", status: "" });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-grievances-list", filters],
    queryFn: () => grievanceService.getAllGrievances(filters),
    select: (res) => res.data?.grievances ?? res.data,
    staleTime: 1000 * 60 * 2,
  });

  const grievances = data ?? MOCK_GRIEVANCES;

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const selectClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]/30 focus:border-[#3A5B22] transition";

  return (
    <StaffAdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">All Grievances</h1>
        <p className="text-sm text-gray-500 mb-6">Monitor and manage all grievances across departments</p>

        {isError && (
          <ErrorMessage
            message={error?.response?.data?.message || "Failed to load grievances. Showing cached data."}
            className="mb-6"
          />
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl border shadow-sm p-5 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Search</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilter}
                  placeholder="Ticket ID or name"
                  className={`${selectClass} pl-9`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</label>
              <select name="category" value={filters.category} onChange={handleFilter} className={selectClass}>
                <option value="">All Categories</option>
                <option value="Academic">Academic</option>
                <option value="Facilities">Facilities</option>
                <option value="Staff Conduct">Staff Conduct</option>
                <option value="Hostel">Hostel</option>
                <option value="Attendance">Attendance</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Department</label>
              <select name="department" value={filters.department} onChange={handleFilter} className={selectClass}>
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Status</label>
              <select name="status" value={filters.status} onChange={handleFilter} className={selectClass}>
                <option value="">All Statuses</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
                <option value="reopened">Reopened</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["Ticket ID", "Student Name", "Category", "Department", "Status", "Actions"].map((h) => (
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
                        <td className="px-6 py-4 text-sm text-gray-700">{g.studentName}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{g.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{g.department}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(g.status)}`}>
                            {getStatusLabel(g.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <button className="px-3 py-1.5 text-sm text-[#3A5B22] hover:bg-[#3A5B22]/10 rounded-lg transition-colors">
                              View
                            </button>
                            <button className="px-3 py-1.5 text-sm text-[#3A5B22] hover:bg-[#3A5B22]/10 rounded-lg transition-colors">
                              Assign
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>

            {!isLoading && grievances.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg font-semibold mb-1">No grievances found</p>
                <p className="text-sm">Try adjusting the filters above.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StaffAdminLayout>
  );
}
