export interface Assignment {
  id: string;
  type: string;
  title: string;
  dueDate: string;
  createdAt: string;
  description: string;
}

export type TypeOption = "VOICE" | "TEXT";

export interface AssignmentFormData {
  title: string;
  description: string;
  type: TypeOption;
  dueDate: string;
}
