export interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  slack_handle: string | null;
  email: string | null;
}

export interface ChecklistTask {
  id: number;
  title: string;
  description: string | null;
  week: number;
  is_completed: boolean;
}

export interface Resource {
  id: number;
  title: string;
  description: string | null;
  url: string | null;
  category: string;
}
