"use client";

import API from "@/lib/api";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUp, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getMessageFromError } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const classSchema = z.object({
  name: z.string().min(4, "Class name must be at least 4 characters"),
  description: z
    .string()
    .min(100, "Description must be at least 100 characters long"),
});

type ClassForm = z.infer<typeof classSchema>;

const CreateClass = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ClassForm>({
    name: "",
    description: "",
  });
  const [syllabus, setSyllabus] = useState<File | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ClassForm, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = classSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ClassForm, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ClassForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    if (!syllabus) {
      return toast.error("Please upload a syllabus file.");
    }
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("syllabus", syllabus);
      formData.append("name", result.data.name);
      formData.append("description", result.data.description);

      const res = await API.post("/admin/classroom", formData);

      if (res.status !== 201) {
        throw new Error("Failed to create class");
      }

      router.push("/");
      toast.success("Class created successfully!", {
        description: "You can now view your new class.",
      });
    } catch (error) {
      toast.error(getMessageFromError(error));
    } finally {
      setErrors({});
      setSyllabus(null);
      setIsLoading(false);
      setFormData({ name: "", description: "" });
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create a New Class
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Class Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter class name"
                className={`h-10 ${errors.name ? "border-red-500" : ""}`}
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter class description"
                value={formData.description}
                onChange={handleChange}
                name="description"
                className={`min-h-28 max-h-56 ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Syllabus:</p>
              <label className="w-full h-28 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition">
                <FileUp className="w-6 h-6 mb-1 text-gray-600" />
                <span className="text-xs text-gray-500">
                  {syllabus ? syllabus.name : "Click to select a file"}
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setSyllabus(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>
            <Button type="submit" className="w-full custom-btn">
              {isLoading ? <Loader className="animate-spin" /> : "Create Class"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateClass;
