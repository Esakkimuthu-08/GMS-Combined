import { StudentLayout } from "@/layouts/StudentLayout";
import React, { useState, useEffect, useMemo } from "react";
import {
    Search,
    Filter,
    ArrowLeft,
    Clock,
    User,
    MessageSquare,
    AlertCircle,
    Layers,
    BookOpen,
    UserCheck,
    Loader2,
    RefreshCw,
} from "lucide-react";
import Discussion from "@/components/Discussion";
import { Hook } from "@/api/hook";
import { useSearchParams } from "react-router-dom";
import { formatIndiaTimestamp } from "@/utils/dateTime";

function StudentDiscussion() {
    const [searchParams] = useSearchParams();
    const requestedGrievanceId = searchParams.get("grievanceId");
    const [selectedGrievanceId, setSelectedGrievanceId] = useState(() =>
        requestedGrievanceId ?? null
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const { data: unreadCounts = [] } = Hook.UnreadMessages();

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = Hook.StudentGrievances();

    const grievances = useMemo(() => data ?? [], [data]);

    useEffect(() => {
        if (requestedGrievanceId && grievances.some((g) => String(g.id) === requestedGrievanceId)) {
            setSelectedGrievanceId(grievances.find((g) => String(g.id) === requestedGrievanceId).id);
        }
    }, [requestedGrievanceId, grievances]);

    const mapStatus = (status) => {
        const statusMap = { 0: "Pending", 1: "InProgress", 2: "Resolved", 3: "Rejected" };
        return statusMap[status] ?? "Pending";
    };

    const activeGrievance = grievances.find((g) => String(g.id) === String(selectedGrievanceId));
    const unreadByGrievance = new Map(unreadCounts.map((item) => [
        String(item.grievanceId ?? item.GrievanceId),
        Number(item.unreadCount ?? item.UnreadCount ?? 0),
    ]));

    const filteredGrievances = grievances.filter((g) => {
        const matchesSearch =
            (g.ticketId ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (g.subject ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (g.student?.name ?? "").toLowerCase().includes(searchQuery.toLowerCase());

        const gStatus = mapStatus(g.status);
        const matchesStatus = statusFilter === "all" || gStatus === statusFilter;
        const matchesCategory =
            categoryFilter === "all" ||
            String(g.grievanceCategory ?? g.category ?? "")
                .toLowerCase() === categoryFilter.toLowerCase();

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const getStatusBadge = (rawStatus) => {
        const status = typeof rawStatus === "number" ? mapStatus(rawStatus) : rawStatus;
        switch (status) {
            case "Pending":
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">Pending</span>;
            case "InProgress":
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">In Progress</span>;
            case "Resolved":
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">Resolved</span>;
            case "Rejected":
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">Rejected</span>;
            default:
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">Pending</span>;
        }
    };

    const getPriorityIndicator = (priority) => {
        switch (priority) {
            case "High":
                return <span className="w-2.5 h-2.5 rounded-full bg-rose-500" title="High Priority" />;
            case "Medium":
                return <span className="w-2.5 h-2.5 rounded-full bg-amber-500" title="Medium Priority" />;
            case "Low":
                return <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Low Priority" />;
            default:
                return null;
        }
    };

    const formatMessageTime = (isoString) => {
        return formatIndiaTimestamp(isoString, {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }, "en-US");
    };

    return (
        <StudentLayout>
            <div className="flex flex-col h-[calc(100vh-10.5rem)] min-h-[580px] bg-gray-50/20 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                <div className="bg-white border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">My Discussions</h1>
                        <p className="text-xs text-gray-500">Communicate about your grievances with staff</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative min-w-[200px] flex-1 md:flex-initial">
                            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search grievances..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3A5B22]/20 focus:border-[#3A5B22] transition-all"
                            />
                        </div>

                        <div className="relative">
                            <Layers size={13} className="absolute left-2.5 top-3 text-gray-400" />
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="pl-7 pr-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3A5B22]/20 focus:border-[#3A5B22] appearance-none cursor-pointer"
                            >
                                <option value="all">All Categories</option>
                                <option value="Facilities">Facilities</option>
                                <option value="Hostel">Hostel</option>
                                <option value="Academic">Academic</option>
                            </select>
                        </div>

                        <div className="relative">
                            <Filter size={13} className="absolute left-2.5 top-3 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-7 pr-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3A5B22]/20 focus:border-[#3A5B22] appearance-none cursor-pointer"
                            >
                                <option value="all">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="InProgress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden relative">

                    <div className={`w-full md:w-[360px] lg:w-[400px] border-r border-gray-100 flex flex-col h-full bg-white transition-all duration-200 shrink-0 ${activeGrievance && selectedGrievanceId ? 'hidden md:flex' : 'flex'}`}>
                        <div className="flex-1 overflow-y-auto divide-y divide-gray-50" style={{ scrollbarWidth: "thin" }}>

                            {isLoading && (
                                <div className="flex flex-col items-center justify-center h-full gap-3 p-8">
                                    <Loader2 className="animate-spin text-[#3A5B22]" size={24} />
                                    <p className="text-xs text-gray-500">Loading grievances…</p>
                                </div>
                            )}

                            {isError && (
                                <div className="flex flex-col items-center justify-center h-full gap-3 p-8 text-center">
                                    <AlertCircle className="text-rose-400" size={28} />
                                    <p className="text-xs font-semibold text-gray-700">Failed to load grievances</p>
                                    <p className="text-[11px] text-gray-400">
                                        {error?.response?.data?.message ?? "Please try again."}
                                    </p>
                                    <button
                                        onClick={() => refetch()}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#3A5B22] text-white hover:bg-[#2e4a1a] transition-colors"
                                    >
                                        <RefreshCw size={12} /> Retry
                                    </button>
                                </div>
                            )}

                            {!isLoading && !isError && filteredGrievances.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                    <AlertCircle className="text-gray-300 mb-3" size={32} />
                                    <p className="text-xs font-medium text-gray-500">No grievances found</p>
                                    <p className="text-[11px] text-gray-400 mt-1">Try adjusting your filters or search query.</p>
                                </div>
                            )}

                            {!isLoading && !isError && filteredGrievances.map((g) => {
                                const isActive = String(g.id) === String(selectedGrievanceId);
                                const hasUnread = (unreadByGrievance.get(String(g.id)) ?? 0) > 0;
                                return (
                                    <div
                                        key={g.id}
                                        onClick={() => setSelectedGrievanceId(g.id)}
                                        className={`relative px-4 py-4 flex flex-col gap-1.5 cursor-pointer transition-all duration-150 border-l-4 hover:bg-gray-50/80
                                            ${isActive ? 'bg-[#3A5B22]/5 border-l-[#3A5B22]' : 'border-l-transparent bg-white'}
                                        `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs font-semibold ${isActive ? 'text-[#3A5B22]' : 'text-gray-600'}`}>
                                                    {g.ticketId}
                                                </span>
                                                {getPriorityIndicator(g.priority)}
                                                {hasUnread && (
                                                    <span
                                                        className="w-2 h-2 rounded-full bg-blue-500 shrink-0"
                                                        title="Unread messages"
                                                    />
                                                )}
                                            </div>
                                            <span className="text-[10px] text-gray-400">
                                                {formatMessageTime(g.updatedAt ?? g.createdAt)}
                                            </span>
                                        </div>

                                        <p className="text-xs font-medium text-gray-700 truncate">{g.subject}</p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] text-gray-400 truncate flex-1">
                                                {g.grievanceCategory ?? g.category}
                                            </span>
                                            {getStatusBadge(g.status)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={`flex-1 flex flex-col h-full bg-white transition-all duration-200 ${!activeGrievance ? 'hidden md:flex' : 'flex'}`}>
                        {activeGrievance ? (
                            <>
                                <div className="bg-white border-b border-gray-100 p-5 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setSelectedGrievanceId(null)}
                                                className="p-1 rounded-lg hover:bg-gray-100 md:hidden text-gray-500 transition-colors"
                                                title="Back to inbox"
                                            >
                                                <ArrowLeft size={18} />
                                            </button>

                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-[#3A5B22]">{activeGrievance.ticketId}</span>
                                                <span className="text-xs text-gray-400 font-medium px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-md">
                                                    {activeGrievance.grievanceCategory ?? activeGrievance.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(activeGrievance.status)}
                                        </div>
                                    </div>

                                    <h2 className="text-md font-bold text-gray-900 leading-snug">
                                        {activeGrievance.subject}
                                    </h2>

                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-500 bg-gray-50/50 rounded-xl p-3 border border-gray-100">
                                        {activeGrievance.student && (
                                            <>
                                                <div className="flex items-center gap-1.5">
                                                    <User size={13} className="text-[#3A5B22]" />
                                                    <span className="font-semibold text-gray-700">{activeGrievance.student.name}</span>
                                                    {activeGrievance.student.rollNo && (
                                                        <span className="text-gray-400">({activeGrievance.student.rollNo})</span>
                                                    )}
                                                </div>
                                                <span className="hidden sm:inline text-gray-300">|</span>
                                                {activeGrievance.student.department && (
                                                    <div className="flex items-center gap-1.5">
                                                        <BookOpen size={13} className="text-gray-400" />
                                                        <span>{activeGrievance.student.department}</span>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {activeGrievance.assignedToStaff && (
                                            <>
                                                <span className="hidden sm:inline text-gray-300">|</span>
                                                <div className="flex items-center gap-1.5">
                                                    <UserCheck size={13} className="text-gray-400" />
                                                    <span className="text-gray-600">
                                                        Assigned: {activeGrievance.assignedToStaff?.name ?? "Not assigned"}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <Discussion grievanceId={activeGrievance.id} />
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50/30 text-center">
                                <MessageSquare className="text-gray-300 mb-4" size={48} />
                                <h3 className="text-sm font-bold text-gray-700">No Grievance Selected</h3>
                                <p className="text-xs text-gray-400 max-w-xs mt-1">
                                    Select a grievance from the list to view and continue the discussion.
                                </p>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </StudentLayout>
    );
}

export default StudentDiscussion;
