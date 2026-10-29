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

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="divide-y divide-gray-100 lg:hidden">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-3 p-4" aria-hidden="true">
                  <div className="h-4 w-2/5 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-3/5 animate-pulse rounded bg-gray-100" />
                </div>
              ))
              : grievances.map((g) => (
                <article key={g.id} className="space-y-3 p-4">
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Ticket ID</p>
                      <p className="break-all text-sm font-semibold text-[#3A5B22]">{g.ticketId}</p>
                    </div>
                    <div className="shrink-0 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(mapStatus(g.status))}`}>
                        {getStatusLabel(mapStatus(g.status))}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Category</p>
                      <p className="break-words text-gray-700">{g.grievanceCategory}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Date</p>
                      <p className="text-gray-700">{formatDate(g.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Subject</p>
                      <p className="break-words text-sm text-gray-700">{g.subject}</p>
                    </div>
                    <button onClick={() => setSelectedGrievance(g)} className="inline-flex min-h-10 shrink-0 items-center gap-1.5 self-start rounded-lg px-3 text-sm text-[#3A5B22] transition-colors hover:bg-[#3A5B22]/10 sm:self-auto">
                      <Eye size={14} />
                      Details
                    </button>
                  </div>
                </article>
              ))}
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[900px]">
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
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-[#3A5B22]">{g.ticketId}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{g.grievanceCategory}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{g.subject}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(g.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(mapStatus(g.status))}`}>
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

          </div>

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
    </StudentLayout>
  );
}
