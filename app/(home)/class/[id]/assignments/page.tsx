/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import API from "@/api/axiosInstance";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Assignment, AssignmentFormData } from "@/types/assignment";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CreateAssignmentDialog from "@/components/dialogs/CreateAssignmentDialog";

const AssignmentsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [formData, setFormData] = useState<AssignmentFormData>({
    title: "",
    dueDate: "",
    type: "TEXT",
    description: "",
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/assignment/all/${id}`);
        if (res.status === 200) {
          setAssignments(res.data.assignments);
        }
      } catch (error: any) {
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong";
        toast.success(message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [id]);

  const submitData = async () => {
    try {
      setIsLoading(true);
      const res = await API.post(`/assignment/create/${id}`, {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
      });
      if (res.status === 201) {
        setAssignments((prev) => [res.data.assignment, ...prev]);
        toast.success("Assignment created successfully");
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error.response?.data?.detail || error.message || "Something went wrong";
      toast.success(message);
    } finally {
      setIsLoading(false);
      setShowDialog(false);
      setFormData({
        title: "",
        description: "",
        type: "TEXT",
        dueDate: "",
      });
    }
  };

  const handleDelete = async (asignment_id: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) {
      return;
    }
    try {
      const res = await API.delete(`/assignment/${asignment_id}`);
      if (res.status === 200) {
        setAssignments((prev) =>
          prev.filter((assignment) => assignment.id !== asignment_id)
        );
        toast.success("Assignment deleted successfully");
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error.response?.data?.detail || error.message || "Something went wrong";
      toast.success(message);
    }
  };

  return (
    <div className="w-full h-auto p-6">
      <CreateAssignmentDialog
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
        open={showDialog}
        onOpenChange={setShowDialog}
        submitData={submitData}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-6">Assignments</h1>
        <Button className="custom-btn" onClick={() => setShowDialog(true)}>
          Create Assignment
        </Button>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </Card>
          ))}
        </div>
      ) : assignments.length === 0 ? (
        <div className="text-center text-red-500 mt-20">
          <p>No assignments found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="rounded-2xl shadow-md hover:shadow-lg transition border"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold line-clamp-1">
                  {assignment.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3 line-clamp-3">
                  {assignment.description}
                </p>
                <div className="flex flex-col gap-2 text-sm mb-4">
                  <p>
                    <span className="font-medium text-gray-700">Type:</span>{" "}
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-700 font-semibold"
                    >
                      {assignment.type}
                    </Badge>
                  </p>
                  <p className="text-green-600 font-medium">
                    Due: {new Date(assignment.dueDate).toLocaleString()}
                  </p>
                  <p className="text-purple-600 font-medium">
                    Created: {new Date(assignment.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() =>
                      console.log("Show submissions for", assignment.id)
                    }
                  >
                    Show Submissions
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="destructive"
                    onClick={() => handleDelete(assignment.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
