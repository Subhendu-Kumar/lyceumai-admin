export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface Question {
  id: string;
  answer: number;
  question: string;
  options: string[];
}

export interface Quiz {
  id: string;
  title: string;
  published: boolean;
  updatedAt?: string;
  description: string;
}

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
  difficulty?: string;
  description?: string;
  number_of_questions?: string;
}
