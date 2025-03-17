import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";


export const getAllBanner = async () => {
  const config = {
    method: "get",
    url: `/banner/all`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const res = await axiosInstance.request(config);
    
    return res?.data;
  } catch (error) {
    toast.error(error?.message || error);
  }
};
