"use client";

import API from "@/lib/api";
import QuestionField from "@/components/QuestionField";

import { toast } from "sonner";
import { Question, Quiz } from "@/types/quiz";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { getMessageFromError } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuizDetailsPage = ({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) => {
  const { quizId } = use(params);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quiz/${quizId}`);
        if (res.status === 200) {
          setQuiz({
            id: res.data.quiz.id,
            title: res.data.quiz.title,
            description: res.data.quiz.description,
            published: res.data.quiz.published,
          });
          setQuestions(res.data.quiz.questions);
        }
      } catch (error) {
        toast.error(getMessageFromError(error));
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handlePublish = async (quiz_id: string) => {
    if (!quiz) return;

    // Optimistic update
    setQuiz((prev) => (prev ? { ...prev, published: true } : prev));
    const toastId = toast.loading("Publishing quiz...");

    try {
      const res = await API.patch(`/quiz/publish/${quiz_id}`);

      if (res.status == 202) {
        toast.success("Quiz published successfully", { id: toastId });
      }
    } catch (error) {
      setQuiz((prev) => (prev ? { ...prev, published: false } : prev));
      toast.error(getMessageFromError(error), { id: toastId });
    }
  };

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-6">
      <Card className="w-full rounded-2xl border-gray-400">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">{quiz?.title}</CardTitle>
          <Badge
            variant={quiz?.published ? "default" : "secondary"}
            className="text-base"
          >
            {quiz?.published ? "Published" : "Draft"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-600 text-base">{quiz?.description}</p>
          {quiz?.published ? (
            <Button className="custom-btn">Show Submissions</Button>
          ) : (
            <Button
              className="custom-btn"
              onClick={() => quiz?.id && handlePublish(quiz.id)}
              disabled={!quiz?.id}
            >
              Publish Quiz
            </Button>
          )}
        </CardContent>
      </Card>
      {questions.map((question) => {
        return <QuestionField key={question.id} question={question} />;
      })}
    </div>
  );
};

export default QuizDetailsPage;
