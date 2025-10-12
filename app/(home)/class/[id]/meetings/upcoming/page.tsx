import CallTypeList from "@/components/CallTypeList";
import React, { use } from "react";

const UpcomingMeetings = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <section className="flex size-full flex-col gap-10">
      <h1 className="text-3xl font-bold">Upcoming Meetings</h1>
      <CallTypeList type="upcoming" classId={id} />
    </section>
  );
};

export default UpcomingMeetings;
