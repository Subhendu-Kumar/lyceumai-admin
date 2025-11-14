import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useState } from "react";
import { AssignmentFormData, TypeOption } from "@/types/assignment";

const CreateAssignmentDialog = ({
  open,
  formData,
  isLoading,
  submitData,
  setFormData,
  onOpenChange,
}: {
  open: boolean;
  isLoading: boolean;
  formData: AssignmentFormData;
  submitData: () => Promise<void>;
  onOpenChange: (open: boolean) => void;
  setFormData: Dispatch<SetStateAction<AssignmentFormData>>;
}) => {
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof AssignmentFormData, string>>
  >({});

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof AssignmentFormData, string>> = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.type) {
      errors.type = "Type is required";
    }
    if (!formData.dueDate) {
      errors.dueDate = "Due date is required";
    }
    if (!formData.referenceAns.trim()) {
      errors.referenceAns = "Reference answer is required";
    }
    if (!formData.question.trim()) {
      errors.question = "Question is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    await submitData();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Assignment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              className="h-10"
              placeholder="Enter assignment title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {formErrors.title && (
              <div className="text-sm text-red-500">{formErrors.title}</div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: TypeOption) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VOICE">Voice</SelectItem>
                <SelectItem value="TEXT">Text</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.type && (
              <div className="text-sm text-red-500">{formErrors.type}</div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              className="h-10"
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
            {formErrors.dueDate && (
              <div className="text-sm text-red-500">{formErrors.dueDate}</div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              className="min-h-14 resize-none"
              placeholder="Enter assignment question"
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
            />
            {formErrors.question && (
              <div className="text-sm text-red-500">{formErrors.question}</div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="ans">Reference Ans</Label>
            <Textarea
              id="ans"
              className="min-h-36 resize-none"
              placeholder="Enter assignment reference answer"
              value={formData.referenceAns}
              onChange={(e) =>
                setFormData({ ...formData, referenceAns: e.target.value })
              }
            />
            {formErrors.referenceAns && (
              <div className="text-sm text-red-500">
                {formErrors.referenceAns}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="custom-btn">
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Create Assignment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentDialog;
