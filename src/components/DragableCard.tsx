import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import type { Task } from "../types/types";


type UserInfo = {
  id: string;
  name: string;
};

type DraggableCardProps = {
  item: Task & { index: number };
  columnId: string;
  users: UserInfo[];
  onDelete: () => void;
  onAssign: (userId: string) => void;
};

export default function DraggableCard({
  item,
  columnId,
  users,
  onDelete,
  onAssign,
}: DraggableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: { item, columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms ease",
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.85 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    boxShadow: isDragging
      ? "0 8px 20px rgba(0, 0, 0, 0.2)"
      : "0 2px 6px rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none select-none transition-transform duration-200 ease-in-out"
    >
      <TaskCard task={item} users={users} onDelete={onDelete} onAssign={onAssign} />
    </div>
  );
}
