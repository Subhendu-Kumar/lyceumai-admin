import API from "@/api/axiosInstance";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export type MeetStatus = "ONGOING" | "CANCELED" | "SCHEDULED" | "COMPLETED";

export interface Call {
  id: string;
  meetId: string;
  description: string;
  MeetingTime: string;
  meetStatus: MeetStatus;
}

export const useGetCalls = (classId: string) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [calls, setCalls] = useState<Call[] | []>([]);

  useEffect(() => {
    const fetchCalls = async () => {
      setIsLoading(true);
      try {
        const response = await API.get(`/meeting/list/${classId}`);
        if (response.status === 200) {
          setCalls(response.data.meetings);
        }
      } catch (error) {
        console.error("Error fetching calls:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCalls();
  }, [classId, user?.id]);

  const endedCalls = calls.filter(
    ({ meetStatus }: Call) =>
      meetStatus.trim().toUpperCase() === "COMPLETED" ||
      meetStatus.trim().toUpperCase() === "CANCELED"
  );

  const upcomingCalls = calls.filter(
    ({ meetStatus }: Call) => meetStatus.trim().toUpperCase() === "SCHEDULED"
  );

  return {
    isLoading,
    endedCalls,
    upcomingCalls,
  };
};
