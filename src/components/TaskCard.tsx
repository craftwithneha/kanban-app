import { MessageCircle, Linkedin, Github } from "lucide-react";
import { format } from "date-fns";
import type { Task } from "../types/types";

const tagStyles: Record<string, string> = {
  Important: "bg-yellow-200 text-yellow-800",
  High: "bg-red-100 text-red-700",
  OK: "bg-blue-100 text-gray-700",
  Processing: "bg-green-100 text-white-600",
};

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const formattedDate = task.date
    ? format(new Date(task.date), "dd MMM yyyy")
    : "";

  return (
    <div className="relative bg-white rounded-lg p-4 shadow-md ring-1 ring-gray-200 hover:shadow-lg transition cursor-grab space-y-2">
      {/* Tag */}
      {task.tag && (
        <span
          className={`text-xs font-semibold px-3 py-2 rounded-full inline-block ${
            tagStyles[task.tag] || "bg-gray-100 text-gray-600"
          }`}
        >
          {task.tag}
        </span>
      )}

      {/* Title */}
      <h2 className="font-semibold text-sm text-gray-900 mt-2">{task.title}</h2>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-700 mt-2">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-end mt-8">
        <div className="flex items-center gap-2">
          {Array.isArray(task.avatars) && task.avatars.length > 0 && (
            <div className="flex -space-x-2">
              {task.avatars.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt={`avatar-${idx}`}
                  className="w-7 h-7 rounded-full object-cover border bg-white"
                  style={{ zIndex: 10 - idx }}
                />
              ))}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-800">
              {task.linkedin
                ? new URL(task.linkedin).pathname
                    .split("/")
                    .filter(Boolean)
                    .pop()
                : "User"}
            </span>

            <div className="flex items-center gap-1 mt-1">
              {task.linkedin && (
                <a
                  href={task.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 text-blue-600 hover:text-blue-800" />
                </a>
              )}
              {task.github && (
                <a href={task.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 text-gray-800 hover:text-black" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-right flex flex-col gap-1">
          {formattedDate && <span>{formattedDate}</span>}
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {task.comments ?? 0}
          </div>
        </div>
      </div>
    </div>
  );
}
