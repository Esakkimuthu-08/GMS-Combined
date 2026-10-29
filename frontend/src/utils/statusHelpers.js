const STATUS_LABELS = ["Pending", "In Progress", "Resolved", "Rejected"];

export const getStatusValue = (status) => {
  if (typeof status === "number" && Number.isInteger(status)) {
    return status >= 0 && status < STATUS_LABELS.length ? status : null;
  }
  if (status == null) return null;
  const normalized = String(status).trim().toLowerCase().replace(/[\s_-]/g, "");
  const values = {
    pending: 0,
    new: 0,
    open: 0,
    inprogress: 1,
    resolved: 2,
    rejected: 3,
  };
  if (/^\d+$/.test(normalized)) {
    const numericStatus = Number(normalized);
    return numericStatus >= 0 && numericStatus < STATUS_LABELS.length ? numericStatus : null;
  }
  return values[normalized] ?? null;
};

export const getStatusLabel = (status) => {
  const value = getStatusValue(status);
  if (value !== null) return STATUS_LABELS[value];
  if (status == null || status === "") return "Unknown";
  const text = String(status).trim();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "Unknown";
};

export const getStatusBadgeClass = (status) => {
  const classes = {
    0: "bg-blue-50 text-blue-700 border-blue-100",
    1: "bg-amber-50 text-amber-700 border-amber-100",
    2: "bg-emerald-50 text-emerald-700 border-emerald-100",
    3: "bg-rose-50 text-rose-700 border-rose-100",
  };
  const value = getStatusValue(status);
  return value === null ? "bg-gray-100 text-gray-700 border-gray-200" : classes[value];
};

export const getPriorityBadgeClass = (priority) => {
  const classes = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };
  return classes[priority] ?? "bg-gray-100 text-gray-700";
};
