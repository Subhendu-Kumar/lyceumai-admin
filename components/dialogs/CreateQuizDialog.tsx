import React, { ChangeEvent, useState } from "react";
import {
  QuizRequest,
  QuizRequestError,
} from "@/app/(home)/class/[id]/quiz/page";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CreateQuizDialog = ({
  open,
  onOpenChange,
  formData,
  setFormData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: QuizRequest;
  setFormData: React.Dispatch<React.SetStateAction<QuizRequest>>;
}) => {
  const [errors, setErrors] = useState<QuizRequestError>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = () => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[40rem]">
        <DialogHeader>
          <DialogTitle>Create Quiz With AI</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="w-full h-auto flex flex-col items-center justify-center gap-4"
        >
          <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
            <p>Title:</p>
            <Input
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
              placeholder="Enter Quiz title"
              className={`w-full h-10 border-gray-400 ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors?.title && (
              <span className="text-red-500">{errors.title}</span>
            )}
          </div>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
            <p>Topic:</p>
            <Input
              type="text"
              name="topic"
              onChange={handleChange}
              value={formData.topic}
              placeholder="Enter topic of quiz"
              className={`w-full h-10 border-gray-400 ${
                errors.topic ? "border-red-500" : ""
              }`}
            />
            {errors?.topic && (
              <span className="text-red-500">{errors.topic}</span>
            )}
          </div>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
            <p>Description:</p>
            <Textarea
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="Enter product description"
              className={`min-h-20 max-h-60 border-gray-400 ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors?.description && (
              <span className="text-red-500">{errors.description}</span>
            )}
          </div>
          <div className="w-full flex items-center justify-center space-x-4">
            <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
              <p>No of Questions:</p>
              <Input
                type="number"
                name="number_of_questions"
                onChange={handleChange}
                value={formData.number_of_questions}
                placeholder="Enter number of questions"
                className={`w-full h-10 border-gray-400`}
              />
              {errors?.number_of_questions && (
                <span className="text-red-500">
                  {errors.number_of_questions}
                </span>
              )}
            </div>
            <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
              <p>Difficulty Level:</p>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    difficulty: value as QuizRequest["difficulty"],
                  }))
                }
                value={formData.difficulty ?? ""}
              >
                <SelectTrigger className="w-full h-10 border-gray-400">
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            type="submit"
            className="custom-btn w-full"
          >
            create quiz
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuizDialog;
