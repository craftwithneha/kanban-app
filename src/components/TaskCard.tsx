
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { Task } from "../types/types";
type UserInfo = {
  id: string;
  name: string;
};

type TaskCardProps = {
  task: Task;
  users: UserInfo[];
  onDelete: () => void;
  onAssign: (userId: string) => void;
  onTaskClick: (task: Task) => void; // ✅ New prop for modal/details
};

export default function TaskCard({
  task,
  users,
  onDelete,
  onAssign,
  onTaskClick,
}: TaskCardProps) {
  const formattedDate = task.date
    ? format(new Date(task.date), "dd MMM yyyy")
    : "";

  const assignedUserName =
    users.find((u) => u.id === task.assignedTo)?.name || "";

  return (
    <div
      className="relative bg-white rounded-lg p-4 shadow-md ring-1 ring-gray-200 hover:shadow-lg transition space-y-2"
      onClick={() => onTaskClick(task)} // ✅ Single click opens modal
    >
      {/* Title + Delete Icon */}
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-m text-gray-900 mt-4">{task.title}</h2>
        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ Prevent triggering modal
            onDelete(); // ✅ Call delete handler
          }}
          className="text-blue-600 hover:text-blue-500 mt-4"
          title="Delete Task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-700 mt-2">{task.description}</p>
      )}

      {/* Assigned To Dropdown */}
      {users.length > 0 && (
        <select
          className="text-xs border border-gray-300 rounded p-1 w-full"
          value={task.assignedTo}
          onClick={(e) => e.stopPropagation()} // ✅ Prevent card click when changing assignment
          onChange={(e) => onAssign(e.target.value)}
        >
          <option value="">Assign to</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      )}

      {/* Footer */}
      <div className="flex justify-between items-end mt-6">
        {task.createdBy && (
          <span className="text-[12px] text-gray-600 italic">
            Created by: {task.createdBy}
          </span>
        )}
        <div className="text-xs text-gray-500 text-right flex flex-col gap-1">
          {assignedUserName ? (
            <span>Assigned to: {assignedUserName}</span>
          ) : null}
          {formattedDate && <span>{formattedDate}</span>}
        </div>
      </div>
    </div>
  );
}
