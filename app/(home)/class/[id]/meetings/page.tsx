import { use } from "react";
import CallTypeList from "@/components/CallTypeList";

const ClassMeetings = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <section className="flex size-full flex-col gap-10">
      <h1 className="text-2xl mt-6 text-gray-600 font-semibold">
        Previous Meetings
      </h1>
      <CallTypeList type="ended" classId={id} />
    </section>
  );
};

export default ClassMeetings;
