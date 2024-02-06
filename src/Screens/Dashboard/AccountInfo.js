import React, { useState } from "react";
import { useSelector } from "react-redux";

const AccountInfo = () => {
  const {user}=useSelector((state)=>state.auth)
  const [users, setUsers] = useState({
    firstName: user?.name,
    // lastName: user,
    email: user?.email,
    username: user?.name,
    // Add more user information as needed
  });

  const handleChange = (field, value) => {
    setUsers((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., update user data in the database
    console.log("Form submitted:", users);
  };

  return (
    <>
      
      <div className="container  mx-auto mt-8 px-4 pt-4 pb-8">
      <h1 className="text-2xl font-semibold text-main mb-4">Account Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-600 font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={users.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-600 font-medium mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={users.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={users.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={users.username}
            onChange={(e) => handleChange('username', e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        {/* Add more form fields as needed */}
        <button
          type="submit"
          className="bg-main text-white py-2 px-4 rounded-md hover:bg-secondry"
        >
          Save Changes
        </button>
      </form>
    </div>
    </>
  );
};

export default AccountInfo;
