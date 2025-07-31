// src/types/index.ts
export type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
  tag: "Important" | "High Priority" | "OK" | "Meh";
  tagColor?: string;
  avatars?: string[];
  comments?: number;
  index?: number;
  linkedin?: string;
  
};

export type ColumnData = {
  title: string;
  items: Task[];
};

export type Columns = {
  [columnId: string]: ColumnData;
};
