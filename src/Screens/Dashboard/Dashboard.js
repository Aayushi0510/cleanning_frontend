import React, { useState, useEffect } from "react";
import DashboardRows from "../../Component/DashboardRows";
import { FaPlus } from "react-icons/fa";
import FAQAccordion from "../../Component/FAQAccordion";
import { setUser } from "../../Redux/Slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetOrderByUserIdQuery } from "../../Redux/Services/OrderService";
import { setIsTableLoading, setOrder } from "../../Redux/Slice/OrderSlice";

const colorMapping = {
  Blue: "#37474F",
  Green: "linear-gradient(45deg, #f1f2f3, #e0e0e0)",
  Teal: "linear-gradient(45deg, #48c9b0, #1abc9c)",
  Purple: "linear-gradient(45deg, #9b59b6, #8efitad)",
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
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.order);
  const { data, isFetching, isLoading } = useGetOrderByUserIdQuery(user?._id);
  console.log(data?.data, "order");

  useEffect(() => {
    if (!isLoading && !isFetching) {
      dispatch(setOrder(data?.data));
    } else {
      dispatch(setIsTableLoading(true));
    }
  }, [isFetching, isLoading, data, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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
    <div className="py-3 flex flex-col px-4 w-full z-0 ">
      <div className="pt-10 border-b border-gray-300 pb-4">
        <h1 className="   text-slate-700 font-medium text-xl">
          Hello, {user?.name}
        </h1>
      </div>

      <div className="w-full border border-gray-300 rounded mt-6">
        <div className="flex items-center justify-between py-2 mt-4 p-3 border-b border-gray-300 ">
          <h1 className="text-gray-800 font-medium">My Courses</h1>
          <Link
            to={"/courses"}
            className="bg-main hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            Buy More Courses
          </Link> 
        </div>
        <div className="grid grid-cols-12 items-center justify-between py-2  rounded border-b bg-gray-200  border-gray-300 p-3 ">
          <h1 className="text-gray-800 font-medium text-xs col-span-3">
            COURSES
          </h1>
          <h1 className="text-gray-800 font-medium text-xs col-span-3">
            WALLET CARD
          </h1>
          <h1 className="text-gray-800 font-medium text-xs col-span-3">
            RETRAINING DATE
          </h1>
        </div>
        {data?.data.map((orderItem, orderIndex) => (
          <>
            {orderItem.courseId?.map((course, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center justify-between gap-2 py-2 p-3 border-b border-gray-200"
              >
                <h1 className="text-gray-800 text-sm md:text-base font-medium col-span-3">
                  {course.title}
                </h1>
                <h1 className="text-gray-800 px-3 py-2 font-medium text-[8px] sm:text-base bg-gray-300 rounded-2xl p-1 col-span-3">
                  Course not finished
                </h1>
                <h1 className="text-gray-800 px-3 py-2 font-medium text-[8px] sm:text-base bg-gray-300 rounded-2xl p-1 col-span-3">
                  Course not finished
                </h1>
                <div className="flex items-center justify-end col-span-3">
                  <Link
                    to={`/coursemodule/${course._id}`}
                    className="bg-transparent text-main border border-main font-semibold text-[8px] sm:text-base py-1 px-4 rounded"
                  >
                    Launch Courses
                  </Link>
                </div>
              </div>
            ))}
          </>
        ))}

        <div className="flex items-center justify-between py-2    p-3 border-b border-gray-200 ">
          <h1 className="text-gray-300 font-medium">Showing 1 courses</h1>
        </div>
      </div>
      <div className="w-full border border-gray-300 rounded mt-6">
        <div className="grid grid-cols-12  items-center justify-between py-2 mt-4   p-3 border-b border-gray-300 ">
          <h1 className="text-gray-800 font-medium col-span-6 ">
            Transaction History
          </h1>
          <div className="col-span-6 flex justify-end ">
            <Link
              to={"/dashboard/receipt"}
              className="bg-transparent  text-main border border-main  font-semibold text-sm sm:text-base py-1 px-4 rounded"
            >
              {" "}
              View All Receipt
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12  items-center justify-between py-2  rounded border-b bg-gray-200  border-gray-300 p-3 ">
          <h1 className="text-gray-800 font-medium text-xs col-span-2">ID</h1>
          <h1 className="text-gray-800 font-medium text-xs col-span-3 sm:col-span-2">Date</h1>
          <h1 className="text-gray-800 font-medium text-xs col-span-3 sm:col-span-2">
            Status
          </h1>

          <h1 className="text-gray-800 font-medium text-xs col-span-2">
            Total
          </h1>

          <h1 className="col-span-2"></h1>
        </div>
        <div className="grid grid-cols-12  items-center justify-between py-2    p-3 border-b border-gray-200 ">
          <h1 className="text-gray-800 font-medium text-[8px] sm:text-base col-span-2 ">354FHF</h1>

          <div className="flex items-center col-span-3 sm:col-span-2 ">
            <h1 className="text-gray-800 font-medium text-[8px] text-center  sm:text-base bg-gray-300 rounded-2xl p-1">
              May 18,2023
            </h1>
          </div>
          <div className="flex items-center  col-span-3 sm:col-span-2 ">
            <h1 className="text-gray-800 font-medium text-[8px]  sm:text-base bg-gray-300 rounded-2xl p-1">
              Completed
            </h1>
          </div>

          <div className="flex items-center  col-span-2 ">
            <h1 className="text-gray-800 font-medium text-[8px] sm:text-base bg-gray-300 rounded-2xl p-1">
              $345.6
            </h1>
          </div>

          <div className="flex justify-end col-span-2 sm:col-span-4  ">
            <buttton 
                    className="bg-transparent text-main border border-main font-semibold text-[8px] sm:text-base py-1 px-4 rounded">
                    Launch Courses
            </buttton>
          </div>
        </div>
        <div className="flex items-center justify-between py-2    p-3 border-b border-gray-200 ">
          <h1 className="text-gray-300 font-medium col-span-2">
            Showing 1 courses
          </h1>
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
  );
};

export default Dashboard;
