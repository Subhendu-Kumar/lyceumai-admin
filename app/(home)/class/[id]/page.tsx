/* eslint-disable */
"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { ClassRoom } from "@/types/classroom";
import { Button } from "@/components/ui/button";
import { getClassByID } from "@/api/class_room";
import React, { use, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, MessageSquare, Settings } from "lucide-react";
import MaterialPreviewDialog from "@/components/dialogs/MaterialPreviewDialog";

const ClassHome = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [classData, setClassData] = useState<ClassRoom | null>(null);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await getClassByID(id);
        setClassData(res.data.classroom);
      } catch (error: any) {
        console.error("Error fetching class data:", error);
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong";
        toast.error(message);
      }
    };
    fetchClass();
  }, [id]);

  const handleCopy = async () => {
    if (classData?.code) {
      await navigator.clipboard.writeText(classData.code);
      toast.success("Class code copied to clipboard");
    }
  };

  return (
    <main>
      <section className="bg-[url('/Math.jpg')] bg-cover bg-center text-white rounded-2xl">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold">{classData?.name}</h1>
        </div>
      </section>

      <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
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
              onClick={handleCopy}
              className="text-gray-600 hover:text-indigo-600"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow md:col-span-2">
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </div>
            <Input
              placeholder="Announce something to your class"
              className="flex-1"
            />
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
    </main>
  );
};

export default ClassHome;
