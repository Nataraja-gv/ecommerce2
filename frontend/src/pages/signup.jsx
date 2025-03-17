import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../feature/authSlice";
import { useNavigate } from "react-router-dom";
import { AuthSignup } from "../services/auth";

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    photo_url: null,
    address: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserData((prevState) => ({
        ...prevState,
        photo_url: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", userData?.name);
      formData.append("email", userData?.email);
      formData.append("password", userData?.password);
      formData.append("address", userData?.address);
      if (userData?.photo_url) {
        formData.append("photo_url", userData.photo_url);
      }
      const res = await AuthSignup(formData);
      if (res && res.data) {
        dispatch(addUser(res.data));
        toast.success("Sign up successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.message ||
          error ||
          error?.data?.message ||
          "An error occurred during sign up"
      );
    }
  };

  return (
    <div className=" mt-[80px]">

     
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={userData.name || ""}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email || ""}
              required
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={userData.password || ""}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              required
              value={userData.address || ""}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your address"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="photo_url"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Photo
            </label>
            <div className="flex justify-center items-center">
              {!userData.photo_url ? (
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer w-full p-4 bg-indigo-600 text-white text-center rounded-md shadow-md hover:bg-indigo-700 transition"
                >
                  Upload Profile Picture
                  <input
                    id="file-upload"
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(userData.photo_url)}
                    alt="Uploaded Preview"
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                  <button
                    type="button"
                    className="mt-2 text-sm font-bold text-red-500"
                    onClick={() =>
                      setUserData({ ...userData, photo_url: null })
                    }
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignUpPage;