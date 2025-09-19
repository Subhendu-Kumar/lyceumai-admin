import ClassSideBar from "@/components/sidebar/ClassSideBar";
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
      <div className="w-full h-full overflow-y-scroll py-10 lg:px-10 md:px-8 sm:px-6 px-4">
        {children}
      </div>
    </div>
  );
};

export default ClassLayout;
