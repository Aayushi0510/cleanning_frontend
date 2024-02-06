import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import {
  setAccessToken,
  setRefreshToken,
  setUser,
} from "../Redux/Slice/authSlice";
import { useLoginMutation } from "../Redux/Services/authServices";

const Login = () => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [loading, setAuthLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);

  const [login] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!data.email) {
      setEmailError("Email is required");
      setVisible(true);
      return;
    }
    if (!data.password) {
      setPasswordError("Password is required");
      setVisible(true);
      return;
    }
    setLoading(true);

    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      console.log(response);

      const userData = response?.data?.data;
      if (response?.data?.data) {
        dispatch(setUser(response?.data?.data));
        dispatch(setAccessToken(response?.data?.data?.accessToken));
        dispatch(setRefreshToken(response?.data?.data?.refreshToken));
        localStorage.setItem("userData", JSON.stringify(userData));

        localStorage.setItem("authToken", response?.data?.data?.accessToken);
        localStorage.setItem(
          "refreshToken",
          response?.data?.data?.refreshToken
        );
        setLoading(false);
        handleSuccessfulLogin();
      } else if (response && response.error) {
        console.log(response.error);
        setApiError(response?.error?.data?.msg);
        setLoading(false);
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", response);
        toast.error("An unexpected error occurred");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("An unexpected error occurred"); // Show error using react-toastify
      setLoading(false);
    }
  };

  const handleSuccessfulLogin = () => {
    const redirectUrl = localStorage.getItem("checkoutRedirectUrl");

    if (redirectUrl) {
      setError("Log in to register and attend the event.");

      localStorage.removeItem("checkoutRedirectUrl");

      window.location.href = redirectUrl;
    } else {
      window.location.href = "/dashboard";
    }
  };
  return (
    <>
      <div>
        <div
          className="bg=white text-gray-700 w-full min-h-screen flex justify-center items-center "
          style={{
            padding: "20px",
          }}
        >
          <div className="container mx-auto h-full">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="md:w-3/5 w-full px-5 flex flex-col justify-center items-center">
                <div className="bg-bgg w-96 border-gray-700 text-blue-700 border-dashed	 text-sm tracking-wider text-center px-4 py-4">
                  If you have an account with us, enter your information bellow
                  to sign in. If you don't have an account yet, you will be able
                  to create one when you purchase a course(s).
                </div>
                <p className="text-3xl text-center text-white tracking-wider font-bold">
                  Welcome Back.
                </p>
                <h3 className="bg-secondry px-4 py-2 rounded-xl text-white mt-3 text-center font-bold tracking-wider md:text-3xl text-2xl">
                  Work Place Safety
                </h3>
                <p className="mt-3"> Login to join </p>
                <div className="md:w-3/4 w-full mx-auto">
                  <form className="p-5 space-y-6" onSubmit={handleLogin}>
                    {apiError && (
                      <div className="text-red-400 text-center">{apiError}</div>
                    )}
                    {emailError && (
                      <div className="text-red-400 ">{emailError}</div>
                    )}

                    <input
                      type="email"
                      placeholder="Email"
                      value={data.email}
                      onChange={(event) =>
                        setData({ ...data, email: event.target.value })
                      }
                      className="px-4 py-3 border border-gray-700 rounded-xl w-full bg-transparent focus:outline-none"
                    />
                    {passwordError && (
                      <div className="text-red-400 ">{passwordError}</div>
                    )}
                    <input
                      type="password"
                      placeholder="Password"
                      value={data.password}
                      onChange={(event) =>
                        setData({ ...data, password: event.target.value })
                      }
                      className="px-4 py-3 border border-gray-700 rounded-xl w-full bg-transparent focus:outline-none"
                    />

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={loading}
                        className=" border bg-secondry text-white w-full py-3 rounded-2xl"
                      >
                        {loading ? "Loading..." : "Login"}
                      </button>
                    </div>
                  </form>
                </div>
                <span>
                  Don't have an Account?{" "}
                  <Link to={"/signup"} className="underline text-gray-700">
                    SignUp
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
