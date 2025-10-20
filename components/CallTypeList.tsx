"use client";

import { Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/lib/utils";
import MeetingCard from "./cards/MeetingCard";
import { Call, useGetCalls } from "@/hooks/useGetCalls";

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
          const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}?auth_token=${accessToken}&meet_id=${meeting.id}`;
          return (
            <MeetingCard
              key={idx}
              link={meetingLink}
              buttonText={"Start"}
              buttonIcon1={undefined}
              isPreviousMeeting={type === "ended"}
              date={formatDateTime(meeting.start_time)}
              title={meeting.description || "Personal Meeting"}
              handleClick={() =>
                window.open(meetingLink, "_blank", "noopener,noreferrer")
              }
              icon={
                type === "ended" ? "/icons/previous.svg" : "/icons/upcoming.svg"
              }
              onCardClick={
                type === "upcoming"
                  ? undefined
                  : () => {
                      router.push(`/class/${classId}/meetings/d/${meeting.id}`);
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
