import API from "./axiosInstance";

export const getClasses = async () => {
  try {
    const res = await API.get("/admin/classrooms");
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
