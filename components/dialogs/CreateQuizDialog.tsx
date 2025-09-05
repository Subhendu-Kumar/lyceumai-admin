import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "../ui/select";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { QuizRequest, QuizRequestError } from "@/types/quiz";
import React, { ChangeEvent, FormEvent, useState } from "react";

const CreateQuizDialog = ({
  open,
  classId,
  loading,
  formData,
  submitData,
  setFormData,
  onOpenChange,
}: {
  open: boolean;
  classId: string;
  loading: boolean;
  formData: QuizRequest;
  submitData: () => Promise<void>;
  onOpenChange: (open: boolean) => void;
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

  const validateForm = () => {
    const newErrors: QuizRequestError = {};
    if (!formData.title) {
      newErrors.title = "Title is required";
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
    }
    if (formData.number_of_questions < 5 && formData.number_of_questions > 20) {
      newErrors.number_of_questions =
        "No of questions must be between 5 and 20";
    }
    const allowedDifficulties = ["EASY", "MEDIUM", "HARD"];
    if (!allowedDifficulties.includes(formData.difficulty)) {
      newErrors.difficulty = "Difficulty must be EASY, MEDIUM, or HARD.";
    }
    if (!formData.topic) {
      newErrors.topic = "Topic is required";
    }
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    submitData();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[40rem]">
        <AlertDialogHeader>
          <AlertDialogTitle>Create Quiz With AI</AlertDialogTitle>
          <AlertDialogDescription>Class Id: {classId}</AlertDialogDescription>
        </AlertDialogHeader>
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
          <Button type="submit" className="custom-btn w-full">
            {loading ? <Loader className="animate-spin" /> : "create quiz"}
          </Button>
        </form>
        <AlertDialogCancel disabled={loading} className="cursor-pointer">
          Cancel
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateQuizDialog;
