import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck, MessageSquare, ClipboardCheck, X, Loader2, AlertCircle, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Hook } from "@/api/hook";
import { formatIndiaTimestamp } from "@/utils/dateTime";

function notificationIcon(message = "") {
  if (/message|reply|discussion/i.test(message)) return MessageSquare;
  if (/due|deadline/i.test(message)) return Clock3;
  return ClipboardCheck;
}

function formatTimestamp(value) {
  return formatIndiaTimestamp(value, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const isUnreadNotification = (notification) =>
  (notification.isRead ?? notification.IsRead) === false;

export default function NotificationCenter({ role = "student", variant = "dark" }) {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const markAllLockRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [actionError, setActionError] = useState("");
  const [markAllPending, setMarkAllPending] = useState(false);
  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = Hook.Notifications();
  const markOne = Hook.MarkNotificationRead();
  const unreadCount = notifications.filter(isUnreadNotification).length;

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const notificationPath = (notification) => {
    const grievanceId = notification.grievanceId ?? notification.GrievanceId;
    const basePath = role === "student"
      ? "/student/discussion"
      : role === "admin" ? "/admin/grievances" : "/staff/grievances";
    if (grievanceId == null) return basePath;
    const param = role === "staff" ? "replyGrievanceId" : "grievanceId";
    return `${basePath}?${param}=${encodeURIComponent(grievanceId)}`;
  };

  const openNotification = async (item) => {
    setActionError("");
    const notificationId = item.id ?? item.Id;
    if (isUnreadNotification(item)) {
      try {
        await markOne.mutateAsync({ notificationId });
      } catch (markError) {
        setActionError(markError.response?.data?.message ?? "Could not mark this notification as read. Try again.");
        return;
      }
    }
    setOpen(false);
    navigate(notificationPath(item));
  };

  const markAllRead = async () => {
    if (markAllLockRef.current) return;
    markAllLockRef.current = true;
    setActionError("");
    setMarkAllPending(true);
    let failures = 0;
    try {
      const unreadIds = notifications
        .filter(isUnreadNotification)
        .map((item) => item.id ?? item.Id);
      failures += unreadIds.filter((id) => id == null).length;
      const validIds = unreadIds.filter((id) => id != null);
      for (let index = 0; index < validIds.length; index += 4) {
        const batch = validIds.slice(index, index + 4);
        const results = await Promise.allSettled(
          batch.map((notificationId) => markOne.mutateAsync({ notificationId, invalidate: false }))
        );
        failures += results.filter((result) => result.status === "rejected").length;
      }

      const refreshResult = await refetch();
      if (refreshResult.error) {
        setActionError("The notification updates finished, but the server refresh failed. Try again.");
        return;
      }
      const unreadOnServer = (refreshResult.data ?? []).filter(isUnreadNotification).length;
      if (failures > 0 && unreadOnServer > 0) {
        setActionError(`${failures} update${failures === 1 ? "" : "s"} failed; the server still reports ${unreadOnServer} unread notification${unreadOnServer === 1 ? "" : "s"}.`);
      } else if (unreadOnServer > 0) {
        setActionError(`The mark-read requests succeeded, but the server still reports ${unreadOnServer} unread notification${unreadOnServer === 1 ? "" : "s"}.`);
      } else if (failures > 0) {
        setActionError(`${failures} notification update${failures === 1 ? "" : "s"} failed. The server now reports all notifications read.`);
      }
    } finally {
      markAllLockRef.current = false;
      setMarkAllPending(false);
    }
  };

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`relative grid h-10 w-10 place-items-center rounded-xl transition focus:outline-none focus:ring-2 ${variant === "light" ? "text-slate-500 hover:bg-slate-100 hover:text-[#3A5B22] focus:ring-[#3A5B22]/30" : "text-white/90 hover:bg-white/10 hover:text-white focus:ring-white/50"}`}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Bell size={19} />
        {unreadCount > 0 && (
          <span className={`absolute right-1 top-1 grid min-h-[17px] min-w-[17px] place-items-center rounded-full border-2 ${variant === "light" ? "border-white" : "border-[#3A5B22]"} bg-rose-500 px-1 text-[9px] font-bold leading-none text-white`}>
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <section
          role="dialog"
          aria-label="Notifications"
          className="fixed inset-x-3 top-[4.5rem] z-[100] flex max-h-[calc(100dvh-5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_20px_60px_-18px_rgba(15,23,42,0.32)] md:absolute md:inset-x-auto md:right-0 md:top-[calc(100%+12px)] md:max-h-none md:w-[390px]"
        >
          <div className="flex shrink-0 items-start justify-between border-b border-slate-100 px-4 py-3 sm:px-5 sm:py-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
                {unreadCount > 0 && <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">{unreadCount} new</span>}
              </div>
              <p className="mt-1 text-xs text-slate-500">Updates about your grievances</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close notifications" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700">
              <X size={16} />
            </button>
          </div>

          {actionError && (
            <p role="alert" className="flex shrink-0 items-center gap-2 border-b border-rose-100 bg-rose-50 px-4 py-2.5 text-xs text-rose-700 sm:px-5">
              <AlertCircle size={14} className="shrink-0" />{actionError}
            </p>
          )}

          <div className="min-h-0 flex-1 overflow-y-auto md:max-h-[min(65vh,440px)] md:flex-none">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 px-6 py-10 text-sm text-slate-500" role="status">
                <Loader2 size={17} className="animate-spin" /> Loading notifications…
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center px-6 py-8 text-center">
                <p className="text-sm font-semibold text-slate-700">Could not load notifications</p>
                <p className="mt-1 text-xs text-slate-500">{error?.response?.data?.message ?? "Check your connection and try again."}</p>
                <button type="button" onClick={() => refetch()} disabled={isFetching} className="mt-3 text-xs font-semibold text-[#3A5B22] disabled:opacity-50">
                  {isFetching ? "Refreshing…" : "Try again"}
                </button>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-10 text-center">
                <span className="mb-3 rounded-2xl bg-slate-100 p-3 text-slate-400"><Bell size={20} /></span>
                <p className="text-sm font-semibold text-slate-700">You are all caught up</p>
                <p className="mt-1 text-xs text-slate-500">New updates will show up here.</p>
              </div>
            ) : notifications.map((item) => {
              const message = item.message ?? item.Message ?? "Grievance update";
              const isUnread = isUnreadNotification(item);
              const Icon = notificationIcon(message);
              return (
                <button
                  key={item.id ?? item.Id}
                  type="button"
                  onClick={() => openNotification(item)}
                  disabled={markOne.isPending}
                  className={`flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 disabled:opacity-60 sm:px-5 sm:py-4 ${isUnread ? "bg-[#3A5B22]/[0.035]" : "bg-white"}`}
                >
                  <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${isUnread ? "bg-[#3A5B22]/10 text-[#3A5B22]" : "bg-slate-100 text-slate-500"}`}>
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex min-w-0 items-start justify-between gap-2">
                      <span className="min-w-0 break-words text-xs font-semibold text-slate-800 [overflow-wrap:anywhere]">{message}</span>
                      {isUnread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#3A5B22]" />}
                    </span>
                    <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium text-slate-400">
                      <span className="min-w-0 break-words text-[#3A5B22] [overflow-wrap:anywhere]">{item.grievanceId ?? item.GrievanceId ? `Grievance #${item.grievanceId ?? item.GrievanceId}` : "Grievance update"}</span>
                      <span>·</span><time className="min-w-0 break-words" dateTime={item.createdAt ?? item.CreatedAt}>{formatTimestamp(item.createdAt ?? item.CreatedAt)}</time>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 bg-slate-50 px-4 py-3 sm:px-5">
            <span className="text-[10px] text-slate-400">{isFetching ? "Updating…" : "Updates every 10 seconds"}</span>
            <button type="button" onClick={markAllRead} disabled={!unreadCount || markAllPending} className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-[#3A5B22] hover:text-[#2e4a1a] disabled:cursor-default disabled:text-slate-400" title="Marks notifications one at a time">
              {markAllPending ? <Loader2 size={14} className="animate-spin" /> : <CheckCheck size={14} />}
              Mark all read
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
