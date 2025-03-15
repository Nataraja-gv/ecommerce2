import React, { useEffect } from "react";
import Navbar from "./navabar";
import { Outlet } from "react-router-dom";
import { ProfileAuth } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../feature/authSlice";
import { toast } from "react-toastify";
 


const Layout = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
 
  const fetchUser = async () => {
    try {
      const res = await ProfileAuth(); 
      dispatch(addUser(res?.data))
    } catch (error) {
      toast.error(error?.data?.message || error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
