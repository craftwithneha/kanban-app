import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import type { Task } from "../types/types";

type DraggableCardProps = {
  item: Task & { index: number };
  columnId: string;
};

export default function DraggableCard({ item, columnId }: DraggableCardProps) {
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
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.7 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="touch-none select-none"
    >
      <TaskCard task={item} />
    </div>
  );
}
