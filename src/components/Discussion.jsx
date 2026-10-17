import { useEffect, useRef, useState } from "react";
import { AlertCircle, MessageSquare, RefreshCw, Send, Loader2 } from "lucide-react";
import { Hook } from "@/api/hook";
import { useAuthStore } from "@/stores/useAuthStore";
import { formatIndiaTimestamp, getIndiaDateKey, parseUtcTimestamp } from "@/utils/dateTime";

function formatTime(value) {
  return formatIndiaTimestamp(value, { hour: "numeric", minute: "2-digit" }, undefined);
}

function formatDate(value) {
  const date = parseUtcTimestamp(value);
  if (!date) return "Earlier";
  const dateKey = getIndiaDateKey(date);
  const todayKey = getIndiaDateKey(new Date());
  const yesterdayDate = new Date(`${todayKey}T00:00:00Z`);
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterdayKey = yesterdayDate.toISOString().slice(0, 10);
  if (dateKey === todayKey) return "Today";
  if (dateKey === yesterdayKey) return "Yesterday";
  return formatIndiaTimestamp(value, { month: "short", day: "numeric", year: "numeric" }, undefined);
}

function initials(name) {
  return (name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Discussion({ grievanceId }) {
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef(null);
  const readAttemptRef = useRef("");
  const user = useAuthStore((state) => state.user);
  const currentUserEmail = (user?.Email ?? user?.email ?? "").toLowerCase();

  const {
    data: messages = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = Hook.DiscussionMessages(grievanceId);
  const {
    mutate: markMessagesAsRead,
    isError: isMarkReadError,
    error: markReadError,
  } = Hook.MarkMessagesAsRead();
  const {
    mutate: sendMessage,
    isPending: isSending,
    isError: isSendError,
    error: sendError,
  } = Hook.AddMessage();

  useEffect(() => setReplyText(""), [grievanceId]);
  useEffect(() => {
    if (!grievanceId || !currentUserEmail) return;
    const unreadIncoming = messages.filter((message) => {
      const sender = String(message.sender ?? message.Sender ?? "").toLowerCase();
      const isRead = message.isRead ?? message.IsRead;
      return sender !== currentUserEmail && isRead === false;
    });
    if (unreadIncoming.length === 0) {
      readAttemptRef.current = "";
      return;
    }
    const ids = unreadIncoming.map((message) => message.id ?? message.Id).sort().join(",");
    const signature = `${grievanceId}:${ids || unreadIncoming.length}`;
    if (readAttemptRef.current === signature) return;
    readAttemptRef.current = signature;
    markMessagesAsRead(grievanceId, {
      onError: () => {
        if (readAttemptRef.current === signature) readAttemptRef.current = "";
      },
    });
  }, [messages, grievanceId, currentUserEmail, markMessagesAsRead]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleSend = (event) => {
    event.preventDefault();
    const message = replyText.trim();
    if (!message || !grievanceId || isSending) return;
    sendMessage({ grievanceId, message }, { onSuccess: () => setReplyText("") });
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-slate-50/70 p-8" role="status">
        <Loader2 className="h-7 w-7 animate-spin text-[#3A5B22]" />
        <p className="text-sm font-medium text-slate-500">Loading conversation…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-slate-50/70 p-8 text-center">
        <span className="rounded-2xl bg-rose-50 p-3 text-rose-600"><AlertCircle size={22} /></span>
        <div>
          <p className="font-semibold text-slate-800">We couldn’t load this conversation</p>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            {error?.response?.data?.message ?? "Check your connection and try again."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center gap-2 rounded-lg bg-[#3A5B22] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2e4a1a] disabled:opacity-60"
        >
          <RefreshCw size={15} className={isFetching ? "animate-spin" : ""} />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f7f8f6]">
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <MessageSquare size={16} className="text-[#3A5B22]" />
          Conversation
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
            {messages.length}
          </span>
        </div>
        <span className="text-xs text-slate-400">Replies are visible to the grievance team</span>
      </div>

      {isMarkReadError && (
        <p className="flex items-center gap-2 border-b border-rose-100 bg-rose-50 px-5 py-2 text-xs text-rose-700" role="alert">
          <AlertCircle size={14} className="shrink-0" />
          {markReadError?.response?.data?.message ?? "Could not update message read status. It will be retried while this conversation is open."}
        </p>
      )}

      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-7" aria-live="polite">
        {messages.length === 0 ? (
          <div className="flex h-full min-h-56 flex-col items-center justify-center text-center">
            <span className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 text-[#3A5B22] shadow-sm">
              <MessageSquare size={25} />
            </span>
            <h3 className="font-semibold text-slate-800">Start the conversation</h3>
            <p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">
              Send a message about this grievance. Updates and replies will appear here.
            </p>
          </div>
        ) : (
          messages.map((message, index) => {
            const sender = message.senderName ?? message.sender ?? "Participant";
            const isMe = Boolean(currentUserEmail) &&
              String(message.sender ?? message.Sender ?? "").toLowerCase() === currentUserEmail;
            const isRead = message.isRead ?? message.IsRead;
            const showDate = index === 0 ||
              formatDate(message.createdAt) !== formatDate(messages[index - 1].createdAt);
            return (
              <div key={message.id ?? `${message.createdAt}-${index}`}>
                {showDate && (
                  <div className="my-6 flex items-center gap-3" aria-label={formatDate(message.createdAt)}>
                    <span className="h-px flex-1 bg-slate-200" />
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-500">
                      {formatDate(message.createdAt)}
                    </span>
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>
                )}
                <div className={`flex max-w-[88%] items-end gap-2.5 sm:max-w-[78%] ${isMe ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-bold ${isMe ? "bg-[#3A5B22] text-white" : "border border-slate-200 bg-white text-slate-600"}`}>
                    {initials(sender)}
                  </span>
                  <div className={`flex min-w-0 flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div className={`mb-1 flex items-center gap-2 px-1 ${isMe ? "flex-row-reverse" : ""}`}>
                      <span className="text-xs font-semibold text-slate-700">{isMe ? "You" : sender}</span>
                      {message.senderRole && (
                        <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                          {message.senderRole}
                        </span>
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${isMe ? "rounded-br-md bg-[#3A5B22] text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-700"}`}>
                      <p className="whitespace-pre-wrap break-words">{message.message ?? message.content ?? ""}</p>
                    </div>
                    <span className="mt-1 flex items-center gap-1.5 px-1">
                      <time className="text-[11px] text-slate-400" dateTime={message.createdAt ?? message.CreatedAt}>
                        {formatTime(message.createdAt ?? message.CreatedAt)}
                      </time>
                      {isMe && (
                        <span
                          className={`text-[11px] font-semibold tracking-[-0.08em] ${isRead ? "text-sky-500" : "text-slate-400"}`}
                          title={isRead ? "Read" : "Sent"}
                          aria-label={isRead ? "Read by recipient" : "Sent, not yet read"}
                        >
                          ✓✓
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200 bg-white p-3 sm:px-5 sm:py-4">
        {isSendError && (
          <p className="mb-2 flex items-center gap-2 text-xs font-medium text-rose-700" role="alert">
            <AlertCircle size={14} />
            {sendError?.response?.data?.message ?? "Message wasn’t sent. Please try again."}
          </p>
        )}
        <form onSubmit={handleSend} className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-[#3A5B22]/50 focus-within:ring-2 focus-within:ring-[#3A5B22]/10">
          <label className="sr-only" htmlFor="discussion-reply">Write a message</label>
          <textarea
            id="discussion-reply"
            rows={1}
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend(event);
              }
            }}
            placeholder="Write a message…"
            disabled={isSending}
            className="max-h-32 min-h-10 flex-1 resize-y bg-transparent px-2 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!replyText.trim() || isSending}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[#3A5B22] px-3.5 text-sm font-semibold text-white transition hover:bg-[#2e4a1a] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            aria-label="Send message"
          >
            {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
        <p className="mt-2 px-1 text-[11px] text-slate-400">Press Enter to send · Shift + Enter for a new line</p>
      </div>
    </div>
  );
}

export default Discussion;
