



import { Query } from "appwrite";
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
import { getCurrentUser } from "../auth";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID!;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID!;

type UserInfo = {
  id: string;
  name: string;
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>({
    todo: { title: "To Do", items: [] },
    inprogress: { title: "In Progress", items: [] },
    done: { title: "Completed", items: [] },
  });

  const [users, setUsers] = useState<UserInfo[]>([]);

  // Load user list
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await databases.listDocuments(
          DATABASE_ID,
          USER_COLLECTION_ID,
          [Query.limit(100)]
        );
        const userList = res.documents.map((doc) => ({
          id: doc.userId,
          name: doc.name || "Unknown",
        }));
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    loadUsers();
  }, []);

  // Load tasks for current user
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return;

        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal("userId", user.$id)]
        );

        const newColumns: Columns = {
          todo: { title: "To Do", items: [] },
          inprogress: { title: "In Progress", items: [] },
          done: { title: "Completed", items: [] },
        };

        response.documents.forEach((doc) => {
          const col = doc.column as keyof Columns;
          if (newColumns[col]) {
            const mappedTask: Task = {
              id: doc.$id,
              title: doc.title || "Untitled",
              description: doc.description || "",
              date: doc.date || new Date().toISOString(),
              createdBy: doc.createdBy || "Unknown",
              assignedTo: doc.assignedTo || "",
            };
            newColumns[col].items.push(mappedTask);
          }
        });

        setColumns(newColumns);
      } catch (error) {
        console.error("Error loading tasks:", error);
        toast.error("❌ Failed to load tasks");
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async (columnId: keyof Columns, task: Task) => {
    try {
      const user = await getCurrentUser();
      if (!user || !user.name) {
        toast.error("Please log in to add tasks.");
        return;
      }

      const cleanedTask = {
        title: task.title || "Untitled",
        description: task.description || "",
        date: new Date(task.date || new Date()).toISOString(),
        column: columnId,
        createdBy: user.name,
        assignedTo: task.assignedTo || "",
        userId: user.$id, // ✅ Save user ID for ownership
      };

      const created = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        cleanedTask
      );

      const newTask: Task = {
        id: created.$id,
        ...cleanedTask,
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
      console.error("Error adding task:", error);
      toast.error("❌ Error adding task");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromColumnEntry = Object.entries(columns).find(([, col]) =>
      col.items.find((item) => item.id === active.id)
    );
    if (!fromColumnEntry) return;

    const [fromColumnId, fromCol] = fromColumnEntry;
    const toColumnId = over.id as keyof Columns;

    const task = fromCol.items.find((item) => item.id === active.id);
    if (!task) return;

    if (fromColumnId === toColumnId) {
      const oldIndex = fromCol.items.findIndex((item) => item.id === active.id);
      const newIndex = columns[toColumnId].items.findIndex(
        (item) => item.id === over.id
      );
      if (oldIndex === newIndex || newIndex === -1) return;

      const updatedItems = Array.from(fromCol.items);
      const [moved] = updatedItems.splice(oldIndex, 1);
      updatedItems.splice(newIndex, 0, moved);

      setColumns((prev) => ({
        ...prev,
        [fromColumnId]: {
          ...prev[fromColumnId],
          items: updatedItems,
        },
      }));

      return;
    }

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
      toast.error("❌ Error moving task");
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="py-10 px-4 sm:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2 animate-fade-in-up">
          Kanban Board <Star className="w-5 h-5 text-yellow-600" />
        </h1>

        <div className="flex flex-col sm:flex-row gap-6">
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
                    users={users.map((u) => u.name)} // map to names only for TaskCard
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
