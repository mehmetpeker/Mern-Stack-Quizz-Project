import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../../apicalls/users";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    let user = {
      email,
      password,
    };

    try {
      const response = await loginUser(user);
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
          <h1 className="mt-6 text-center text-[32px] font-bold text-gray-900">
            Sign in to your account
          </h1>
        </div>
        <form
          onSubmit={submitHandler}
          className="max-w-md w-full mx-auto bg-white shadow rounded-lg p-7 space-y-6"
        >
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
          <div className="flex justify-between text-sm">
            <div className="flex items-center space-x-2">
              <input
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                type="checkbox"
                name="remember"
                id="remember"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div>
              <Link className="text-indigo-600 font-medium cursor-pointer hover:underline">
                Forgot to Password
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md p-2"
            >
              Sign in
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

          <div className="w-full text-center">
            <Link
              to="/register"
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Don't have an account? Register now!
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
