/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { ClassRoom } from "@/types/classroom";
import React, { useEffect, useState } from "react";
import ClassCard from "@/components/cards/ClassCard";
import { AnimatePresence, motion } from "motion/react";
import { deleteClass, getClasses } from "@/api/class_room";
import HomePlaceholder from "@/components/pages/HomePlaceholder";
import ClassCardSkeleton from "@/components/cards/ClassCardSkeleton";

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

  const handleDeleteClass = async (id: string) => {
    try {
      const deletingToastId = toast.loading("Deleting class", {
        description: `Class ID: ${id}`,
      });
      await deleteClass(id);
      setClasses((prev) => prev.filter((classRoom) => classRoom.id !== id));
      toast.success("Class deleted successfully", {
        id: deletingToastId,
        description: `Class ID: ${id}`,
      });
    } catch (error: any) {
      const message =
        error.response?.data?.detail || error.message || "Something went wrong";
      toast.error(message, {
        description: `Class ID: ${id}`,
      });
    }
  };

  // if (loading) {
  //   return (
  //     <div className="w-full min-h-full p-10 grid grid-cols-4 gap-6">
  //       {Array.from({ length: 4 }, (_, index) => (
  //         <ClassCardSkeleton key={index} />
  //       ))}
  //     </div>
  //   );
  // }

  // if (classes.length === 0) {
  //   return <HomePlaceholder />;
  // }

  // return (
  //   <div className="w-full min-h-full p-10 grid grid-cols-4 gap-6">
  //     {classes.map((classRoom) => (
  //       <ClassCard key={classRoom.id} classroom={classRoom} />
  //     ))}
  //   </div>
  // );

  return (
    <div className="w-full min-h-full sm:p-10 p-4">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeletons"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6"
          >
            {Array.from({ length: 4 }, (_, index) => (
              <ClassCardSkeleton key={index} />
            ))}
          </motion.div>
        ) : classes.length === 0 ? (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <HomePlaceholder />
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6"
          >
            {classes.map((classRoom) => (
              <ClassCard
                key={classRoom.id}
                classroom={classRoom}
                onDelete={handleDeleteClass}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
