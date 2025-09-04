import API from "./axiosInstance";

export const getClasses = async () => {
  try {
    const res = await API.get("/admin/classrooms");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getClassByID = async (id: string) => {
  try {
    const res = await API.get(`/admin/classroom/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const createClass = async (
  name: string,
  description: string,
  syllabus: File
) => {
  try {
    const formData = new FormData();
    formData.append("syllabus", syllabus);
    formData.append("name", name);
    formData.append("description", description);

    const res = await API.post("/admin/classroom", formData);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteClass = async (id: string) => {
  try {
    const res = await API.delete(`/admin/classroom/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getClassEnrollments = async (id: string) => {
  try {
    const res = await API.get(`/class/peoples/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const addStudent = async (email: string, class_id: string) => {
  try {
    const res = await API.post(`/class/add/student`, {
      email,
      class_id,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const removeStudent = async (student_id: string, class_id: string) => {
  try {
    const res = await API.delete("/class/remove/student", {
      data: { student_id, class_id },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getClassRoomMaterials = async (id: string) => {
  try {
    const res = await API.get(`/class/materials/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const uploadMaterial = async (
  file: File,
  title: string,
  class_id: string
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("classroomId", class_id);

    const res = await API.post(`/class/material`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteMaterial = async (id: string) => {
  try {
    const res = await API.delete(`/class/material/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const addAnnouncement = async (
  title: string,
  message: string,
  class_id: string
) => {
  try {
    const res = await API.post(`/class/announcement`, {
      title,
      message,
      class_id,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateAnnouncement = async (
  id: string,
  title: string,
  message: string
) => {
  try {
    const res = await API.put(`/class/announcement/${id}`, {
      title,
      message,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteAnnouncement = async (id: string) => {
  try {
    const res = await API.delete(`/class/announcement/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAnnouncements = async (classroom_id: string) => {
  try {
    const res = await API.get(`/class/announcements/${classroom_id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
