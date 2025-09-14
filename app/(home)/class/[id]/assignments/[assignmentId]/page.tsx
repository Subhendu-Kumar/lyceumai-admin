/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { toast } from "sonner";
import API from "@/api/axiosInstance";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader } from "lucide-react";
import { use, useEffect, useState } from "react";
import TruncatedText from "@/components/TruncatedText";
import { AssignmentWithSubmissions } from "@/types/assignment";

const AssignmentSubmissions = ({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) => {
  const router = useRouter();
  const { assignmentId } = use(params);
  const [assignment, setAssignment] =
    useState<AssignmentWithSubmissions | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const fetchAssignmentWithSubmissions = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/assignment/${assignmentId}/submissions`);
        if (res.status === 200) {
          setAssignment(res.data.assignment);
        }
      } catch (error: any) {
        console.log(error);
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong";
        toast.success(message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignmentWithSubmissions();
  }, [assignmentId]);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <p className="text-gray-500">Assignment not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <button onClick={() => router.back()}>
        <ArrowLeft />
      </button>
      <div className="border rounded-lg p-4 shadow">
        <h2 className="text-xl font-bold">{assignment.title}</h2>
        <p className="text-gray-700">{assignment.question}</p>
        <p className="text-sm text-gray-500">
          Due:{" "}
          {assignment.dueDate
            ? new Date(assignment.dueDate).toLocaleString()
            : "No due date"}
        </p>
        <p className="mt-2 text-sm">
          <strong>Reference Answer:</strong> {assignment.referenceAns}
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Submissions</h3>
        {assignment.submissions.length === 0 && (
          <p className="text-gray-500">No submissions yet</p>
        )}
        {assignment.type === "TEXT" &&
          assignment.submissions.map((sub) =>
            sub.textSubmission ? (
              <div
                key={sub.id}
                className="border rounded-lg p-4 mb-3 shadow-sm"
              >
                <p className="font-medium">
                  Submitted by:{" "}
                  <Badge className="ml-2 text-sm bg-green-100 text-green-800 font-semibold rounded-full">
                    {sub.student.name}
                  </Badge>
                </p>
                <p className="mt-1">{sub.textSubmission.content}</p>
                {sub.textSubmission.score !== null && (
                  <p className="mt-2 text-sm text-green-700">
                    Score: {sub.textSubmission.score}
                  </p>
                )}
                {sub.textSubmission.feedback && (
                  <TruncatedText
                    text={sub.textSubmission.feedback.replace(/\*/g, "")}
                    limit={200}
                    expanded={!!expandedIds[sub.id]}
                    onToggle={() => toggleExpand(sub.id)}
                  />
                )}
              </div>
            ) : null
          )}
        {assignment.type === "VOICE" &&
          assignment.submissions.map((sub) =>
            sub.voiceSubmission ? (
              <div
                key={sub.id}
                className="border rounded-lg p-4 mb-3 shadow-sm"
              >
                <p className="font-medium">Submitted by: {sub.student.name}</p>
                <audio
                  controls
                  src={sub.voiceSubmission.fileUrl}
                  className="mt-2 w-full rounded-full"
                />
                {sub.voiceSubmission.transcript && (
                  <p className="mt-2 text-sm text-gray-700">
                    Transcript: {sub.voiceSubmission.transcript}
                  </p>
                )}
                {sub.voiceSubmission.score !== null && (
                  <p className="mt-2 text-sm text-green-700">
                    Score: {sub.voiceSubmission.score}
                  </p>
                )}
                {sub.voiceSubmission.feedback && (
                  <TruncatedText
                    text={sub.voiceSubmission.feedback.replace(/\*/g, "")}
                    limit={200}
                    expanded={!!expandedIds[sub.id]}
                    onToggle={() => toggleExpand(sub.id)}
                  />
                )}
              </div>
            ) : null
          )}
      </div>
    </div>
  );
};

export default AssignmentSubmissions;
