/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { Loader } from "lucide-react";
import API from "@/api/axiosInstance";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { use, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MeetingStatus = "ONGOING" | "CANCELED" | "SCHEDULED" | "COMPLETED";

interface Recording {
  url: string;
  meet_date: string;
  session_id: string;
  summary: string | null;
  transcript: string | null;
}

interface MeetingDetails {
  meetId: string;
  classroomId: string;
  MeetingTime: string;
  description: string;
  recordings: Recording[];
  meetStatus: MeetingStatus;
}

const MeetingDetailsPage = ({
  params,
}: {
  params: Promise<{ meetId: string }>;
}) => {
  const { meetId } = use(params);
  const [loadingMeeting, setLoadingMeeting] = useState<boolean>(true);
  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails | null>(
    null
  );

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        if (!meetId) {
          return;
        }
        setLoadingMeeting(true);
        const res = await API.get(`/meeting/${meetId}`);
        if (res.status === 200) {
          setMeetingDetails(res.data.meeting);
        }
      } catch (error: any) {
        console.log(error);
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong";
        toast.success(message);
      } finally {
        setLoadingMeeting(false);
      }
    };
    fetchMeetingDetails();
  }, [meetId]);

  const getStatusColor = (status: MeetingStatus) => {
    switch (status) {
      case "ONGOING":
        return "bg-green-100 text-green-800";
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800";
      case "CANCELED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loadingMeeting) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (meetingDetails === null) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <p className="text-red-500 font-semibold font-serif">
          No meeting details found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Meeting ID: {meetingDetails.meetId}
          </h1>
          <p className="text-gray-600">
            {formatDateTime(meetingDetails.MeetingTime)}
          </p>
        </div>
        <Badge className={getStatusColor(meetingDetails.meetStatus)}>
          {meetingDetails.meetStatus}
        </Badge>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {meetingDetails.description}
          </p>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recordings</h2>
        {meetingDetails.recordings.length > 0 ? (
          meetingDetails.recordings.map((rec) => (
            <Card key={rec.session_id} className="overflow-hidden">
              <video
                src={rec.url}
                controls
                className="w-full max-h-[400px] object-cover"
              />
              <CardContent className="space-y-3 pt-4">
                <p className="text-sm text-gray-500">
                  Recorded on {formatDateTime(rec.meet_date)}
                </p>
                {rec.summary && (
                  <div>
                    <h3 className="font-semibold">Summary</h3>
                    <p className="text-gray-700">{rec.summary}</p>
                  </div>
                )}
                {rec.transcript && (
                  <div>
                    <h3 className="font-semibold">Transcript</h3>
                    <p className="text-gray-700 whitespace-pre-line text-sm">
                      {rec.transcript}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No recordings available.</p>
        )}
      </div>
    </div>
  );
};

export default MeetingDetailsPage;
