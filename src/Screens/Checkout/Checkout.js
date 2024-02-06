// src/components/CheckoutPage.js
import React, { useState } from "react";
import Footer from "../../Component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAddOrderMutation } from "../../Redux/Services/OrderService";
import { toast } from "react-toastify";
import {
  clearCart,
  decreaseItemQuantity,
  removeItemFromCart,
} from "../../Redux/Slice/CartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useAddPayemntMutation } from "../../Redux/Services/PaymentService";
import {
  useAddNewUserMutation,
  useLoginMutation,
} from "../../Redux/Services/authServices";
import {
  setAccessToken,
  setRefreshToken,
  setUser,
} from "../../Redux/Slice/authSlice";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import axios from "axios";

async function showToastAndNavigate() {
  // Assuming some asynchronous operation here, for example, showing a toast
  await toast.success("order place sucessfully"); // Use 'await' if showToast is asynchronous

  // Additional asynchronous operations if needed

  // Returning a resolved Promise to signal completion (optional)
  return Promise.resolve();
}

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.cart);
  const [addPayemnt] = useAddPayemntMutation();
  const [addNewUser] = useAddNewUserMutation();
  const [login] = useLoginMutation();
  const [nameValid, setNameValid] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Add this state variable
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const handleCountryChange = (val) => {
    setCountry(val);
    setRegion("");
  };

  const handleRegionChange = (val) => {
    setRegion(val);
  };
  const [fieldValidations, setFieldValidations] = useState({
    name: {
      value: "",
      isValid: true,
      errorMessage: "Please fill Required filled",
    },
    mobileNo: { value: "", isValid: true, errorMessage: "" },
    email: { value: "", isValid: true, errorMessage: "" },
    password: { value: "", isValid: true, errorMessage: "" },
    streetName: { value: "", isValid: true, errorMessage: "" },
    streetNo: { value: "", isValid: true, errorMessage: "" },
    postalCode: { value: "", isValid: true, errorMessage: "" },
    townCity: { value: "", isValid: true, errorMessage: "" },
    country: { value: "", isValid: true, errorMessage: "" },

    province: { value: "", isValid: true, errorMessage: "" },
  });

  const [termsChecked, setTermsChecked] = useState(false);

  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleInputChange = (fieldName) => (event) => {
    const inputValue = event.target.value.trim();

    setFieldValidations((prevValidations) => ({
      ...prevValidations,
      [fieldName]: {
        value: inputValue,
        isValid: inputValue !== "",
        errorMessage: inputValue !== "" ? "" : "Field is required.",
      },
    }));

    // Other field validations
  };

  const calculateTotal = (items) => {
    return items?.reduce((total, item) => total + item?.courses[0]?.price, 0);
  };

  const handlePlaceOrder = async () => {
    try {
      setIsButtonClicked(true);
      const validations = Object.keys(fieldValidations).reduce(
        (result, fieldName) => {
          const inputValue = fieldValidations[fieldName].value.trim();
          // Skip email and password validation if the user exists
          if (fieldName === "email" && user) {
            result[fieldName] = {
              value: inputValue,
              isValid: true,
              errorMessage: "",
            };
          } else if (fieldName === "password" && user) {
            result[fieldName] = {
              value: inputValue,
              isValid: true,
              errorMessage: "",
            };
          } else {
            result[fieldName] = {
              value: inputValue,
              isValid: inputValue !== "",
              errorMessage: inputValue !== "" ? "" : "Field is required.",
            };
          }

          return result;
        },
        {}
      );
      console.log(validations);

      setFieldValidations(validations);

      const areAllFieldValid = Object.values(validations).every(
        (validation) => validation.isValid
      );

      if (!termsChecked) {
        setErrorMessage("Please accept the terms and conditions.");
        return;
      }

      if (!areAllFieldValid) {
        setErrorMessage("Please correct the errors in the form.");
        return;
      }
      let userId = user?._id;

      if (!user) {
        const nameInput = document.getElementById("name");
        const mobileNoInput = document.getElementById("mobileNo");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        const registrationData = {
          name: nameInput?.value || "",
          mobileNo: mobileNoInput?.value || "",
          email: emailInput?.value || "",
          password: passwordInput?.value || "",
        };

        const res = await addNewUser(registrationData);

        if (res.data && res.data.status === "ok") {
          const response = await login({
            email: registrationData.email,
            password: registrationData.password,
          });
          console.log(response);

          const userData = response?.data?.data;
          if (response?.data?.data) {
            dispatch(setUser(response?.data?.data));
            dispatch(setAccessToken(response?.data?.data?.accessToken));
            dispatch(setRefreshToken(response?.data?.data?.refreshToken));
            localStorage.setItem("userData", JSON.stringify(userData));

            localStorage.setItem(
              "authToken",
              response?.data?.data?.accessToken
            );
            localStorage.setItem(
              "refreshToken",
              response?.data?.data?.refreshToken
            );
            userId = response?.data?.data?._id;

            console.log("User registered successfully:");
          }
        } else {
          console.error("User registration failed:");
        }
      }

      console.log("hello");
      setIsButtonDisabled(true);

      const stripe = await loadStripe(
        "pk_test_51OSkjcSJg3MN1lkAZf2rmb6xQMOtdUsGBUXixhXj1v28a4EU0maEQhHMjf2goTeYg3ulvSSVtyHqnvGMBXD1aaaC008fpyFVEk"
      );
      console.log(user?._id);
      const nameOrder = document.getElementById("name");
      const mobileOrder = document.getElementById("mobileNo");
      const companyorder = document.getElementById("companyName");
      const streetOrder = document.getElementById("streetName");
      const streetNoOrder = document.getElementById("streetNo");
      const postalCorder = document.getElementById("postalCode");
      const townCityOrder = document.getElementById("townCity");
      const provinceOrder = document.getElementById("province");
      const countryorder = document.getElementById("country");

      const orderData = {
        userId: userId,
        courseId:cart[0]?.courses[0]?._id,
        name: nameOrder?.value || "",
        mobileNo: mobileOrder?.value || "",
        companyName: companyorder?.value || "",
        streetName: streetOrder?.value || "",
        streetNo: streetNoOrder?.value || "",
        postalCode: postalCorder?.value || "",
        townCity: townCityOrder?.value || "",
        province: provinceOrder?.value || "",
        country: countryorder?.value || "",
        course: cart.map((item) => ({
          _id: item.courses[0]?._id,
          title: item.courses[0].title,
          description: item.courses[0]?.description,
          price: item.courses[0]?.price,
        })),
      };

      console.log(orderData, "orderdata");

      const response = await axios.post('http://localhost:8000/api/create-checkout-session' ,orderData);
      console.log(response);
      if (response.data.sessionId) {
        const result = stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
        await showToastAndNavigate();
        setTimeout(() => {
          navigate("/dashboard");
        }, 6000);

        if (result.error) {
          toast.error("Error in placing order");
        }

        dispatch(clearCart());
        setIsButtonDisabled(false);
      }

      if (
        response.data.message === "Orders and payments updated successfully"
      ) {
        toast.success("order placed sucessfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      }
      dispatch(clearCart());
      setIsButtonDisabled(false);
    } catch (error) {
      console.error("Error placing the orderss:", error);
    }
  };

  // const handleLoginOrRegisterClick = () => {
  //   localStorage.setItem("checkoutRedirectUrl", window.location.href);
  // };

  const handleRemoveItem = (itemId, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseItemQuantity(itemId));
    } else {
      dispatch(removeItemFromCart(itemId));
    }
  };

  const handleCountryChangeoption = (val) => {
    setFieldValidations((prevValidations) => ({
      ...prevValidations,
      country: {
        value: val,
        isValid: val !== "",
        errorMessage: val !== "" ? "" : "Field is required.",
      },
    }));

    handleCountryChange(val);
  };

  const handleRegionChangeption = (val) => {
    setFieldValidations((prevValidations) => ({
      ...prevValidations,
      province: {
        value: val,
        isValid: val !== "",
        errorMessage: val !== "" ? "" : "Field is required.",
      },
    }));

    handleRegionChange(val);
  };

  return (
    <>
      <div className="bg-gray-900 text-white py-8">
        <div className="container px-8 mx-auto">
          <h1 className="text-center text-3xl">Checkout</h1>
        </div>
      </div>
      <div className="flex justify-center items-center px-5 py-5 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 w-full container mx-auto">
          <div className="text-center text-main mb-2">
            <p className="inline">Returning Customer? </p>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="inline bg-main text-white py-2 px-2 mb-2 rounded-md hover:bg-secondry text-sm"
            >
              Click Here to Login
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-lightpurple p-4 sm:p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-main mb-4">
                Personal and Account Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your first name"
                    className="w-full border border-gray-300 rounded-md p-2"
                    onChange={handleInputChange("name")} // Add this line
                    required={!user} // Make the field required only when the user is not logged in
                  />
                  {isButtonClicked && !fieldValidations.name.isValid && (
                    <p className="text-red-500">
                      {fieldValidations.name.errorMessage}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="mobileNo"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    id="mobileNo"
                    name="mobileNo"
                    placeholder="Enter your Mobile Number"
                    className="w-full border border-gray-300 rounded-md p-2"
                    onChange={handleInputChange("mobileNo")} // Add this line
                    required={!user} // Make the field required only when the user is not logged in
                  />
                  {isButtonClicked && !fieldValidations.mobileNo.isValid && (
                    <p className="text-red-500">
                      {fieldValidations.mobileNo.errorMessage}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="companyName"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Company Name (optional)
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Enter company name"
                    onChange={handleInputChange} // Add this line
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="streetName"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Street Name
                  </label>
                  <input
                    type="text"
                    id="streetName"
                    name="streetName"
                    placeholder="Enter street name"
                    onChange={handleInputChange("streetName")} // Add this line
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                  {isButtonClicked && !fieldValidations.streetName.isValid && (
                    <p className="text-red-500">
                      {fieldValidations.streetName.errorMessage}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="streetName"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Country
                  </label>
                  <CountryDropdown
                    id="country"
                    name="country"
                    value={fieldValidations.country.value}
                    onChange={(val) => handleCountryChangeoption(val)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {isButtonClicked && !fieldValidations.country.isValid && (
                    <p className="text-red-500">
                      {fieldValidations.country.errorMessage}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="streetName"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Province
                  </label>
                  <RegionDropdown
                    id="province"
                    name="province"
                    country={fieldValidations.country.value}
                    value={fieldValidations.province.value}
                    onChange={(val) => handleRegionChangeption(val)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    disableWhenEmpty
                  />
                  {isButtonClicked && !fieldValidations.province.isValid && (
                    <p className="text-red-500">
                      {fieldValidations.province.errorMessage}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="streetNo"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Street No.
                  </label>
                  <input
                    type="text"
                    id="streetNo"
                    name="streetNo"
                    placeholder="Enter street no."
                    onChange={handleInputChange("streetNo")} // Add this line
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                  {isButtonClicked && !fieldValidations.streetNo.isValid && (
                    <p className="text-red-500">
                      {fieldValidations.streetNo.errorMessage}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="postalCode"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Enter postal code"
                    onChange={handleInputChange("postalCode")} // Add this line
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                  {isButtonClicked && !fieldValidations.postalCode.isValid && (
                    <p className="text-red-500">
                      {fieldValidations.postalCode.errorMessage}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="townCity"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Town / City
                  </label>
                  <input
                    type="text"
                    id="townCity"
                    name="townCity"
                    placeholder="Enter town or city"
                    onChange={handleInputChange("townCity")} // Add this line
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                  {isButtonClicked && !fieldValidations.townCity.isValid && (
                    <p className="text-red-500">
                      {fieldValidations.townCity.errorMessage}
                    </p>
                  )}
                </div>
              </div>

              {!user && (
                <>
                  <h2 className="text-2xl font-semibold text-main mb-4">
                    Account Creation{" "}
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-600 font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="w-full border border-gray-300 rounded-md p-2"
                      onChange={handleInputChange("email")}
                      required={!user}
                    />
                    <p className="text-gray-600">
                      This email will be used to create your new account.
                    </p>
                    {isButtonClicked && !fieldValidations.email.isValid && (
                      <p className="text-red-500">
                        {fieldValidations.email.errorMessage}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-gray-600 font-medium mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Your Password"
                      className="w-full border border-gray-300 rounded-md p-2"
                      onChange={handleInputChange("password")}
                      required={!user}
                    />
                    <p className="text-gray-600">
                      Create a password that will keep your new account safe.
                    </p>
                    {isButtonClicked && !fieldValidations.password.isValid && (
                      <p className="text-red-500">
                        {fieldValidations.password.errorMessage}
                      </p>
                    )}
                  </div>
                </>
              )}
              <div className="mb-4">
                <label
                  htmlFor="terms"
                  className="block text-gray-600 font-medium mb-1"
                >
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={termsChecked}
                    onChange={handleTermsChange}
                    className="mr-2"
                  />
                  I accept the terms and conditions{" "}
                  <Link className="underline">Terms and condition</Link>
                </label>
                {isButtonClicked && !termsChecked && (
                  <p className="text-red-500">
                    Please accept the terms and conditions.
                  </p>
                )}
              </div>
            </div>

            <div className="md:col-span-1 bg-lightpurple  p-4 sm:p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-main mb-4 ">
                Order Details
              </h2>
              <div className="bg-white p-2 rounded">
                {" "}
                <div className="mb-4 p-2">
                  <h3 className="text-xl font-semibold mb-2">
                    Items in Your Order
                  </h3>
                  {/* Replace this with your actual order details logic */}
                  <div className="flex flex-col space-y-2">
                    {cart?.map((item) => (
                      <div key={item?.courses[0]?._id} className="">
                        <div>{item?.courses[0]?.title}</div>
                        <div className="flex pt-2 justify-between">
                          <div>${item?.courses[0]?.price}</div>
                          <div className="flex items-center">
                            <button
                              className="bg-main text-white text-xl md:text-2xl px-2 rounded-full"
                              onClick={() =>
                                handleRemoveItem(item._id, item.quantity - 1)
                              }
                            >
                              -
                            </button>
                            <span className="font-semibold mx-2">
                              {item?.quantity}
                            </span>
                            <button
                              className="bg-main text-white text-xl md:text-2xl px-2 rounded-full"
                              onClick={() =>
                                handleRemoveItem(item._id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-300 pt-2 ">
                  <div className="flex justify-between">
                    <span className="font-medium p-2">Total</span>
                    <span className="font-semibold">
                      ${calculateTotal(cart)}
                    </span>
                  </div>
                </div>
                {/* Payment method selection */}
                <div className="mb-4 mt-4">
                  <button
                    type="submit"
                    className={`bg-main text-white py-2 px-2 mt-2 rounded-md hover:bg-secondry text-lg ${
                      isButtonDisabled ? "opacity-50" : ""
                    }`}
                    onClick={handlePlaceOrder}
                    disabled={isButtonDisabled} // Disable the button when isButtonDisabled is true
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
