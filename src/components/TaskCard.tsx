

import { format } from "date-fns";
import { toast } from "sonner";
import { databases } from "../appwrite";
import type { Task } from "../types/types";

type TaskCardProps = {
  task: Task;
  users: string[];
};

export default function TaskCard({ task, users }: TaskCardProps) {
  const formattedDate = task.date
    ? format(new Date(task.date), "dd MMM yyyy")
    : "";

  return (
    <div className="relative bg-white rounded-lg p-4 shadow-md ring-1 ring-gray-200 hover:shadow-lg transition cursor-grab space-y-2">
      {/* Title */}
      <h2 className="font-semibold text-sm text-gray-900 mt-2">{task.title}</h2>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-700 mt-2">{task.description}</p>
      )}

      {/* Assigned To Dropdown */}
      {users.length > 0 && (
        <select
          className="text-xs border border-gray-300 rounded p-1 w-full"
          value={task.assignedTo}
          onChange={async (e) => {
            const newAssignedTo = e.target.value;
            try {
              await databases.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID!,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID!,
                task.id,
                { assignedTo: newAssignedTo }
              );
              toast.success(`✅ Task assigned to ${newAssignedTo}`);
            } catch (err) {
              console.error("Error updating assignedTo", err);
              toast.error("❌ Failed to assign task");
            }
          }}
        >
          <option value="">Assign to</option>
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      )}

      {/* Footer */}
      <div className="flex justify-between items-end mt-6">
        {task.createdBy && (
          <span className="text-[11px] text-gray-600 italic">
            Created by: {task.createdBy}
          </span>
        )}

        <div className="text-xs text-gray-500 text-right flex flex-col gap-1">
          {formattedDate && <span>{formattedDate}</span>}
        </div>
      </div>
    </div>
  );
}
