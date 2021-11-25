export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  due_date: string | null;
  priority: Priority;
  done: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  title: string;
  description: string;
  due_date?: string;
  priority: Priority;
  done: boolean;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  due_date?: string;
  priority?: Priority;
  done?: boolean;
}
