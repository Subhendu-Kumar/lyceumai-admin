"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MeetingCard from "./cards/MeetingCard";

const CallTypeList = ({
  type,
  classId,
}: {
  type: "ended" | "upcoming" | "recordings";
  classId: string;
}) => {
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls(classId);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
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
      case "recordings":
        return "No Call Recordings Found";
      case "upcoming":
        return "No Upcoming Calls Found";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        console.log(error);
        toast("Try Again Later");
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const calls = getCalls();
  const callsMessage = getNoCallsMessage();

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => {
          return (
            <MeetingCard
              key={(meeting as Call)?.id}
              icon={
                type === "ended"
                  ? "/icons/previous.svg"
                  : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
              }
              title={
                (meeting as Call).state?.custom?.description ||
                (meeting as CallRecording).filename?.substring(0, 20) ||
                "Personal Meeting"
              }
              date={
                (meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time?.toLocaleString()
              }
              isPreviousMeeting={type === "ended"}
              buttonIcon1={
                type === "recordings" ? "/icons/play.svg" : undefined
              }
              buttonText={type === "recordings" ? "Play" : "Start"}
              link={
                type === "recordings"
                  ? (meeting as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                      (meeting as Call).id
                    }`
              }
              handleClick={
                type === "recordings"
                  ? () => router.push(`${(meeting as CallRecording).url}`)
                  : () => router.push(`/meeting/${(meeting as Call).id}`)
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
