import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message, className = "" }) {
  if (!message) return null;

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm ${className}`}
      role="alert"
    >
      <AlertCircle size={16} className="shrink-0" />
      <span>{message}</span>
    </div>
  );
}
