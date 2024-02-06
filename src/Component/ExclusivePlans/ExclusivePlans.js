import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import man from "../../../src/Assets/handsome-man-isolated-white-background (1).jpg";

const divContent3 = [
  {
    title: "Certified Platform",
    subtitle: "Expert With Designer",
    know: "Courses",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    title: "Certified Platform",
    subtitle: "Expert With Designer",
    know: "Courses",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    title: "Certified Platform",
    subtitle: "Expert With Designer",
    know: "Courses",
    arrowIcon: <AiOutlineArrowRight />,
  },
];
const divContent = [
  {
    title: "Basic",
    subtitle: "$ 200",
    know: [
      {
        topic: "Access To Five Countries Per Month",
        BsDot: <BsDot />,
      },
      {
        topic: "United access to access and assignments",
        BsDot: <BsDot />,
      },
      {
        topic: "Email Support",

        BsDot: <BsDot />,
      },
      {
        topic: "Price at  $10 per month",

        BsDot: <BsDot />,
      },
    ],
    btn: "Upgrade",
  },
  {
    title: "Standard",
    subtitle: "$ 200",
    know: [
      {
        topic: "Access To Five Countries Per Month",
        BsDot: <BsDot />,
      },
      {
        topic: "United access to access and assignments",
        BsDot: <BsDot />,
      },
      {
        topic: "Email Support",

        BsDot: <BsDot />,
      },
      {
        topic: "Price at  $10 per month",

        BsDot: <BsDot />,
      },
    ],
    btn: "Upgrade",
  },
  {
    title: "Premium",
    subtitle: "$ 200",
    know: [
      {
        topic: "Access To Five Countries Per Month",
        BsDot: <BsDot />,
      },
      {
        topic: "United access to access and assignments",
        BsDot: <BsDot />,
      },
      {
        topic: "Email Support",

        BsDot: <BsDot />,
      },
      {
        topic: "Price at  $10 per month",

        BsDot: <BsDot />,
      },
    ],
    btn: "Upgrade",
  },
];

const ExclusivePlans = () => {
  return (
    <div className="bg-lightpurple h-full text-white px-16 pb-6 ">
      <div className="grid grid-cols-12 gap-4">
        {divContent3.map((content) => {
          return (
            <>
              <div className="col-span-4   h-28 bg-gray-800 flex flex-col gap-2  items-center rounded-b-2xl  p-3">
                <p className="text-gray-300 text-center text-sm">
                  {content.title}
                </p>
                <p className="text-gray-300 text-center text-sm">
                  {content.subtitle}
                </p>
                <div className="flex items-center">
                  <p className="text-xs font-semibold text-gray-300">
                    {content.know}
                  </p>
                  <p className="text-lg font-semibold text-gray-300">
                    {content.BsDot}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="flex flex-col py-7 items-center">
        <div>
          <button className="bg-bottlegreen px-3 py-2 rounded-2xl text-xs">
            Meet All Members
          </button>
        </div>
        <div className="flex justify-between items-center pt-14  pb-3  w-full">
          <h2 className="font-bold text-gray-900">
            {" "}
            <span className="text-bottlegreen">Exclusive Plans </span>For You To
            Choose
          </h2>
          <button className="px-4 py-1 rounded-2xl border border-gray-700 bg-gray-800 text-xs font-bold">
            <div className="flex items-center justify-between">
              View All <AiOutlineArrowRight />
            </div>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3  items-center ">
        {divContent.map((content) => {
          return (
            <>
              <div className="col-span-4  bg-white shadow h-full rounded-3xl p-4  gap-3 ">
                <p className="text-gray-600 font-medium text-center">
                  {content.title}
                </p>
                <h1 className="text-gray-600 font-medium text-center">
                  {content.subtitle}
                </h1>
                <div>
                  {content.know.map((k) => {
                    return (
                      <>
                        <div className="flex items-center ">
                          <p className="text-2xl text-gray-900">{k.BsDot}</p>

                          <p className="text-gray-600 text-xs font-bold">
                            {k.topic}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="flex justify-center w-full py-2">
                  <button className="px-10 py-2 bg-lightpurple text-gray-700 hover:text-white hover:bg-bottlegreen rounded w-full">
                    {content.btn}
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {/* <div className="p-14">
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <img src={man} width="300px" className="w-full" />
          </div>
          <div className="col-span-6 p-14">
            <h1 className="text-gray-900 font-bold text-[35px]">
              Become An <span className="text-bottlegreen">Instructor</span>
            </h1>
            <p className="text-gray-400  text-[12px]">
              Instructor From Around The World Teach Millions Of Students On Our
              Platform We Provide The Tools And Skills To Teach What You Love
            </p>
           <div className="flex items-center justify-start py-5">
           <button className="px-5 py-2 bg-bottlegreen rounded-3xl">
              <div className="flex items-center justify-between gap-2 ">
                <p className="text-xs">Start Teaching Today </p>
                <span>
                  <AiOutlineArrowRight />
                </span>
              </div>
            </button>
           </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ExclusivePlans;
