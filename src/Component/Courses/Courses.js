import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";

import img1 from "../../../src/Assets/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg";

const divContent = [
  {
    image: img1,
    title: "Diana Ruselle",
    heartIcon: <AiOutlineHeart />,
    rate: "4.8",
    text: "Web Development is the best platform to upgrade the skills and creativity",
    enroll: "Enroll Now",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    image: img1,
    title: "Diana Ruselle",
    heartIcon: <AiOutlineHeart />,
    rate: "4.8",
    text: "Web Development is the best platform to upgrade the skills and creativity",
    enroll: "Enroll Now",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    image: img1,
    title: "Michael Dafford",
    heartIcon: <AiOutlineHeart />,
    rate: "4.8",
    text: "Web Development is the best platform to upgrade the skills and creativity",
    enroll: "Enroll Now",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    image: img1,
    title: "Diana Ruselle",
    heartIcon: <AiOutlineHeart />,
    rate: "4.8",
    text: "Web Development is the best platform to upgrade the skills and creativity",
    enroll: "Enroll Now",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    image: img1,
    title: "Diana Ruselle",
    heartIcon: <AiOutlineHeart />,
    rate: "4.8",
    text: "Web Development is the best platform to upgrade the skills and creativity",
    enroll: "Enroll Now",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    image: img1,
    title: "Michael Dafford",
    heartIcon: <AiOutlineHeart />,
    rate: "4.8",
    text: "Web Development is the best platform to upgrade the skills and creativity",
    enroll: "Enroll Now",
    arrowIcon: <AiOutlineArrowRight />,
  },
];
const divContent2 =[
    {
        icon:<CiSettings/>,
        title:"Certified Platform"
    },
    {
        icon:<CiSettings/>,
        title:"Certified Platform"
    },
    {
        icon:<CiSettings/>,
        title:"Certified Platform"
    },
]
const Courses = () => {
  return (
    <>
      <div className="bg-lightpurple h-full w-full px-16 pt-20">
        <div className="flex justify-between items-center py-3">
          <h2 className="font-bold">
            Our <span className="text-bottlegreen">Top Courses</span>
          </h2>
          <button className="px-4 py-1 rounded-2xl border border-gray-700 bg-gray-800 text-white text-xs font-bold">

            <div className="flex items-center justify-between">
              View All <AiOutlineArrowRight />
            </div>
          </button>
        </div>
        <div className=" grid grid-cols-12 gap-4">
          {divContent.map((divItem) => {
            return (
              <div className="col-span-4  h-44 bg-slate-100 shadow rounded-2xl border p-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={divItem.image}
                        className="rounded-full h-10 w-10"
                      />
                      <p className="text-xs font-medium text-gray-600 ">{divItem.title}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-gray-600 ">{divItem.heartIcon}</p>
                      <p className="text-xs text-gray-600 ">{divItem.rate}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium border-b border-gray-200 text-gray-600 pb-4">{divItem.text}</div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-600 ">{divItem.enroll}</p>
                    <p className="text-gray-600 ">{divItem.arrowIcon}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-10 flex flex-col items-center ">
            <h2 className="text-center rounded-3xl px-8 py-1 bg-gray-200  font-medium ">Features</h2>
            <h2 className="text-center rounded-3xl px-8 py-1  text-[28px] font-medium ">Why We <span className="text-bottlegreen">Are Better Than</span> Others</h2>
            <h2 className="text-center rounded-3xl px-8 py-1 text-gray-600  text-xs font-medium ">Empower you to reach to your goals through online education</h2>

        </div>
        <div className="grid grid-cols-12 gap-4">
            {divContent2.map((content)=>{
                return <>
                <div className="col-span-4  h-32 bg-slate-100 flex flex-col gap-2  items-center rounded-t-2xl border p-3">
                    <h1>{content.icon}</h1>
                    <p className="text-lg font-semibold">{content.title}</p>

                </div>
                </>
            })}
        </div>
      </div>
    </>
  );
};

export default Courses;
