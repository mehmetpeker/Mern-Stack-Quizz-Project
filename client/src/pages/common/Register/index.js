import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../../apicalls/users";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    let user = {
      username,
      email,
      password,
    };

    try {
      const response = await registerUser(user);
      if (response.success) {
        toast.success(response.message, {
          position: "bottom-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(response.message, {
          position: "bottom-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="bg-gray-100">
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-10 py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="mt-1 text-center text-[32px] font-bold text-gray-900">
            Create an account
          </h1>
        </div>
        <form
          onSubmit={submitHandler}
          className="max-w-md w-full mx-auto bg-white shadow rounded-lg p-7 space-y-6"
        >
          <div className="flex flex-col">
            <label
              className="text-sm font-semibold text-gray-600 mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="border border-gray-300 rounded-lg bg-white px-3 py-2"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-semibold text-gray-600 mb-1"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              className="border border-gray-300 rounded-lg bg-white px-3 py-2"
              type="text"
              name="email"
              id="email"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-semibold text-gray-600 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-300 rounded-lg bg-white px-3 py-2"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-center text-sm">
            <div>
              <Link
                to="/login"
                className="text-indigo-600 font-medium cursor-pointer hover:underline"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md p-2"
            >
              Sign Up
            </button>
          </div>
          <div className="relative pb-2">
            <div className="absolute top-0 left-0 w-full border-b"></div>
            <div className="absolute -top-3 left-0 w-full text-center">
              <span className="bg-white px-3 text-sm text-gray-600">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xl">
            <button className="border-2 rounded-md px-3 py-1 text-center text-gray-500 cursor-pointer hover:border-gray-600">
              <i className="fab fa-facebook"></i>
            </button>
            <button className="border-2 rounded-md px-3 py-1 text-center text-gray-500 cursor-pointer hover:border-gray-600">
              <i className="fab fa-twitter"></i>
            </button>
            <button className="border-2 rounded-md px-3 py-1 text-center text-gray-500 cursor-pointer hover:border-gray-600">
              <i className="fab fa-linkedin"></i>
            </button>
          </div>
        </form>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Register;
