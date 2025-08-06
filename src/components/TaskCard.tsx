import { Trash2 } from "lucide-react";



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
  {/* Title + Delete Icon */}
  <div className="flex justify-between items-start">
    <h2 className="font-bold text-m text-gray-900">{task.title}</h2>
    <button
      onClick={async () => {
        const confirm = window.confirm("Are you sure you want to delete this task?");
        if (!confirm) return;

        try {
          await databases.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID!,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID!,
            task.id
          );
          toast.success("✅ Task deleted!");

          // Optional: trigger a re-render
          window.location.reload(); // or use state-lifting if you want smoother UX
        } catch (err) {
          console.error("Error deleting task:", err);
          toast.error("❌ Failed to delete task");
        }
      }}
      className="text-red-500 hover:text-red-700"
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
      <span className="text-[12px] text-gray-600 italic">
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
