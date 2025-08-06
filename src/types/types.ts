// src/types.ts
export type Task = {
  id: string;
  title: string;
  description: string;
  date?: string;
  tag?: string;
  createdBy?: string; // 👤 New
  assignedTo?: string;

  
};

export type Column = {
  title: string;
  items: Task[];
};

export type Columns = {
  [columnId: string]: Column;
};
