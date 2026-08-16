import { StudentLayout } from "@/layouts/StudentLayout";
import React, { useState, useEffect, useRef } from "react";
import {
    Search,
    Filter,
    ArrowLeft,
    Paperclip,
    Send,
    Clock,
    User,
    MessageSquare,
    AlertCircle,
    CheckCircle,
    HelpCircle,
    Maximize2,
    Calendar,
    Layers,
    ChevronRight,
    BookOpen,
    Home,
    UserCheck
} from "lucide-react";

const initialGrievances = [
    {
        id: 1,
        ticketId: "GMS-00021",
        student: {
            name: "Esakkimuthu S",
            rollNo: "22BCS012",
            email: "esakkimuthu@college.edu",
            department: "Computer Science"
        },
        subject: "Internet connection issue in Hostel B",
        category: "Facilities",
        status: "open",
        priority: "High",
        createdAt: "2026-08-15T10:30:00.000Z",
        assignedStaff: "Mr. Ramesh (IT Support)",
        unreadCount: 2,
        messages: [
            {
                id: 101,
                sender: "Esakkimuthu S",
                role: "student",
                content: "The internet connection in our block is not working since yesterday. I cannot access the course materials.",
                timestamp: "2026-08-15T10:30:00.000Z"
            },
            {
                id: 102,
                sender: "Mr. Ramesh (IT Support)",
                role: "staff",
                content: "Thank you for reporting this. We have forwarded the issue to the IT department. A technician is assigned.",
                timestamp: "2026-08-15T10:38:00.000Z"
            },
            {
                id: 103,
                sender: "Esakkimuthu S",
                role: "student",
                content: "Is there any update on this? The lab classes are starting and we need to submit assignments.",
                timestamp: "2026-08-16T10:40:00.000Z"
            },
            {
                id: 104,
                sender: "Mr. Ramesh (IT Support)",
                role: "staff",
                content: "We have forwarded this to the network administrator who is currently inspecting the router.",
                timestamp: "2026-08-16T10:42:00.000Z"
            }
        ]
    },
    {
        id: 2,
        ticketId: "GMS-00020",
        student: {
            name: "Jane Cooper",
            rollNo: "22BEE045",
            email: "jane.cooper@college.edu",
            department: "Electrical Engineering"
        },
        subject: "Hostel water supply disruption",
        category: "Hostel",
        status: "in_progress",
        priority: "High",
        createdAt: "2026-08-15T15:00:00.000Z",
        assignedStaff: "Ms. Priya (Hostel Warden)",
        unreadCount: 1,
        messages: [
            {
                id: 201,
                sender: "Jane Cooper",
                role: "student",
                content: "Water supply in the second-floor restrooms of Hostel Block A has been disrupted since morning.",
                timestamp: "2026-08-15T16:00:00.000Z"
            },
            {
                id: 202,
                sender: "Ms. Priya (Hostel Warden)",
                role: "staff",
                content: "We have notified the maintenance team. They will inspect the water pump tomorrow morning.",
                timestamp: "2026-08-15T17:30:00.000Z"
            },
            {
                id: 203,
                sender: "Jane Cooper",
                role: "student",
                content: "Please check the plumbing, we still don't have water.",
                timestamp: "2026-08-16T09:15:00.000Z"
            }
        ]
    },
    {
        id: 3,
        ticketId: "GMS-00019",
        student: {
            name: "Alex Rivera",
            rollNo: "22BME089",
            email: "alex.rivera@college.edu",
            department: "Mechanical Engineering"
        },
        subject: "Replacement ID card request",
        category: "Academic",
        status: "resolved",
        priority: "Low",
        createdAt: "2026-08-12T06:30:00.000Z",
        assignedStaff: "Dr. Srinivasan (Dean Office)",
        unreadCount: 0,
        messages: [
            {
                id: 301,
                sender: "Alex Rivera",
                role: "student",
                content: "I lost my college ID card during the sports meet. How can I get a duplicate card?",
                timestamp: "2026-08-12T12:00:00.000Z"
            },
            {
                id: 302,
                sender: "Dr. Srinivasan (Dean Office)",
                role: "staff",
                content: "Please fill out the duplicate ID application form, pay the fee at the cash counter, and upload the receipt here.",
                timestamp: "2026-08-13T10:00:00.000Z"
            },
            {
                id: 303,
                sender: "Alex Rivera",
                role: "student",
                content: "Attached is the receipt for the ID card replacement fee.",
                timestamp: "2026-08-14T11:00:00.000Z"
            },
            {
                id: 304,
                sender: "Dr. Srinivasan (Dean Office)",
                role: "staff",
                content: "Your request is completed. You can collect your new ID card from the Student Affairs office tomorrow.",
                timestamp: "2026-08-15T09:00:00.000Z"
            }
        ]
    },
    {
        id: 4,
        ticketId: "GMS-00018",
        student: {
            name: "Liam Davis",
            rollNo: "23BCI002",
            email: "liam.davis@college.edu",
            department: "Civil Engineering"
        },
        subject: "Inquiry regarding merit scholarship status",
        category: "Academic",
        status: "closed",
        priority: "Medium",
        createdAt: "2026-08-10T05:00:00.000Z",
        assignedStaff: "Mrs. Anjali (Accounts Dept)",
        unreadCount: 0,
        messages: [
            {
                id: 401,
                sender: "Liam Davis",
                role: "student",
                content: "I want to know if my documents for the Merit Scholarship have been verified. I haven't received the release date.",
                timestamp: "2026-08-10T10:00:00.000Z"
            },
            {
                id: 402,
                sender: "Mrs. Anjali (Accounts Dept)",
                role: "staff",
                content: "The documents are under verification with the academic dean. The scholarship disbursement list will be published next week.",
                timestamp: "2026-08-13T14:00:00.000Z"
            }
        ]
    }
];

