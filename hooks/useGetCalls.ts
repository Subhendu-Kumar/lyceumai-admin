import API from "@/api/axiosInstance";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export interface Call {
  id: string;
  classId: string;
  start_time: string;
  description: string;
  end_time: string | null;
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

  const now = new Date();

  const endedCalls = calls.filter(({ start_time, end_time }: Call) => {
    return (start_time && new Date(start_time) < now) || !!end_time;
  });

  const upcomingCalls = calls.filter(({ start_time }: Call) => {
    return start_time && new Date(start_time) > now;
  });

  return {
    isLoading,
    endedCalls,
    upcomingCalls,
  };
};
