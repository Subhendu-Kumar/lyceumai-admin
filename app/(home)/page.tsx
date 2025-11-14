"use client";

import API from "@/lib/api";
import ClassCard from "@/components/cards/ClassCard";
import HomePlaceholder from "@/components/pages/HomePlaceholder";
import ClassCardSkeleton from "@/components/cards/ClassCardSkeleton";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ClassRoom } from "@/types/classroom";
import { getMessageFromError } from "@/lib/utils";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [classes, setClasses] = useState<ClassRoom[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const res = await API.get("/admin/classrooms");
        if (res.status === 200) {
          setClasses(res.data.classrooms);
        }
      } catch (error) {
        toast.error(getMessageFromError(error));
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const handleDeleteClass = async (id: string) => {
    try {
      const deletingToastId = toast.loading("Deleting class", {
        description: `Class ID: ${id}`,
      });
      const res = await API.delete(`/admin/classroom/${id}`);
      if (res.status !== 202) {
        throw new Error("Failed to delete class");
      }
      setClasses((prev) => prev.filter((classRoom) => classRoom.id !== id));
      toast.success("Class deleted successfully", {
        id: deletingToastId,
        description: `Class ID: ${id}`,
      });
    } catch (error) {
      toast.error(getMessageFromError(error), {
        description: `Class ID: ${id}`,
      });
    }
  };

  return (
    <div className="w-full min-h-full sm:p-10 p-4">
      {loading ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {Array.from({ length: 4 }, (_, index) => (
            <ClassCardSkeleton key={index} />
          ))}
        </div>
      ) : classes.length === 0 ? (
        <HomePlaceholder />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {classes.map((classRoom) => (
            <ClassCard
              key={classRoom.id}
              classroom={classRoom}
              onDelete={handleDeleteClass}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
