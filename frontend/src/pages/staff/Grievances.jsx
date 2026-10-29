import StaffAdminLayout from "../../layouts/StaffAdminLayout";
import { Eye, MessageSquare, X, Loader2, CircleCheck, AlertCircle, ChevronDown, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { grievanceService } from "../../api/grievanceService";
import { TableRowSkeleton } from "../../components/common/SkeletonLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getStatusLabel, getStatusBadgeClass, getPriorityBadgeClass, getStatusValue } from "../../utils/statusHelpers";
import { ViewButton } from "@/common/viewButton";
import Discussion from "@/components/Discussion";
import { Hook, getAuthQueryScope, staffGrievancesQueryKey } from "@/api/hook";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";


const STATUS_OPTIONS = [
  { value: 0, label: "Pending" },
  { value: 1, label: "In Progress" },
  { value: 2, label: "Resolved" },
  { value: 3, label: "Rejected" },
];

function StatusSelect({ grievance, disabled, onChange }) {
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(getStatusValue(grievance.status) ?? 0);
  const [position, setPosition] = useState(null);
  const value = getStatusValue(grievance.status);
  const selected = STATUS_OPTIONS.find((option) => option.value === value);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return undefined;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      const menu = menuRef.current;
      if (!rect || !menu) return;
      const width = Math.min(176, window.innerWidth - 16);
      const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
      const menuHeight = menu.offsetHeight;
      const spaceBelow = window.innerHeight - rect.bottom - 8;
      const placeAbove = spaceBelow < Math.min(menuHeight, 220) && rect.top > spaceBelow;
      const top = placeAbove
        ? Math.max(8, rect.top - menuHeight - 6)
        : Math.min(rect.bottom + 6, window.innerHeight - menuHeight - 8);
      setPosition({ top, left, width });
    };

    updatePosition();
    listRef.current?.focus();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsidePointer = (event) => {
      if (triggerRef.current?.contains(event.target) || menuRef.current?.contains(event.target)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [open]);

  const chooseOption = (option) => {
    setOpen(false);
    triggerRef.current?.focus();
    if (option.value !== value) onChange(grievance, String(option.value));
  };

  const handleListKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + direction + STATUS_OPTIONS.length) % STATUS_OPTIONS.length);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : STATUS_OPTIONS.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      chooseOption(STATUS_OPTIONS[activeIndex]);
    } else if (event.key === "Escape" || event.key === "Tab") {
      setOpen(false);
      if (event.key === "Escape") {
        event.preventDefault();
        triggerRef.current?.focus();
      }
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Update status for ${grievance.ticketId}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => {
          setActiveIndex(value ?? 0);
          setOpen((isOpen) => !isOpen);
        }}
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
            event.preventDefault();
            setActiveIndex(value ?? 0);
            setOpen(true);
          }
        }}
        className={`inline-flex w-[136px] max-w-full items-center justify-between gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-[#3A5B22]/30 disabled:cursor-wait disabled:opacity-60 ${getStatusBadgeClass(grievance.status)}`}
      >
        <span className="truncate">{selected?.label ?? "Unknown status"}</span>
        <ChevronDown size={14} className={`shrink-0 opacity-70 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && createPortal(
        <div
          ref={menuRef}
          className="fixed z-[120] overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10"
          style={{ top: position?.top ?? -10000, left: position?.left ?? 8, width: position?.width ?? 176, visibility: position ? "visible" : "hidden" }}
        >
          <div
            ref={listRef}
            role="listbox"
            tabIndex={0}
            aria-label={`Status options for ${grievance.ticketId}`}
            aria-activedescendant={`status-option-${grievance.id}-${STATUS_OPTIONS[activeIndex].value}`}
            onKeyDown={handleListKeyDown}
            className="max-h-[min(16rem,60vh)] overflow-y-auto outline-none"
          >
            {STATUS_OPTIONS.map((option, index) => {
              const isSelected = option.value === value;
              const isActive = index === activeIndex;
              return (
                <div
                  key={option.value}
                  id={`status-option-${grievance.id}-${option.value}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => chooseOption(option)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${getStatusBadgeClass(option.value)} ${isActive ? "ring-1 ring-inset ring-slate-200" : ""} hover:brightness-[0.98]`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check size={15} aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}


export default function StaffGrievances() {
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [replyGrievance, setReplyGrievance] = useState(null);
  const [pendingStatusId, setPendingStatusId] = useState(null);
  const [statusNotice, setStatusNotice] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedGrievanceId = searchParams.get("replyGrievanceId");
  const role = useAuthStore((state) => state.role);
  const user = useAuthStore((state) => state.user);
  const scope = getAuthQueryScope(role, user);
  const { data: unreadCounts = [] } = Hook.UnreadMessages();
  const updateStatus = Hook.UpdateGrievanceStatus();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: staffGrievancesQueryKey(scope),
    queryFn: () => grievanceService.getStaffGrievances(),
    select: (res) => {
      const list = res.data?.grievances ?? res.data;
      return Array.isArray(list) ? list : [];
    },
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: Boolean(user),
  });

  const grievances = useMemo(() => data ?? [], [data]);
  const unreadByGrievance = new Map(unreadCounts.map((item) => [
    String(item.grievanceId ?? item.GrievanceId),
    Number(item.unreadCount ?? item.UnreadCount ?? 0),
  ]));

  useEffect(() => {
    if (!requestedGrievanceId) return;
    const match = grievances.find((g) => String(g.id) === requestedGrievanceId);
    if (!match) return;
    setReplyGrievance(match);
    const params = new URLSearchParams(searchParams);
    params.delete("replyGrievanceId");
    setSearchParams(params, { replace: true });
  }, [requestedGrievanceId, grievances, searchParams, setSearchParams]);

  useEffect(() => {
    if (!statusNotice) return undefined;
    const timeoutId = window.setTimeout(() => setStatusNotice(null), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [statusNotice]);

  const handleStatusChange = async (grievance, selectedValue) => {
    const grievanceStatus = Number(selectedValue);
    const grievanceId = Number(grievance.id);
    const currentStatus = getStatusValue(grievance.status);
    if (!Number.isInteger(grievanceId) || !Number.isInteger(grievanceStatus) ||
      currentStatus === grievanceStatus || updateStatus.isPending) return;
    if ((grievanceStatus === 2 || grievanceStatus === 3) &&
      !window.confirm(`Change ${grievance.ticketId} to ${getStatusLabel(grievanceStatus)}?`)) return;

    setPendingStatusId(grievanceId);
    setStatusNotice(null);
    try {
      await updateStatus.mutateAsync({ grievanceId, grievanceStatus });
      setStatusNotice({
        type: "success",
        message: `${grievance.ticketId} updated to ${getStatusLabel(grievanceStatus)}.`,
      });
    } catch (updateError) {
      setStatusNotice({
        type: "error",
        message: updateError.response?.data?.message ?? "Status update failed. The previous status was kept.",
      });
    } finally {
      setPendingStatusId(null);
    }
  };

  return (
    <StaffAdminLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Assigned Grievances</h1>
        <p className="text-sm text-gray-500 mb-6">Manage and respond to grievances assigned to you</p>

        {statusNotice && (
          <div
            className={`fixed right-5 top-20 z-[110] flex max-w-sm items-start gap-2 rounded-xl border px-4 py-3 text-sm shadow-lg ${statusNotice.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-800"}`}
            role={statusNotice.type === "error" ? "alert" : "status"}
            aria-live={statusNotice.type === "error" ? "assertive" : "polite"}
          >
            {statusNotice.type === "success" ? <CircleCheck size={17} className="mt-0.5 shrink-0" /> : <AlertCircle size={17} className="mt-0.5 shrink-0" />}
            <span>{statusNotice.message}</span>
          </div>
        )}

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
                      <td className="px-6 py-4 text-sm font-semibold text-[#3A5B22]">{g.ticketId}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{g.student?.name ?? `Student #${g.studentId}`}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{g.grievanceCategory}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityBadgeClass(g.priority || "Medium")}`}>
                          {g.priority || "Medium"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-2">
                          <StatusSelect
                            grievance={g}
                            disabled={updateStatus.isPending}
                            onChange={handleStatusChange}
                          />
                          {pendingStatusId === Number(g.id) && <Loader2 size={14} className="animate-spin text-slate-400" aria-label="Saving status" />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setSelectedGrievance(g)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#3A5B22] hover:bg-[#3A5B22]/10 rounded-lg transition-colors"
                          >
                            <Eye size={14} /> View
                          </button>
                          <button
                            onClick={() => setReplyGrievance(g)}
                            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#3A5B22] hover:bg-[#3A5B22]/10 rounded-lg transition-colors"
                          >
                            <MessageSquare size={14} /> Reply
                            {(unreadByGrievance.get(String(g.id)) ?? 0) > 0 && (
                              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-blue-500" title="Unread messages" aria-label="Unread messages" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {selectedGrievance && (
              <ViewButton
                grievance={selectedGrievance}
                cancel={setSelectedGrievance}
                showStudentDetails={true}
              />
            )}

            {!isLoading && grievances.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg font-semibold mb-1">No grievances assigned</p>
                <p className="text-sm">You have no pending assignments at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {replyGrievance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

            <div className="flex items-center justify-between bg-[#3A5B22] text-white px-5 py-4 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <MessageSquare size={18} className="shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">
                    {replyGrievance.ticketId}
                    <span className="ml-2 text-xs font-normal opacity-80">
                      {replyGrievance.grievanceCategory}
                    </span>
                  </p>
                  <p className="text-xs opacity-75 truncate">{replyGrievance.subject}</p>
                </div>
              </div>
              <button
                onClick={() => setReplyGrievance(null)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors shrink-0 ml-4"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <Discussion grievanceId={replyGrievance.id} />
          </div>
        </div>
      )}
    </StaffAdminLayout>
  );
}
