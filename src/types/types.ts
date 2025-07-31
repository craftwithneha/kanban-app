// src/types.ts
export type Task = {
  id: string;
  title: string;
  description: string;
  date?: string;
  tag?: string;
  avatars?: string[];
  linkedin?: string;
  github?: string;
  comments?: number;
  index?: number;
};

export type Column = {
  title: string;
  items: Task[];
};

export type Columns = {
  [columnId: string]: Column;
};
