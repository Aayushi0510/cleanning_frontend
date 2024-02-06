import React, { useState, useEffect } from "react";
import DashboardRows from "../Component/DashboardRows";
import { FaPlus } from "react-icons/fa";
import FAQAccordion from "../Component/FAQAccordion";
import MainLayout from "../Layout/Mainlayout";

const colorMapping = {
  Blue: "#37474F",
  Green: "linear-gradient(45deg, #f1f2f3, #e0e0e0)",
  Teal: "linear-gradient(45deg, #48c9b0, #1abc9c)",
  Purple: "linear-gradient(45deg, #9b59b6, #8e44ad)",
  Gold: "#78909C",
};
const faqAnswers = [
  {
    q: "Our return policy allows you to return items within 30 days of purchase for a full refund.",
    icon: <FaPlus />,
  },
  {
    q: "Our return policy allows you to return items within 30 days of purchase for a full refund.",
    icon: <FaPlus />,
  },
  {
    q: "Once your order is shipped, you'll receive a tracking number via email to monitor its status.",
    icon: <FaPlus />,
  },
  {
    q: "Yes, we offer international shipping to several countries. Shipping fees may apply.",
    icon: <FaPlus />,
  },
];
const Main = () => {
  const [loading, setLoading] = useState(false);

  const DashboardData = [
    {
      title: "Total Bookings",
      value: 3,
      color: "Blue",
    },
    {
      title: "Total Bookings Complete",
      value: 3,
      color: "Gold",
    },
    {
      title: "Total Bookings Processing",
      value: 2,
      color: "Blue",
    },
    {
      title: "Total Bookings Pending",
      value: 1,
      color: "Gold",
    },
    {
      title: "Total Providers",
      value: 23,
      color: "Blue",
    },
    {
      title: "Total Users",
      value: 4,
      color: "Gold",
    },
  ];

  const items = [
    [
      { type: "text", content: "My Courses" },
      { type: "", content: "" },
      {
        type: "button",
        content: "Buy More Courses",
        action: () => alert("New Button clicked!"),
      }, // This could be replaced by a button
    ],
    [
      { type: "text", content: "COURSE" },
      { type: "text", content: "WALLET CARD" },
      { type: "text", content: "RETRAINING DATE" },
    ],
    [
      { type: "text", content: "WHIMIS" },
      { type: "text", content: "Course not finished" },
      { type: "text", content: "Course not finished" },
      {
        type: "button",
        content: "Buy More Courses",
        action: () => alert("New Button clicked!"),
      },
    ],
  ];

  // Replace 'Orange' with a button in the first row

  const faqData = [
    {
      question: "What is the return policy?",
      answer:
        "Our return policy allows you to return items within 30 days of purchase for a full refund.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via email to monitor its status.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to several countries. Shipping fees may apply.",
    },
    // Add more FAQ objects as needed
  ];
  return (
    <MainLayout>
    <div className="py-3 flex flex-col px-4 w-full ">
      <div className="pt-10 border-b border-gray-300 pb-4">
        <h1 className="   text-slate-700 font-medium text-xl">Hello,Naimesh</h1>
        <span className="text-xs">15 November'2023</span>
      </div>

      <div className="w-full border border-gray-300 rounded mt-6">
        <div className="flex items-center justify-between py-2 mt-4   p-3 border-b border-gray-300 ">
          <h1 className="text-gray-800 font-medium">My Courses</h1>
          <buttton className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">
            {" "}
            Buy More Courses
          </buttton>
        </div>
        <div className="flex items-center justify-between py-2  rounded border-b bg-gray-200  border-gray-300 p-3 ">
          <h1 className="text-gray-800 font-medium text-xs">COURSES</h1>
          <h1 className="text-gray-800 font-medium text-xs">WALLET CARD</h1>
          <h1 className="text-gray-800 font-medium text-xs">RETRAINING DATE</h1>
          <h1></h1>
        </div>
        <div className="flex items-center justify-between py-2    p-3 border-b border-gray-200 ">
          <h1 className="text-gray-800 font-medium">WHIMS</h1>
          <h1 className="text-gray-800 font-medium text-xs bg-gray-300 rounded-2xl p-1">
            Course not finished
          </h1>
          <h1 className="text-gray-800 font-medium text-xs bg-gray-300 rounded-2xl p-1">
            Course not finished
          </h1>

          <buttton className="bg-transparent  text-gray-500 border border-gray-300  font-bold py-1 px-4 rounded">
            {" "}
            Launch Courses
          </buttton>
        </div>
        <div className="flex items-center justify-between py-2    p-3 border-b border-gray-200 ">
          <h1 className="text-gray-300 font-medium">Showing 1 courses</h1>
        </div>
      </div>
      <div className="w-full border border-gray-300 rounded mt-6">
        <div className="flex items-center justify-between py-2 mt-4   p-3 border-b border-gray-300 ">
          <h1 className="text-gray-800 font-medium">Transaction History</h1>
          <buttton className="bg-transparent  text-gray-500 border border-gray-300  font-bold py-1 px-4 rounded">
            {" "}
            View All Recipies
          </buttton>
        </div>
        <div className="flex items-center justify-between py-2  rounded border-b bg-gray-200  border-gray-300 p-3 ">
          <h1 className="text-gray-800 font-medium text-xs">ID</h1>
          <h1 className="text-gray-800 font-medium text-xs">Date</h1>
          <h1 className="text-gray-800 font-medium text-xs">Status</h1>

          <h1 className="text-gray-800 font-medium text-xs">Total</h1>

          <h1></h1>
        </div>
        <div className="flex items-center justify-between py-2    p-3 border-b border-gray-200 ">
          <h1 className="text-gray-800 font-medium">354FHF</h1>
          <h1 className="text-gray-800 font-medium text-xs bg-gray-300 rounded-2xl p-1">
            May 18,2023
          </h1>
          <h1 className="text-gray-800 font-medium text-xs bg-gray-300 rounded-2xl p-1">
            Completed
          </h1>
          <h4 className="text-gray-800 font-medium text-xs bg-gray-300 rounded-2xl p-1">
            $345.6
          </h4>

          <buttton className="bg-transparent  text-gray-500 border border-gray-300  font-bold py-1 px-4 rounded">
            {" "}
            Launch Courses
          </buttton>
        </div>
        <div className="flex items-center justify-between py-2    p-3 border-b border-gray-200 ">
          <h1 className="text-gray-300 font-medium">Showing 1 courses</h1>
        </div>
      </div>

      <div className="w-full py-7">
        <h1 className="text-blue-950 font-bold py-3 ">
          Frequently Asked Questions
        </h1>
        <div className="shadow w-full bg-gray-200 p-2 border border-gray-300  rounded ">
          <h5 className="text-orange-400 font-semibold ">
            Is there a time limit to complete a Course?
          </h5>
          <span className="text-xs text-gray-800">
            Once a customer begins the safety training courses ,he/she will have
            up to a year to complete the program.Consideriing the course
            lengthOnce a customer begins the safety training courses ,he/she
            will have up to a year to complete the program.Consideriing the
            course length,
          </span>
        </div>
        <div className="w-full pt-3">
          {/* <FAQAccordion faqData={faqData} /> */}
          {/* {faqAnswers.map((faq) => {
            return (
              <>
                <div className="shadow flex items-center justify-between w-full bg-white-100 py-3 px-2 border border-gray-300  rounded text-xs text-gray-800">
                  {faq.q}
                  {faq.icon}
                </div>
              </>
            );
          })} */}
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default Main;
