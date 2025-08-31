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

export const createClass = async (name: string, description: string) => {
  try {
    const res = await API.post("/admin/classroom", { name, description });
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
