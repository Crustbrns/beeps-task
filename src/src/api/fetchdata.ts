import axiosClient from "./axios";

export type RequestEmail = {
  email: string;
};

export const fetchEmail = async (data : RequestEmail) => {
  const response = await axiosClient.post("/endpoint", data);
  return response.data;
};