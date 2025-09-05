export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  published: boolean;
  updatedAt?: string;
}

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface QuizRequest {
  title: string;
  topic: string;
  class_id: string;
  description: string;
  difficulty: Difficulty;
  number_of_questions: number;
}

export interface QuizRequestError {
  title?: string;
  topic?: string;
  class_id?: string;
  description?: string;
  difficulty?: string;
  number_of_questions?: string;
}
