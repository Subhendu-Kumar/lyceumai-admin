"use client";

import { Loader } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import MeetingCard from "./cards/MeetingCard";
import { useAuth } from "@/hooks/useAuth";
import { Call, useGetCalls } from "@/hooks/useGetCalls";

const CallTypeList = ({
  type,
  classId,
}: {
  type: "ended" | "upcoming";
  classId: string;
}) => {
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
          return (
            <MeetingCard
              key={idx}
              icon={
                type === "ended" ? "/icons/previous.svg" : "/icons/upcoming.svg"
              }
              title={meeting.description || "Personal Meeting"}
              date={
                formatDateTime(meeting.end_time) ||
                formatDateTime(meeting.start_time)
              }
              isPreviousMeeting={type === "ended"}
              buttonIcon1={undefined}
              buttonText={"Start"}
              link={`${process.env.NEXT_PUBLIC_BASE_URL}?auth_token=${accessToken}&meet_id=${meeting.id}`}
              handleClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_BASE_URL}?auth_token=${accessToken}&meet_id=${meeting.id}`,
                  "_blank",
                  "noopener,noreferrer"
                )
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
