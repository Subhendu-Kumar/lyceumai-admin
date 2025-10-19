/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { use, useEffect, useState } from "react";
import { Loader, UserPlus2, X } from "lucide-react";
import {
  addStudent,
  getClassEnrollments,
  removeStudent,
} from "@/api/class_room";
import { Input } from "@/components/ui/input";

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface Enrollment {
  id: string;
  student: Student;
  classroomId: string;
  joinedAt: string;
}

const Peoples = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await getClassEnrollments(id);
      setEnrollments(res.data.students);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      const message =
        error.response?.data?.detail || error.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, [id]);

  const handleRemoveStudent = async (student_id: string) => {
    try {
      await removeStudent(student_id, id);
      setEnrollments((prev) =>
        prev.filter((enrollment) => enrollment.student.id !== student_id)
      );
      toast.success("Student removed successfully");
    } catch (error: any) {
      console.error("Error removing student:", error);
      const message =
        error.response?.data?.detail || error.message || "Something went wrong";
      toast.error(message);
    }
  };

  const handleAddStudent = async () => {
    const reStrict = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!reStrict.test(newStudentEmail)) {
      toast.error("Invalid email address");
      return;
    }
    try {
      await addStudent(newStudentEmail, id);
      toast.success("Student added successfully");
      setNewStudentEmail("");
      fetchStudents();
    } catch (error: any) {
      console.error("Error adding student:", error);
      const message =
        error.response?.data?.detail || error.message || "Something went wrong";
      toast.error(message);
    } finally {
      setShowAddStudentForm(false);
    }
  };

  return (
    <main className="container mx-auto px-6 space-y-12">
      <section>
        <h2 className="text-2xl font-semibold">Teachers</h2>
        <div className="flex items-center space-x-3 mt-5">
          <div className="w-12 h-12 text-2xl uppercase rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-semibold">
            {user?.name?.charAt(0)}
          </div>
          <div className="flex flex-col space-y-0.5">
            <span className="text-gray-800 font-semibold text-base">
              {user?.name}
            </span>
            <span className="text-gray-500 text-sm">{user?.email}</span>
          </div>
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-2xl font-semibold">Students</h2>
          <button
            onClick={() => setShowAddStudentForm((prev) => !prev)}
            className="p-3 hover:bg-gray-300 rounded-full cursor-pointer"
          >
            {showAddStudentForm ? (
              <X className="w-5 h-5 text-gray-500" />
            ) : (
              <UserPlus2 className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>
        {showAddStudentForm && (
          <div className="flex items-center space-x-4 mt-6">
            <Input
              className="w-60 h-10"
              placeholder="Enter student email"
              type="email"
              value={newStudentEmail}
              onChange={(e) => setNewStudentEmail(e.target.value)}
            />
            <button onClick={handleAddStudent} className="px-4 py-2 custom-btn">
              Add
            </button>
          </div>
        )}
        {loading ? (
          <div className="w-full h-80 flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : enrollments.length === 0 ? (
          <div className="flex flex-col items-center w-full py-6 text-center text-gray-600 mt-6">
            <Image
              src="/no_people.svg"
              alt="No students"
              width={200}
              height={200}
            />
            <p className="mt-4">Add students to this class</p>
            <button className="mt-2 inline-flex items-center text-blue-600 hover:underline">
              <UserPlus2 className="w-4 h-4 mr-1" />
              Invite students
            </button>
          </div>
        ) : (
          <div className="w-full h-auto flex flex-col space-y-6 mt-5">
            {enrollments.map((enrollment) => {
              return (
                <div
                  key={enrollment.id}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 text-2xl uppercase rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-semibold">
                      {enrollment.student.name.charAt(0)}
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <span className="text-gray-800 font-semibold text-base">
                        {enrollment.student.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {enrollment.student.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <p className="text-gray-400 text-sm">
                      Joined{" "}
                      {new Date(enrollment.joinedAt).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleRemoveStudent(enrollment.student.id)}
                      className="inline-flex cursor-pointer items-center text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Peoples;
