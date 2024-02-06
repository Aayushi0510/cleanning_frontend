import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";

import img1 from "../../../src/Assets/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg";
import img2 from "../../../src/Assets/creative-fengshui-practice-kitchen-arrangement.jpg"
import img3 from "../../../src/Assets/decorative-cosmetics-accessories-sunglasses-hat-white-table.jpg"
import img4 from "../../../src/Assets/laptop-with-camera-smartphone-table.jpg"
import img5 from "../../../src/Assets/vintage-furniture-antique-store.jpg"
import img6 from "../../../src/Assets/still-life-minimalist-lifestyle.jpg"
const divContent3 =[
  {
    image: img2,

      title:"Certified Platform"
  },
  {
    image: img2,
      title:"Certified Platform"
  },
  {
    image: img2,
      title:"Certified Platform"
  },
]

const divContent = [
  {
    image: img2,
    title: "Diana Ruselle",
    heartIcon: <AiOutlineHeart />,
    rate: "4.8",
    text: "Web Development is the best platform to upgrade the skills and creativity",
    enroll: "Enroll Now",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    image: img3,
    title: "Diana Ruselle",
    heartIcon: <AiOutlineHeart />,
    rate: "4.8",
    text: "Web Development is the best platform to upgrade the skills and creativity",
    enroll: "Enroll Now",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    image: img4,
    title: "Michael Dafford",
    heartIcon: <AiOutlineHeart />,
    rate: "4.8",
    text: "Web Development is the best platform to upgrade the skills and creativity",
    enroll: "Enroll Now",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    image: img5,
    title: "Diana Ruselle",
    heartIcon: <AiOutlineHeart />,
    rate: "4.8",
    text: "Web Development is the best platform to upgrade the skills and creativity",
    enroll: "Enroll Now",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    image: img6,
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
const divContent2 = [
  {
    text: "We Empowering ou to reach to your goals through online education",
    title: "Know More",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    text: "We Empowering ou to reach to your goals through online education",
    title: "Know More",
    arrowIcon: <AiOutlineArrowRight />,
  },
  {
    text: "We Empowering ou to reach to your goals through online education",
    title: "Know More",
    arrowIcon: <AiOutlineArrowRight />,
  },
];
const links = [
  {
    linkText: "All Courses",
    link: "allcourses",
  },
  {
    linkText: "UI/UX Design",
    link: "uidesign",
  },
  {
    linkText: "Marketing",
    link: "marketing",
  },
  {
    linkText: "Web Development",
    link: "webdevelopment",
  },
  {
    linkText: "Product Design",
    link: "productdesign",
  },
  {
    linkText: "Graphic Design",
    link: "graphicdesign",
  },
  {
    linkText: "SEO",
    link: "SEO",
  },
];
const Explore = () => {
  return (
    <>
      <div className="bg-gray-900 h-full text-white px-16">
        <div className="grid grid-cols-12 gap-4">
          {divContent2.map((content) => {
            return (
              <>
                <div className="col-span-4   bg-gray-800  h-32  flex flex-col gap-2  items-center rounded-b-2xl  p-3">
                  <p className="text-gray-300 text-center text-sm">
                    {content.text}
                  </p>
                  <div className="flex items-center">
                    <p className="text-xs font-semibold text-gray-300">
                      {content.title}
                    </p>
                    <p className="text-lg font-semibold text-gray-300">
                      {content.arrowIcon}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="flex justify-between items-center pt-14  pb-3">
          <h2 className="font-bold">
            {" "}
            Explore Our <span className="text-bottlegreen">All Courses</span>
          </h2>
          <button className="px-4 py-1 rounded-2xl border border-gray-700 bg-gray-800 text-xs font-bold">
            <div className="flex items-center justify-between">
              View All <AiOutlineArrowRight />
            </div>
          </button>
        </div>
        <div className="flex items-center justify-between border-b border-gray-800 py-4">
          {links.map((link) => {
            return (
              <>
                <Link to={link.link} className="text-xs text-gray-400">
                  {link.linkText}
                </Link>
              </>
            );
          })}
        </div>
        <div className=" grid grid-cols-12 gap-4 pt-6">
          {divContent.map((divItem) => {
            return (
              <div className="col-span-4   bg-gray-900 shadow rounded-2xl border-2 border-gray-800 p-3">
                <div className="flex flex-col gap-3">
                    <div>
                    <img
                        src={divItem.image}
                        className="rounded-xl"
                      />
                    </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={divItem.image}
                        className="rounded-full h-10 w-10"
                      />
                      <p className="text-xs text-gray-400 font-medium">{divItem.title}</p>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs">{divItem.heartIcon}</p>
                      <p className="text-xs">{divItem.rate}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium border-b border-gray-800 text-gray-400 pb-4">
                    {divItem.text}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-400">{divItem.enroll}</p>
                    <p>{divItem.arrowIcon}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-10 flex flex-col items-center ">
            <h2 className="text-center rounded-3xl px-8 py-1 bg-gray-800  font-medium ">Mentors</h2>
            <h2 className="text-center rounded-3xl px-8 py-1  text-3xl font-medium ">Transform <span className="text-bottlegreen">Your Life Through Online</span> Learning</h2>
            <h2 className="text-center rounded-3xl px-8 py-1  text-xs font-semibold ">Empower you to reach to your goals through online education</h2>

        </div>
        <div className="grid grid-cols-12 pt-10 gap-4">
            {divContent3.map((content)=>{
                return <>
                <div className="col-span-4  h-44 bg-slate-100 flex flex-col gap-2  items-center rounded-t-2xl border p-0">
                    <img src={content.image} alt="" className="h-full w-full rounded-t-2xl"/>

                </div>
                </>
            })}
        </div>
      </div>
    </>
  );
};

export default Explore;
