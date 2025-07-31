// KanbanBoard.tsx
import { DndContext, type DragEndEvent } from "@dnd-kit/core";                                                                                                                               
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import Column from "./Column";
import DraggableCard from "./DragableCard";
import { Star } from "lucide-react";
import type { Columns, Task } from "../types/types";
import { databases, ID } from "../appwrite";
import { toast } from "sonner";

const DATABASE_ID = "6881e1a100261dde8f26";
const COLLECTION_ID = "6881e1bc0017a8a6bc25";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>({
    todo: { title: "To Do", items: [] },
    inprogress: { title: "In Progress", items: [] },
    done: { title: "Completed", items: [] },
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID
        );
        const newColumns: Columns = {
          todo: { title: "To Do", items: [] },
          inprogress: { title: "In Progress", items: [] },
          done: { title: "Completed", items: [] },
        };
        response.documents.forEach((doc) => {
          const col = doc.column as keyof Columns;
          if (newColumns[col]) {
            // Map Appwrite document to Task type
            const mappedTask: Task = {
              id: doc.$id,
              title: doc.title,
              description: doc.description,
              date: doc.date,
              tag: doc.tag,
              avatars: doc.avatars,
              linkedin: doc.linkedin,
              github: doc.github,
              comments: doc.comments,
            };
            newColumns[col].items.push(mappedTask);
          }
        });
        setColumns(newColumns);
      } catch (error) {
        console.error(" Error loading tasks:", error);
      }
    };
    loadTasks();
  }, []);

  const isValidUrl = (str: string): boolean => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddTask = async (columnId: keyof Columns, task: Task) => {
    try {
      const allowedTags = ["Important", "High", "Priority", "OK", "Processing"];
      const defaultTag = "Important";

      // Avatar logic: use GitHub avatar if github provided, else fallback
      let githubUsername = "";
      if (task.github) {
        if (task.github.startsWith("http")) {
          const match = task.github.match(/github.com\/(.+?)(?:\/|$)/);
          githubUsername = match ? match[1] : "";
        } else {
          githubUsername = task.github.replace(/^\/+/, "");
        }
      }
      const avatarUrl = githubUsername
        ? `https://github.com/${githubUsername}.png`
        : "/avatars/avatar.png";

      const cleanedTask = {
        title: task.title,
        description: task.description ?? "",
        date: task.date
          ? new Date(task.date).toISOString()
          : new Date().toISOString(),
        tag: allowedTags.includes(task.tag!) ? task.tag : defaultTag,
        linkedin: isValidUrl(task.linkedin!) ? task.linkedin : "",
        github: isValidUrl(task.github!) ? task.github : "",
        avatars: [avatarUrl],
        comments: task.comments ?? 0,
        column: columnId,
      };

      const created = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        cleanedTask
      );
      // Map to Task type
      const newTask: Task = {
        id: created.$id,
        title: created.title,
        description: created.description,
        date: created.date,
        tag: created.tag,
        avatars: created.avatars,
        linkedin: created.linkedin,
        github: created.github,
        comments: created.comments,
      };
      setColumns((prev) => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          items: [...prev[columnId].items, newTask],
        },
      }));

      toast.success("✅ Task added!");
    } catch (error) {
      console.error(" Error adding task:", error);
      toast.error("Error adding task.");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // Find source and destination columns
    const fromColumnEntry = Object.entries(columns).find(([, col]) =>
      col.items.find((item) => item.id === active.id)
    );
    if (!fromColumnEntry) return;

    const [fromColumnId, fromCol] = fromColumnEntry;
    const toColumnId = over.id as keyof Columns;
    const task = fromCol.items.find((item) => item.id === active.id);
    if (!task) return;

    // If dropped in the same column, reorder
    if (fromColumnId === toColumnId) {
      const oldIndex = fromCol.items.findIndex((item) => item.id === active.id);
      const newIndex = columns[toColumnId].items.findIndex(
        (item) => item.id === over.id
      );
      if (oldIndex === newIndex || newIndex === -1) {
        toast.info("Task is already in this position.");
        return;
      }
      const updatedItems = Array.from(fromCol.items);
      const [removed] = updatedItems.splice(oldIndex, 1);
      updatedItems.splice(newIndex, 0, removed);
      setColumns((prev) => ({
        ...prev,
        [fromColumnId]: { ...prev[fromColumnId], items: updatedItems },
      }));
      toast.success("✅ Task reordered!");
      return;
    }

    // If dropped in a different column, move
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, task.id, {
        column: toColumnId,
      });

      setColumns((prev) => {
        const newFromItems = prev[fromColumnId].items.filter(
          (item) => item.id !== active.id
        );
        const newToItems = [
          ...prev[toColumnId].items,
          { ...task, column: toColumnId },
        ];
        return {
          ...prev,
          [fromColumnId]: { ...prev[fromColumnId], items: newFromItems },
          [toColumnId]: { ...prev[toColumnId], items: newToItems },
        };
      });
      toast.success("✅ Task moved!");
    } catch (err) {
      console.error("Error moving task:", err);
      toast.error("Error moving task.");
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 p-4 flex items-center gap-2">
          Kanban board <Star className="w-4 h-4 text-gray-600" />
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 p-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <SortableContext
              key={columnId}
              id={columnId}
              items={column.items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column
                id={columnId}
                title={column.title}
                onAddTask={(task) =>
                  handleAddTask(columnId as keyof Columns, task)
                }
              >
                {column.items.map((item, i) => (
                  <DraggableCard              
                    key={item.id}
                    item={{ ...item, index: i }}
                    columnId={columnId}
                  />
                ))}
              </Column>
            </SortableContext>
          ))}
        </div>
      </div>
    </DndContext>
  );
}
