export const getStatusLabel = (status) => {
  const labels = {
    in_progress: "In Progress",
    resolved: "Resolved",
    waiting: "Waiting",
    new: "New",
    open: "Open",
    closed: "Closed",
    reopened: "Reopened",
  };
  return labels[status] ?? status.charAt(0).toUpperCase() + status.slice(1);
};

export const getStatusBadgeClass = (status) => {
  const classes = {
    resolved: "bg-green-100 text-green-700",
    closed: "bg-green-100 text-green-700",
    in_progress: "bg-blue-100 text-blue-700",
    waiting: "bg-yellow-100 text-yellow-700",
    new: "bg-indigo-100 text-indigo-700",
    open: "bg-red-100 text-red-700",
    reopened: "bg-purple-100 text-purple-700",
  };
  return classes[status] ?? "bg-gray-100 text-gray-700";
};

export const getPriorityBadgeClass = (priority) => {
  const classes = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };
  return classes[priority] ?? "bg-gray-100 text-gray-700";
};
