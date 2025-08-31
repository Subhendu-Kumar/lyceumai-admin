"use client";

import { toast } from "sonner";
import { getClasses } from "@/api/class_room";
import React, { useEffect, useState } from "react";
import ClassCard from "@/components/cards/ClassCard";
import HomePlaceholder from "@/components/pages/HomePlaceholder";

interface ClassRoom {
  id: string;
  name: string;
  code: string;
  description: string;
}

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [classes, setClasses] = useState<ClassRoom[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const res = await getClasses();
        if (res.status === 200) {
          setClasses(res.data.classrooms);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  if (loading) {
    return <div>loading classes</div>;
  }

  if (classes.length === 0) {
    return <HomePlaceholder />;
  }

  return (
    <div className="w-full min-h-full p-10 grid grid-cols-4 gap-6">
      {classes.map((classRoom) => (
        <ClassCard key={classRoom.id} title={classRoom.name} />
      ))}
    </div>
  );
};

export default Home;
