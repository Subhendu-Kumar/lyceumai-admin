"use client";

import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  addAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement,
} from "@/api/class_room";

interface Announcement {
  id: string;
  title: string;
  message: string;
}

const AnnouncementsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await getAnnouncements(id);
        if (res.status === 200) {
          setAnnouncements(res.data.announcements);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong";
        toast.error(message);
      }
    };
    fetchAnnouncements();
  }, [id]);

  const handleAddOrUpdate = async () => {
    if (!title.trim() || !message.trim()) {
      return toast.error("Title and message cannot be empty.");
    }
    try {
      if (editingId) {
        const res = await updateAnnouncement(editingId, title, message);
        if (res.status === 200) {
          setAnnouncements((prev) =>
            prev.map((a) =>
              a.id === editingId ? { ...a, ...res.data.announcement } : a
            )
          );
        }
        setEditingId(null);
      } else {
        const res = await addAnnouncement(title, message, id);
        if (res.status === 201) {
          setAnnouncements((prev) => [res.data.announcement, ...prev]);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response?.data?.detail || error.message || "Something went wrong";
      toast.error(message);
    } finally {
      setTitle("");
      setMessage("");
      setFormVisible(false);
    }
  };

  const handleEdit = (id: string) => {
    const announcement = announcements.find((a) => a.id === id);
    if (announcement) {
      setTitle(announcement.title);
      setMessage(announcement.message);
      setEditingId(id);
      setFormVisible(true);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setMessage("");
    setEditingId(null);
    setFormVisible(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteAnnouncement(id);
      if (res.status === 200) {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
        if (editingId === id) handleCancel();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response?.data?.detail || error.message || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <motion.div
          initial={false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <Button
            onClick={() => setFormVisible(!formVisible)}
            className={`${formVisible ? "custom-btn-red" : "custom-btn"}`}
          >
            <motion.span
              key={formVisible ? "cancel" : "add"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {formVisible ? "Cancel" : "Add Announcement"}
            </motion.span>
          </Button>
        </motion.div>
      </div>

      {/* Animated Form */}
      <AnimatePresence>
        {formVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-6">
              <CardContent className="p-4 flex flex-col gap-3">
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={handleAddOrUpdate} className="custom-btn">
                  {editingId ? "Update" : "Add"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="grid gap-6 mt-6">
        {announcements.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{a.title}</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(a.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(a.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-gray-800 text-base">{a.message}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
