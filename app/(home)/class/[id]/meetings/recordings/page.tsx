import CallTypeList from "@/components/CallTypeList";
import React, { use } from "react";

const MeetingRecordings = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <section className="flex size-full flex-col gap-10">
      <h1 className="text-2xl mt-6 text-gray-600 font-semibold">Call Recordings</h1>
      <CallTypeList type="recordings" classId={id} />
    </section>
  );
};

export default MeetingRecordings;
