"use client";

import API from "@/lib/api";
import ReactDatePicker from "react-datepicker";
import MeetingPopUpModal from "@/components/dialogs/MeetingPopUpModal";
import MaterialPreviewDialog from "@/components/dialogs/MaterialPreviewDialog";

import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ClassRoom } from "@/types/classroom";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { getMessageFromError } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Copy, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ClassHome = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const { accessToken } = useAuth();

  const [creatingClassMeeting, setCreatingClassMeeting] =
    useState<boolean>(false);
  const [classData, setClassData] = useState<ClassRoom | null>(null);
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    link: "",
    description: "",
    dateTime: new Date(),
  });

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await API.get(`/admin/classroom/${id}`);
        setClassData(res.data.classroom);
      } catch (error) {
        toast.error(getMessageFromError(error));
      }
    };
    fetchClass();
  }, [id]);

  const handleCopy = async (code: string) => {
    if (code) {
      await navigator.clipboard.writeText(code);
      toast.success("copied to clipboard");
    }
  };

  const createMeeting = async () => {
    setCreatingClassMeeting(true);
    try {
      if (!values.dateTime) {
        toast("Please select a date and time");
        return;
      }

      const description = values.description || "Instant meeting";
      const meetStatus =
        meetingState === "isInstantMeeting" ? "ONGOING" : "SCHEDULED";
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const formattedDate = new Date(startsAt)
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-");

      const res = await API.post("/meeting/create", {
        meetStatus,
        classroomId: id,
        description: `${description} ${formattedDate}`,
        meetingTime: startsAt,
      });

      if (res.status === 201) {
        const meetId = res.data.meetId;
        toast("Meeting created Successfully");
        if (meetingState === "isInstantMeeting") {
          window.open(
            `${process.env.NEXT_PUBLIC_BASE_URL}?auth_token=${accessToken}&meet_id=${meetId}`,
            "_blank",
            "noopener,noreferrer"
          );
        } else {
          router.push(`/class/${id}/meetings/upcoming`);
        }
      }
    } catch (error) {
      console.log(error);
      toast("Failed to create meeting!");
    } finally {
      setMeetingState(undefined);
      setValues({ ...values, description: "", dateTime: new Date() });
      setCreatingClassMeeting(false);
    }
  };

  return (
    <main>
      <section className="bg-[url('/Math.jpg')] bg-cover bg-center text-white rounded-2xl">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold">{classData?.name}</h1>
        </div>
      </section>
      <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Class code</p>
              <p className="text-indigo-600 font-semibold text-lg">
                {classData?.code}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => classData?.code && handleCopy(classData.code)}
              className="text-gray-600 hover:text-indigo-600"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Syllabus</p>
              <p className="text-gray-700 font-medium">
                {classData?.name} syllabus
              </p>
            </div>
            {classData?.syllabusUrl && (
              <MaterialPreviewDialog
                title={`${classData.name} Syllabus`}
                fileUrl={classData.syllabusUrl}
              />
            )}
          </CardContent>
        </Card>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="px-6 py-6 flex flex-col bg-orange-300 justify-between w-full min-h-[240px] cursor-pointer rounded-[14px]"
          onClick={() => setMeetingState("isInstantMeeting")}
        >
          <div className="flex items-center justify-center glassmorphism size-10 rounded-[10px]">
            <Plus size={20} />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">New Meeting</h1>
            <p className="text-lg font-normal">Start an instant meeting</p>
          </div>
        </div>
        <div
          className="px-6 py-6 flex flex-col bg-purple-300 justify-between w-full min-h-[240px] cursor-pointer rounded-[14px]"
          onClick={() => setMeetingState("isScheduleMeeting")}
        >
          <div className="flex items-center justify-center glassmorphism size-10 rounded-[10px]">
            <Calendar size={20} />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Schedule Meeting</h1>
            <p className="text-lg font-normal">Plan your meeting now</p>
          </div>
        </div>
      </div>
      <MeetingPopUpModal
        isOpen={meetingState === "isScheduleMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Create Meeting"
        handelClick={createMeeting}
        loading={creatingClassMeeting}
      >
        <div className="flex flex-col gap-3">
          <label className="text-base font-normal">
            Add Meeting Description
          </label>
          <Textarea
            className="bg-white border-none h-40 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Enter meeting description"
            onChange={(e) => {
              setValues({ ...values, description: e.target.value });
            }}
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <label className="text-base font-normal">Select Date & Time</label>
          <ReactDatePicker
            selected={values.dateTime}
            onChange={(date) => {
              setValues({ ...values, dateTime: date! });
            }}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full rounded bg-white p-2 focus:outline-none"
          />
        </div>
      </MeetingPopUpModal>
      <MeetingPopUpModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        className="text-center"
        title="Start an instant meeting"
        btnText="Start Meeting"
        handelClick={createMeeting}
        loading={creatingClassMeeting}
      />
    </main>
  );
};

export default ClassHome;
