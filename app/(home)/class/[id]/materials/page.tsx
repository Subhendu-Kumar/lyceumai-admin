"use client";

import {
  deleteMaterial,
  uploadMaterial,
  getClassRoomMaterials,
} from "@/api/class_room";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { motion } from "motion/react";
import React, { use, useEffect, useState } from "react";
import MaterialUploadDialog from "@/components/dialogs/MaterialUploadDialog";
import MaterialPreviewDialog from "@/components/dialogs/MaterialPreviewDialog";
import { getMessageFromError } from "@/lib/utils";

type Material = {
  id: string;
  title: string;
  fileUrl: string;
  uploadedAt: string;
  classroomId: string;
};

const skeletonArray = Array.from({ length: 6 });

const ClassMaterials = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setFetching(true);
        const res = await getClassRoomMaterials(id);
        setMaterials(res.data.materials);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching class data:", error);
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong";
        setError(message);
      } finally {
        setFetching(false);
      }
    };
    fetchMaterials();
  }, [id]);

  const handleDeleteMaterial = async (material_id: string) => {
    try {
      await deleteMaterial(material_id);
      setMaterials((prev) => prev.filter((mat) => mat.id !== material_id));
      toast.success("Material deleted successfully");
    } catch (error) {
      toast.success(getMessageFromError(error));
    }
  };

  const handleAddMaterial = async (close: () => void) => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    if (title.trim() === "") {
      toast.error("Please enter a title for the material.");
      return;
    }
    setLoading(true);
    try {
      const res = await uploadMaterial(file, title.trim(), id);
      if (res.status === 201) {
        setMaterials((prev) => [res.data.material, ...prev]);
        toast.success("Material uploaded successfully");
      }
    } catch (error) {
      toast.success(getMessageFromError(error));
    } finally {
      setLoading(false);
      close();
      setTitle("");
      setFile(null);
    }
  };

  return (
    <div className="w-full h-auto p-6">
      <div className="w-full flex items-center justify-between mb-10">
        <h1 className="text-xl font-bold">Class Materials</h1>
        <MaterialUploadDialog
          title={title}
          setTitle={setTitle}
          file={file}
          setFile={setFile}
          submitData={handleAddMaterial}
          loading={loading}
        />
      </div>
      {fetching ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {skeletonArray.map((_, idx) => (
            <motion.div
              key={idx}
              className="p-6 border rounded-xl shadow-md bg-white flex flex-col justify-between animate-pulse"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <div>
                <div className="h-6 w-2/3 bg-gray-200 rounded mb-4" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
              </div>
              <div className="mt-6 h-10 w-full bg-gray-200 rounded-lg" />
            </motion.div>
          ))}
        </motion.div>
      ) : error ? (
        <div className="w-full h-60 flex items-center justify-center text-red-500">
          {error}
        </div>
      ) : materials.length === 0 ? (
        <div className="w-full h-60 flex items-center justify-center text-red-500">
          No materials found.
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {materials.map((material) => (
            <motion.div
              key={material.id}
              className="p-6 border rounded-xl shadow-md bg-white flex flex-col justify-between hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">{material.title}</h2>
                  <button
                    onClick={() => handleDeleteMaterial(material.id)}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Uploaded: {new Date(material.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <MaterialPreviewDialog
                title={material.title}
                fileUrl={material.fileUrl}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ClassMaterials;
