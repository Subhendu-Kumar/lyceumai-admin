/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import API from "@/api/axiosInstance";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React, { use, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CreateQuizDialog from "@/components/dialogs/CreateQuizDialog";

interface Quiz {
  id: string;
  title: string;
  description: string;
  published: boolean;
  updatedAt: string;
}

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface QuizRequest {
  title: string;
  topic: string;
  class_id: string;
  description: string;
  number_of_questions: number;
  difficulty: Difficulty;
}

export interface QuizRequestError {
  title?: string;
  topic?: string;
  class_id?: string;
  description?: string;
  number_of_questions?: number;
  difficulty?: Difficulty;
}

const QuizPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [createQuizForm, setCreateQuizForm] = useState<QuizRequest>({
    title: "",
    topic: "",
    class_id: "",
    description: "",
    difficulty: "EASY",
    number_of_questions: 0,
  });
  const [openCreateQuizDialog, setOpenCreateQuizDialog] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get(`/quiz/all/${id}`);
        if (res.status === 200) {
          setQuizzes(res.data.quizzes);
        }
      } catch (error: any) {
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    setCreateQuizForm((prev) => ({ ...prev, class_id: id }));
    fetchQuizzes();
  }, [id]);

  return (
    <div className="container mx-auto py-10">
      <CreateQuizDialog
        open={openCreateQuizDialog}
        onOpenChange={setOpenCreateQuizDialog}
        formData={createQuizForm}
        setFormData={setCreateQuizForm}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Available Quizzes</h1>
        <Button
          className="custom-btn"
          onClick={() => setOpenCreateQuizDialog(true)}
        >
          Add new Quiz
        </Button>
      </div>
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card key={`skeleton-${idx}`} className="shadow-md rounded-2xl">
              <CardContent className="p-4 flex flex-col gap-4">
                <div>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-1" />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-10 w-full mt-4 rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : quizzes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-center py-10"
        >
          No quizzes available
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="shadow-md hover:shadow-lg transition rounded-2xl"
            >
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-lg font-semibold">{quiz.title}</h2>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {quiz.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {quiz.published ? "Published" : "Unpublished"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(quiz.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <Button className="custom-btn mt-4">Start Quiz</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
