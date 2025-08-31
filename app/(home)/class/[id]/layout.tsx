import ClassSideBar from "@/components/ClassSideBar";
import React from "react";

const ClassLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ClassSideBar params={params} />
      <div className="w-full h-full overflow-y-scroll p-10">{children}</div>
    </div>
  );
};

export default ClassLayout;
