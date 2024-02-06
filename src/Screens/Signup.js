import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Component/Header";
import { useAddNewUserMutation } from "../Redux/Services/authServices";

const Signup = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [error, setError] = useState("");

  const [loading ,setLoading]=useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    mobileNo: "",
    name: "",
  });

  const [visible, setVisible] = useState(false);
  const [addNewUser]=useAddNewUserMutation()
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setMobileNumberError("");
    setUsernameError("");
    setError("");
  
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
    if (!data.mobileNo) {
      setMobileNumberError("Mobile number is required");
      setVisible(true);
      return;
    }
    if (!data.name) {
      setUsernameError("Username is required");
      setVisible(true);
      return;
    }
    setLoading(true)
    try {
      const res = await addNewUser({
        email: data.email,
        password: data.password,
        mobileNo: data.mobileNo,
        name: data.name,
      });
      if (res.data && res.data.status === "ok") {
      setLoading(false)
      handleSuccessfulLogin()
      } else {
        toast.error("Signup failed. Please check your details.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during signup. Please try again.");
    }
  };

  const handleSuccessfulLogin = () => {
    const redirectUrl = localStorage.getItem("checkoutRedirectUrl");

    if (redirectUrl) {
      setError("Log in to register and attend the event.");

      localStorage.removeItem("checkoutRedirectUrl");

      navigate(redirectUrl);
    } else {
      toast.success("Registered Sucessfully")
      setTimeout(() => {
        navigate("/dashboard");
      }, 6000);  
      }
  };

  return (
    <>
      <div>
      
      <div
        className="bg-gray-900 text-white w-full min-h-screen flex justify-center items-center"
        style={{
          padding: "20px",
        }}
      >
        <div className="container mx-auto h-full">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="md:w-3/5 w-full px-5 flex flex-col justify-center items-center">
              <p className="text-3xl text-center text-white tracking-wider font-bold">
                Welcome to
              </p>
              <h3 className="bg-secondry px-4 py-2 rounded-xl text-white mt-3 text-center font-bold tracking-wider md:text-3xl text-2xl">
              Work Place Safety
              </h3>
              <p className="mt-3">Signup to get started</p>
              <div className="md:w-3/4 w-full mx-auto">
                <form className="p-5 space-y-6" onSubmit={handleSignup}>
                  {visible && emailError && (
                    <div className="text-red-400">{emailError}</div>
                  )}
                  {passwordError && (
                    <div className="text-red-400">{passwordError}</div>
                  )}
                  {mobileNumberError && (
                    <div className="text-red-400">{mobileNumberError}</div>
                  )}
                  {usernameError && (
                    <div className="text-red-400">{usernameError}</div>
                  )}
                  <input
                    type="text"
                    placeholder="Username"
                    value={data.name}
                    onChange={(event) =>
                      setData({ ...data, name: event.target.value })
                    }
                    className="px-4 py-3 border border-white rounded-xl w-full bg-transparent focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(event) =>
                      setData({ ...data, email: event.target.value })
                    }
                    className="px-4 py-3 border border-white rounded-xl w-full bg-transparent focus:outline-none"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(event) =>
                      setData({ ...data, password: event.target.value })
                    }
                    className="px-4 py-3 border border-white rounded-xl w-full bg-transparent focus:outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={data.mobileNo}
                    onChange={(event) =>
                      setData({ ...data, mobileNo: event.target.value })
                    }
                    className="px-4 py-3 border border-white rounded-xl w-full bg-transparent focus:outline-none"
                  />

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={loading}

                      className="border bg-gradient-to-br from-primary via-primary to-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-white w-full py-3 rounded-2xl"
                    >
                                            {loading ? "Loading..." : "Signup"}

                    </button>
                  </div>
                </form>
              </div>
              <span>Already have an Account? <Link to={"/login"} className="underline text-white">Login</Link></span>

            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signup;
