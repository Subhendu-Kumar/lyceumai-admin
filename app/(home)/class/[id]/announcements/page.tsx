"use client";

import API from "@/lib/api";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { getMessageFromError } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Announcement } from "@/types/announcement";
import { Card, CardContent } from "@/components/ui/card";

const AnnouncementsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await API.get(`/class/announcements/${id}`);
        if (res.status === 200) {
          setAnnouncements(res.data.announcements);
        }
      } catch (error) {
        toast.error(getMessageFromError(error));
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
        const res = await API.put(`/class/announcement/${editingId}`, {
          title,
          message,
        });

        if (res.status === 200) {
          setAnnouncements((prev) =>
            prev.map((a) =>
              a.id === editingId ? { ...a, ...res.data.announcement } : a
            )
          );
        }
        setEditingId(null);
      } else {
        const res = await API.post(`/class/announcement`, {
          title,
          message,
          class_id: id,
        });

        if (res.status === 201) {
          setAnnouncements((prev) => [res.data.announcement, ...prev]);
        }
      }
    } catch (error) {
      toast.error(getMessageFromError(error));
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
      const res = await API.delete(`/class/announcement/${id}`);
      if (res.status === 200) {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
        if (editingId === id) handleCancel();
      }
    } catch (error) {
      toast.error(getMessageFromError(error));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <Button
          onClick={() => setFormVisible(!formVisible)}
          className={`${formVisible ? "custom-btn-red" : "custom-btn"}`}
        >
          <span>{formVisible ? "Cancel" : "Add Announcement"}</span>
        </Button>
      </div>
      {formVisible && (
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
      )}
      {announcements.length === 0 && !formVisible && (
        <div className="mt-12 text-gray-600 flex items-center justify-center">
          No announcements yet.
        </div>
      )}
      <div className="grid gap-6 mt-6">
        {announcements.map((a) => (
          <Card key={a.id}>
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
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
