"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileUp, Loader } from "lucide-react";

const MaterialUploadDialog = ({
  file,
  title,
  setFile,
  loading,
  setTitle,
  submitData,
}: {
  title: string;
  loading: boolean;
  file: File | null;
  submitData: (close: () => void) => Promise<void>;
  setTitle: (title: string) => void;
  setFile: (file: File | null) => void;
}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="custom-btn">Add Material</Button>
      </DialogTrigger>
      <DialogContent className="w-[30rem]">
        <DialogHeader>
          <DialogTitle>Upload Class Material</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-4 mt-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Title:</p>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter material title"
              className={`border-gray-400`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">File:</p>
            <label className="w-full h-28 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition">
              <FileUp className="w-6 h-6 mb-1 text-gray-600" />
              <span className="text-xs text-gray-500">
                {file ? file.name : "Click to select a file"}
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
          <Button
            onClick={() => submitData(() => setOpen(false))}
            className="custom-btn"
          >
            {loading ? <Loader className="animate-spin" /> : "Upload Material"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialUploadDialog;
