export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr className="border-b animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md border p-6 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-7 bg-gray-200 rounded w-1/3" />
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

export function DiscussionSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border-b animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200" />

        <div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-56 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="h-3 w-16 bg-gray-200 rounded" />
    </div>
  );
}