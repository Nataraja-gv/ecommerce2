import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";

export const Auth = async (loginData) => {
  const config = {
    method: "post",
    url: `/auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: loginData,
  };

  try {
    const res = await axiosInstance.request(config);
    return res?.data;
  } catch (error) {
    toast.error(error?.data?.message || error);
  }
};

export const ProfileAuth = async () => {
  const config = {
    method: "get",
    url: `/profile/view`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const res = await axiosInstance.request(config);

    return res?.data;
  } catch (error) {
    toast.error(error?.data?.message || error);
  }
};

export const UserLogout = async () => {
  const config = {
    method: "post",
    url: `/auth/logout`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const res= await axiosInstance.request(config)
    return res?.data
  } catch (error) {
    toast.error(error?.data?.message || error);
  }
};
