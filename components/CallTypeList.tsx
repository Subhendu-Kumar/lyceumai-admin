"use client";

import API from "@/lib/api";
import MeetingCard from "./cards/MeetingCard";

import { toast } from "sonner";
import { Call } from "@/types/meeting";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CalendarSync, History, Loader } from "lucide-react";
import { formatDateTime, getMessageFromError } from "@/lib/utils";

const CallTypeList = ({
  type,
  classId,
}: {
  type: "ended" | "upcoming";
  classId: string;
}) => {
  const router = useRouter();
  const { accessToken } = useAuth();
  const { endedCalls, upcomingCalls, isLoading } = useGetCalls(classId);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls Found";
      case "upcoming":
        return "No Upcoming Calls Found";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const callsMessage = getNoCallsMessage();

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call, idx) => {
          const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}?auth_token=${accessToken}&meet_id=${meeting.meetId}`;
          return (
            <MeetingCard
              key={idx}
              buttonText={"Start"}
              buttonIcon1={undefined}
              isPreviousMeeting={type === "ended"}
              date={formatDateTime(meeting.MeetingTime)}
              title={meeting.description || "Personal Meeting"}
              handleClick={async () => {
                try {
                  const res = await API.patch(
                    `/meeting/${meeting.meetId}/status?status=ONGOING`
                  );
                  if (res.status === 200) {
                    window.open(meetingLink, "_blank", "noopener,noreferrer");
                  } else {
                    toast("not able to start meeting right now");
                  }
                } catch (error) {
                  toast.error(getMessageFromError(error));
                }
              }}
              icon={type === "ended" ? History : CalendarSync}
              onCardClick={
                type === "upcoming"
                  ? undefined
                  : () => {
                      router.push(
                        `/class/${classId}/meetings/d/${meeting.meetId}`
                      );
                    }
              }
            />
          );
        })
      ) : (
        <h1>{callsMessage}</h1>
      )}
    </div>
  );
};

export default CallTypeList;
