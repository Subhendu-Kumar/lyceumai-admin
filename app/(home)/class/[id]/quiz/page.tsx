"use client";

import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import API from "@/api/axiosInstance";
import { motion } from "motion/react";
import { BASE_URL, getMessageFromError } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Quiz, QuizRequest } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React, { use, useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CreateQuizDialog from "@/components/dialogs/CreateQuizDialog";

const QuizPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { accessToken } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [creatingQuiz, setCreatingQuiz] = useState<boolean>(false);
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
      } catch (error) {
        toast.error(getMessageFromError(error));
      } finally {
        setLoading(false);
      }
    };
    setCreateQuizForm((prev) => ({ ...prev, class_id: id }));
    fetchQuizzes();
  }, [id]);

  const handleCreateQuiz = async () => {
    try {
      setCreatingQuiz(true);
      const res = await axios.post(
        `${BASE_URL}/quiz/generate`,
        createQuizForm,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.status === 201) {
        setQuizzes((prev) => [...prev, res.data.quiz]);
      }
    } catch (error) {
      toast.error(getMessageFromError(error));
    } finally {
      setCreatingQuiz(false);
      setOpenCreateQuizDialog(false);
      setCreateQuizForm({
        title: "",
        topic: "",
        class_id: "",
        description: "",
        difficulty: "EASY",
        number_of_questions: 0,
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <CreateQuizDialog
        classId={id}
        loading={creatingQuiz}
        formData={createQuizForm}
        open={openCreateQuizDialog}
        submitData={handleCreateQuiz}
        setFormData={setCreateQuizForm}
        onOpenChange={setOpenCreateQuizDialog}
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
                    {quiz.description.length > 100
                      ? quiz.description.slice(0, 100) + "..."
                      : quiz.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {quiz.published ? "Published" : "Unpublished"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {quiz?.updatedAt &&
                      new Date(quiz?.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="justify-end px-4">
                <Link href={`/class/${id}/quiz/${quiz.id}`}>
                  <Button className="custom-btn">Show</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
