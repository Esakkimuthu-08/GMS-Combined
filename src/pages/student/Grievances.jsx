import { StudentLayout } from "../../layouts/StudentLayout";
import { Eye } from "lucide-react";

import { DiscussionSkeleton } from "../../components/common/SkeletonLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getStatusLabel, getStatusBadgeClass } from "../../utils/statusHelpers";
import { formatDate } from "../../utils/tokenUtils";
import React, { useState } from "react";
import { ViewButton } from "@/common/viewButton";
import { Hook } from "@/api/hook";



export default function StudentGrievances() {

  const [selectedGrievance, setSelectedGrievance] = useState(null);

  const { data, isLoading, isError, error } = Hook.StudentGrievances();

  const grievances = data || [];

  const mapStatus = (status) => {
    const statusMap = { 0: "Pending", 1: "InProgress", 2: "Resolved", 3: "Rejected" };
    return statusMap[status] || "New";
  };

  return (
    <StudentLayout>
      <div className="flex-1 overflow-y-auto">
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
                  ? Array.from({ length: 8 }).map((_, i) => <DiscussionSkeleton key={i} cols={6} />)
                  : grievances.map((g) => (
                    <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#3A5B22]">{g.ticketId}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{g.grievanceCategory}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{g.subject}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(g.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(mapStatus(g.status))}`}>
                          {getStatusLabel(mapStatus(g.status))}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => setSelectedGrievance(g)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#3A5B22] hover:bg-[#3A5B22]/10 rounded-lg transition-colors">
                          <Eye size={14} />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {selectedGrievance && (
              <ViewButton
                grievance={selectedGrievance}
                cancel={setSelectedGrievance} />
            )}

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
