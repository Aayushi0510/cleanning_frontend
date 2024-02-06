import React, { useEffect, useState } from "react";
import { content } from "../../Utils/SafetyTrainingData";
import { OtherFeature } from "../../Utils/OtherFeaturesData";

import calender from "../../../Assets/calendar.png";
import certificate from "../../../Assets/course certficate.jpg";

import { checkData } from "../../Utils/checkData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const SafetyTraining = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 4;
  const { course } = useSelector((state) => state.course);
  // console.log(course ,"course")
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const totalSlides = Math.ceil(content.length / itemsPerSlide);
  const startIndex = currentSlide * itemsPerSlide;

  const visibleItems = course?.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  );

  // console.log(visibleItems,"visibleItems")

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // useEffect(() => {
  //   if (autoScroll) {
  //     auto();
  //   }
  //   return () => clearInterval(slideInterval);
  // }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <>
      <div className="py-14 w-ful ">
        <div className="container mx-auto">
          <h1 className="font-medium tracking-wide text-center text-main text-[30px]">
            Features
          </h1>
          <div className="grid grid-cols-12 ">
            {OtherFeature.map((feature) => {
              return (
                <>
                  <div className="col-span-12 md:col-span-4 ">
                    <div className="flex flex-col p-10">
                      <div className="flex justify-center">
                        <div className="text-center text-[60px]">
                          {feature.img}
                        </div>
                      </div>
                      <div className="flex justify-center mt-4">
                        <div className="text-gray-900 text-center text-oswald">
                          {feature.heading}
                        </div>{" "}
                      </div>
                      <div className="flex justify-center mt-4">
                        <div className="text-gray-600 tracking-wider text-center">
                          {feature.content}
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-14 w-full bg-main  ">
        <div className="container mx-auto bg-white flex flex-col  md:flex-row justify-between px-8 rounded-xl items-center gap-5 ">
        <div className="flex gap-4 w-full md:w-1/2 items-center">
            <div className="w-1-4 hidden md:block">
              <img src={calender} style={{ height: "120px", width: "180px" }} />
            </div>
            <div className="">
              <h1 className="font-bold text-2xl text-main pt-4 mb-2">
                Same Day Certificate
              </h1>
              <p className="text-gray-800 ">
                With WorkPlaceSafety, you do not have to chase instructors for
                your paperwork or wallet cards. With our training system, you
                can get the certificate on the same day, or you can learn at
                your own pace and decide when you want to finish your training.
              </p>
            </div>
          </div>
         <div className="w-full md:w-1/2 flex py-4 justify-center">
            <img
              src={certificate}
              className="rounded-xl  "
              style={{
                height: "100%",
                width: "80%",   
               
              }}
            />
          </div>
        </div>
        
      </div>

      <div className=" w-full py-2 flex flex-col md:flex-row item-center justify-evenly bg-black px-8 md:px-2">
        <div className="text-gray-400 text-sm">OHS Standards complaints</div>
        <div className="text-gray-400 text-sm">Unlinites Exam Attempts</div>
        <div className="text-gray-400 text-sm">Learn At your own peace</div>
        <div className="text-gray-400 text-sm">Printable Certificate</div>
      </div>
    </>
  );
};

export default SafetyTraining;
