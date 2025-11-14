import { User } from "./auth";

export type TypeOption = "VOICE" | "TEXT";

export interface Assignment {
  id: string;
  type: string;
  title: string;
  dueDate: string;
  question: string;
  createdAt: string;
}

export interface AssignmentFormData {
  title: string;
  dueDate: string;
  type: TypeOption;
  question: string;
  referenceAns: string;
}

interface TextSubmission {
  id: string;
  content: string;
  score: string | null;
  feedback: string | null;
  strengths: string[] | null;
  improvements: string[] | null;
}

interface VoiceSubmission {
  id: string;
  fileUrl: string;
  score: string | null;
  feedback: string | null;
  transcript: string | null;
  strengths: string[] | null;
  improvements: string[] | null;
}

interface Submission {
  id: string;
  student: User;
  submittedAt: string;
  textSubmission: TextSubmission | null;
  voiceSubmission: VoiceSubmission | null;
}

export interface AssignmentWithSubmissions {
  id: string;
  title: string;
  dueDate: string;
  type: TypeOption;
  question: string;
  createdAt: string;
  referenceAns: string;
  submissions: Submission[];
}
