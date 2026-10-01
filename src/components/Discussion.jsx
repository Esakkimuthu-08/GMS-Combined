import React, { useState, useEffect, useRef } from "react";
import {
    Paperclip,
    Send,
    MessageSquare,
    AlertCircle,
    Loader2,
    RefreshCw,
} from "lucide-react";
import { Hook } from "@/api/hook";
import { useAuthStore } from "@/stores/useAuthStore";


function Discussion({ grievanceId }) {
    const [replyText, setReplyText] = useState("");
    const messagesEndRef = useRef(null);

    const user = useAuthStore((s) => s.user);
    const currentUserEmail = user?.email ?? "";

    const {
        data: messages = [],
        isLoading,
        isError,
        error,
        refetch,
    } = Hook.DiscussionMessages(grievanceId);

    const { mutate: sendMessage, isPending: isSending } = Hook.AddMessage();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        const trimmed = replyText.trim();
        if (!trimmed || !grievanceId || isSending) return;

        sendMessage(
            { grievanceId, message: trimmed },
            {
                onSuccess: () => {
                    setReplyText("");
                },
            }
        );
    };

    const formatMessageTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getRelativeDateDivider = (isoString) => {
        const date = new Date(isoString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return "Today";
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 bg-slate-50/30">
                <Loader2 className="animate-spin text-[#3A5B22]" size={28} />
                <p className="text-xs text-gray-500 font-medium">Loading messages…</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 bg-slate-50/30 text-center">
                <AlertCircle className="text-rose-400" size={28} />
                <p className="text-sm font-semibold text-gray-700">Failed to load messages</p>
                <p className="text-xs text-gray-400 max-w-xs">
                    {error?.response?.data?.message ?? "Something went wrong. Please try again."}
                </p>
                <button
                    onClick={() => refetch()}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-[#3A5B22] text-white hover:bg-[#2e4a1a] transition-colors"
                >
                    <RefreshCw size={12} />
                    Retry
                </button>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <>
                <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 bg-slate-50/30 text-center">
                    <MessageSquare className="text-gray-300" size={40} />
                    <p className="text-sm font-bold text-gray-700">No messages yet</p>
                    <p className="text-xs text-gray-400 max-w-xs">
                        Start the conversation by sending the first message below.
                    </p>
                </div>
                <MessageInput
                    replyText={replyText}
                    setReplyText={setReplyText}
                    handleSend={handleSend}
                    isSending={isSending}
                />
            </>
        );
    }

    return (
        <>
            <div
                className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/30"
                style={{ scrollbarWidth: "thin" }}
            >
                {messages.map((message, index) => {
                    const isMe =
                        currentUserEmail &&
                        message.sender?.toLowerCase() === currentUserEmail.toLowerCase();

                    const showDateDivider =
                        index === 0 ||
                        getRelativeDateDivider(message.timestamp) !==
                        getRelativeDateDivider(messages[index - 1].timestamp);

                    return (
                        <React.Fragment key={message.id ?? index}>
                            {showDateDivider && (
                                <div className="flex items-center justify-center my-6">
                                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full border border-gray-100 tracking-wide uppercase">
                                        {getRelativeDateDivider(message.timestamp)}
                                    </span>
                                </div>
                            )}

                            <div
                                className={`flex items-start gap-3 ${isMe ? "flex-row-reverse" : "flex-row"} max-w-[85%] ${isMe ? "ml-auto" : "mr-auto"}`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm ${isMe ? "bg-blue-600" : "bg-[#3A5B22]"}`}
                                >
                                    {(message.senderName ?? message.sender ?? "?")
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className={`flex items-baseline gap-2 px-1 ${isMe ? "flex-row-reverse" : ""}`}>
                                        <span className="text-xs font-bold text-gray-700">
                                            {message.senderName ?? message.sender}
                                        </span>
                                        {message.senderRole && (
                                            <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">
                                                {message.senderRole}
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        className={`px-4 py-3 rounded-2xl shadow-sm text-xs leading-relaxed border ${isMe
                                            ? "bg-[#3A5B22]/10 border-[#3A5B22]/15 text-gray-900 rounded-tr-none"
                                            : "bg-white border-gray-100 text-gray-800 rounded-tl-none"
                                            }`}
                                    >
                                        <p style={{ whiteSpace: "pre-line" }}>{message.message ?? message.content}</p>
                                    </div>

                                    <span className={`text-[10px] text-gray-400 mt-1 px-1 ${isMe ? "text-right" : "text-left"}`}>
                                        {formatMessageTime(message.timestamp ?? message.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <MessageInput
                replyText={replyText}
                setReplyText={setReplyText}
                handleSend={handleSend}
                isSending={isSending}
            />
        </>
    );
}


function MessageInput({ replyText, setReplyText, handleSend, isSending }) {
    return (
        <form
            onSubmit={handleSend}
            className="border-t border-gray-100 bg-white p-4 flex items-center gap-3"
        >
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
                placeholder="Type your reply…"
                disabled={isSending}
                className="flex-1 py-2.5 px-4 text-xs bg-gray-50 rounded-xl border border-gray-200 outline-none focus:bg-white focus:ring-2 focus:ring-[#3A5B22]/20 focus:border-[#3A5B22] transition-all disabled:opacity-60"
            />

            <button
                type="submit"
                disabled={!replyText.trim() || isSending}
                className={`p-2.5 rounded-xl transition-all ${replyText.trim() && !isSending
                    ? "bg-[#3A5B22] text-white hover:bg-[#2e4a1a]"
                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
            >
                {isSending ? (
                    <Loader2 size={15} className="animate-spin" />
                ) : (
                    <Send size={15} />
                )}
            </button>
        </form>
    );
}

export default Discussion;