function StudentDiscussion() {
    const [grievances, setGrievances] = useState(initialGrievances);
    const [selectedGrievanceId, setSelectedGrievanceId] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [replyText, setReplyText] = useState("");

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (selectedGrievanceId) {
            setGrievances(prevGrievances =>
                prevGrievances.map(g =>
                    g.id === selectedGrievanceId ? { ...g, unreadCount: 0 } : g
                )
            );
        }
    }, [selectedGrievanceId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedGrievanceId, grievances]);

    const activeGrievance = grievances.find(g => g.id === selectedGrievanceId);

    const filteredGrievances = grievances.filter(g => {
        const matchesSearch =
            g.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            g.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            g.subject.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === "all" || g.status === statusFilter;
        const matchesCategory = categoryFilter === "all" || g.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleSendReply = (e) => {
        e.preventDefault();
        if (!replyText.trim() || !activeGrievance) return;

        const newMessage = {
            id: Date.now(),
            sender: "Esakkimuthu S",
            role: "student",
            content: replyText,
            timestamp: new Date().toISOString()
        };

        setGrievances(prevGrievances =>
            prevGrievances.map(g => {
                if (g.id === activeGrievance.id) {
                    return {
                        ...g,
                        messages: [...g.messages, newMessage]
                    };
                }
                return g;
            })
        );

        setReplyText("");
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "open":
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">Open</span>;
            case "in_progress":
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">In Progress</span>;
            case "resolved":
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">Resolved</span>;
            case "closed":
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">Closed</span>;
            default:
                return null;
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
        const date = new Date(isoString);
        return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    };

    const getRelativeDateDivider = (isoString) => {
        const date = new Date(isoString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
        }
    };

    return (
        <StudentLayout>
            <div className="flex flex-col h-[calc(100vh-10.5rem)] min-h-[580px] bg-gray-50/20 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                <div className="bg-white border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Student Discussion</h1>
                        <p className="text-xs text-gray-500">Manage and communicate about student grievances</p>
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
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden relative">

                    <div className={`w-full md:w-[360px] lg:w-[400px] border-r border-gray-100 flex flex-col h-full bg-white transition-all duration-200 shrink-0 ${activeGrievance && selectedGrievanceId ? 'hidden md:flex' : 'flex'}`}>
                        <div className="flex-1 overflow-y-auto divide-y divide-gray-50" style={{ scrollbarWidth: "thin" }}>
                            {filteredGrievances.length > 0 ? (
                                filteredGrievances.map((g) => {
                                    const lastMessage = g.messages[g.messages.length - 1];
                                    const isActive = g.id === selectedGrievanceId;
                                    const isUnread = g.unreadCount > 0;

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
                                                </div>
                                                <span className="text-[10px] text-gray-400">
                                                    {lastMessage ? formatMessageTime(lastMessage.timestamp) : ""}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className={`text-xs ${isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                                    {g.student.name}
                                                </span>
                                                {getStatusBadge(g.status)}
                                            </div>

                                            <p className={`text-xs truncate ${isUnread ? 'font-bold text-gray-900' : 'text-gray-700 font-normal'}`}>
                                                {g.subject}
                                            </p>

                                            <div className="flex items-center justify-between gap-4">
                                                <p className="text-[11px] text-gray-400 truncate flex-1">
                                                    {lastMessage ? lastMessage.content : "No messages yet"}
                                                </p>
                                                {isUnread && (
                                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#3A5B22] text-white tracking-wide shadow-sm animate-pulse">
                                                        {g.unreadCount} new
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                    <AlertCircle className="text-gray-300 mb-3" size={32} />
                                    <p className="text-xs font-medium text-gray-500">No grievances found</p>
                                    <p className="text-[11px] text-gray-400 mt-1">Try adjusting your filters or search query.</p>
                                </div>
                            )}
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
                                                    {activeGrievance.category}
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
                                        <div className="flex items-center gap-1.5">
                                            <User size={13} className="text-[#3A5B22]" />
                                            <span className="font-semibold text-gray-700">{activeGrievance.student.name}</span>
                                            <span className="text-gray-400">({activeGrievance.student.rollNo})</span>
                                        </div>
                                        <span className="hidden sm:inline text-gray-300">|</span>
                                        <div className="flex items-center gap-1.5">
                                            <BookOpen size={13} className="text-gray-400" />
                                            <span>{activeGrievance.student.department}</span>
                                        </div>
                                        <span className="hidden sm:inline text-gray-300">|</span>
                                        <div className="flex items-center gap-1.5">
                                            <UserCheck size={13} className="text-gray-400" />
                                            <span className="text-gray-600">Assigned: {activeGrievance.assignedStaff}</span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/30"
                                    style={{ scrollbarWidth: "thin" }}
                                >
                                    {activeGrievance.messages.map((message, index) => {
                                        const isStaff = message.role === "staff";
                                        const showDateDivider = index === 0 ||
                                            getRelativeDateDivider(message.timestamp) !== getRelativeDateDivider(activeGrievance.messages[index - 1].timestamp);

                                        return (
                                            <React.Fragment key={message.id}>
                                                {showDateDivider && (
                                                    <div className="flex items-center justify-center my-6">
                                                        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full border border-gray-100 tracking-wide uppercase">
                                                            {getRelativeDateDivider(message.timestamp)}
                                                        </span>
                                                    </div>
                                                )}

                                                <div className={`flex items-start gap-3 ${isStaff ? 'flex-row' : 'flex-row-reverse'} max-w-[85%] ${isStaff ? 'mr-auto' : 'ml-auto'}`}>

                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm
                            ${isStaff ? 'bg-[#3A5B22]' : 'bg-blue-600'}
                          `}>
                                                        {message.sender.charAt(0).toUpperCase()}
                                                    </div>

                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-baseline gap-2 px-1">
                                                            <span className="text-xs font-bold text-gray-700">{message.sender}</span>
                                                            <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">{message.role}</span>
                                                        </div>

                                                        <div className={`px-4 py-3 rounded-2xl shadow-sm text-xs leading-relaxed border
                              ${isStaff
                                                                ? 'bg-white border-gray-100 text-gray-800 rounded-tl-none'
                                                                : 'bg-[#3A5B22]/10 border-[#3A5B22]/15 text-gray-900 rounded-tr-none'
                                                            }
                            `}>
                                                            <p style={{ whiteSpace: "pre-line" }}>{message.content}</p>
                                                        </div>

                                                        <span className={`text-[10px] text-gray-400 mt-1 px-1 ${isStaff ? 'text-left' : 'text-right'}`}>
                                                            {formatMessageTime(message.timestamp)}
                                                        </span>
                                                    </div>

                                                </div>
                                            </React.Fragment>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>

                                <form onSubmit={handleSendReply} className="border-t border-gray-100 bg-white p-4 flex items-center gap-3">
                                    <button
                                        type="button"
                                        className="p-2 rounded-xl text-gray-400 hover:text-[#3A5B22] hover:bg-gray-50 transition-colors"
                                        title="Attach Files"
                                    >
                                        <Paperclip size={18} />
                                    </button>

                                    <input
                                        type="text"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Type your reply..."
                                        className="flex-1 py-2.5 px-4 text-xs bg-gray-50 rounded-xl border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#3A5B22]/20 focus:border-[#3A5B22] transition-all"
                                    />

                                    <button
                                        type="submit"
                                        disabled={!replyText.trim()}
                                        className={`p-2.5 rounded-xl transition-all ${replyText.trim()
                                            ? 'bg-[#3A5B22] text-white hover:bg-[#2e4a1a]'
                                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                            }`}
                                    >
                                        <Send size={15} />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50/30 text-center">
                                <MessageSquare className="text-gray-300 mb-4" size={48} />
                                <h3 className="text-sm font-bold text-gray-700">No Grievance Selected</h3>
                                <p className="text-xs text-gray-400 max-w-xs mt-1">
                                    Select a student grievance from the inbox list to view discussion thread, assign staff, and respond.
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