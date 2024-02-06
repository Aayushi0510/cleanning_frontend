import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import img2 from "../../Assets/people-safety-equipment-their-workplace.jpg";
import { content } from "../Utils/SafetyTrainingData";


const FeaturedCourse = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { course } = useSelector((state) => state.course);
  const itemsPerSlide = 4;

  useEffect(() => {
    if (course && course.length > 1 && course.length <= itemsPerSlide) {
      // If there are fewer than 4 courses, stop auto-scrolling
      return;
    }

    const autoScroll = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [currentSlide, course]);

  const truncateDescription = (text, maxLength) => {
    if (text?.length <= maxLength) return text;
    return text?.substr(0, maxLength) + "...";
  };

  const renderEmptySpace = () => (
    <div className="flex flex-col w-full gap-3">
      <div className="bg-gray-200 "></div>
    </div>
  );

  const getVisibleItems = () => {
    if (course.length === 1) {
      return [course[0], null, null, null];
    }else if(course.length === 2) {
      return [course[0], course[1], null, null];
    }
    else if(course.length === 3) {
      return [course[0], course[1], course[2], null];
    }
    const rotatedItems = course.slice(
      currentSlide,
      currentSlide + itemsPerSlide
    );

    const remainingItems = itemsPerSlide - rotatedItems.length;

    if (remainingItems > 0) {
      const result = [...rotatedItems, ...course.slice(0, remainingItems)];
      console.log("Result:", result);
      return result;
    }

    return rotatedItems;
  };

  const nextSlide = () => {
    if (course.length > itemsPerSlide) {
      setCurrentSlide((currentSlide + 1) % course.length);
    }
  };

  return (
    <div>
      {course ? (
        <div className="bg-lightpurple w-full px-8 py-9">
          <div className="relative">
            <h1 className="font-medium text-[30px] text-main text-center pt-4 pb-4">
              Featured Course
            </h1>
            <div className="border-b border-red-800 mx-auto w-20 "></div>

            <p className="text-center font-normal text-gray-700 pt-4 px-2 pb-4">
              Explore the hot topics in our list of courses
            </p>
            <div className="w-full flex flex-col md:flex-row items-center gap-5">
              {course.length > itemsPerSlide && (
                <button
                  className="bg-main rounded-full text-white px-3 py-1"
                  onClick={nextSlide}
                >
                  &lt;
                </button>
              )}

              {getVisibleItems().map((div, index) => (
                <div key={index} className="flex flex-col w-full gap-3">
                  {div ? (
                    <div className="bg-white flex flex-col relative pb-5">
                      <img
                        src={img2}
                        alt={`course-${index}`}
                        className="object-cover h-56 w-full"
                      />
                      <div className="bg-red-800  px-5 py-5 w-24 h-[22px] flex items-center rounded-l-full absolute top-0 right-0 text-white text-xs">
                        <p className="text-xs"> {div.price === 0 ? "Free" : `$ ${div.price}`} </p>
                      </div>

                      <h2 className="px-4 py-4 text-main tracking-wide font-semibold text-lg">
                        {div.title}
                      </h2>
                      <h2 className="px-4 text-gray-600 pb-4  ">
                        {truncateDescription(div?.description, 40)}
                      </h2>
                      <div className="bg-gray-200 mt-2 h-1"></div>
                      <div className="p-3 flex justify-between">
                        <div className="flex flex-col">
                        <span className="text-sm text-gray-500"                      >
                        Duration:
                      </span>
                      <span   className="text-sm text-gray-500"                    >
                        2hourse 30 min
                      </span>
                        </div>
                        <Link
                          className="text-black bg-mains text-xs  font-semibold mt-3 px-4 py-2 rounded"
                          to={`/course/${div._id}`}
                        >
                          VIEW MORE
                        </Link>
                      </div>
                    </div>
                  ) : (
                    renderEmptySpace()
                  )}
                </div>
              ))}

              {course.length > itemsPerSlide && (
                <button
                  onClick={nextSlide}
                  className="bg-main rounded-full text-white px-3 py-1"
                >
                  &gt;
                </button>
              )}
            </div>
            <div className="flex justify-center items-center relative h-full pt-10">
              <button className="text-black px-6 py-3 font-roboto rounded-3xl bg-mains">
                Online courses
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default FeaturedCourse;
