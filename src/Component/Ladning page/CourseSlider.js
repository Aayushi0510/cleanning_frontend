// CourseSlider.js
import React, { useEffect, useState } from 'react';
import img2 from "../../Assets/people-safety-equipment-their-workplace.jpg";
import { Link } from 'react-router-dom';

const CourseSlider = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? items.length - 1 : prevIndex - 1
      );
    };
  
    useEffect(() => {
      // Auto-slide every 5 seconds (adjust the interval as needed)
      const intervalId = setInterval(() => {
        nextSlide();
      }, 5000);
  
      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }, [currentIndex]); 

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className='bg-lightpurple relative w-full px-0 md:px-24 py-9'>
      <div className="container mx-auto  overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out transform translate-x-0 ">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white px-3 py-5 flex-shrink-0 w-full md:w-1/3  mx-1 sm:mx-2 my-2"
            >
              <img
                src={img2}
                alt={`slide-${index}`}
                className="object-cover h-56 w-full"
              />
              <h2 className="text-center text-main font-semibold text-xl mt-4 ">
                {item.title}
              </h2>
              <h2 className="text-center text-gray-600  px-2">
                {truncateDescription(item.description, 70)}
              </h2>
              <div className="flex items-center mt-4 justify-center">
                <Link
                  className="bg-main rounded-md text-white mt-3 px-5 py-1"
                  to={`/course/${item._id}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-1 md:left-4 transform -translate-y-1/2 bg-main text-white px-4 py-2 rounded-full"
          onClick={prevSlide}
        >
          Prev
        </button>
        <button
          className="absolute top-1/2 right-1 md:right-3 transform -translate-y-1/2 bg-main text-white px-4 py-2 rounded-full"
          onClick={nextSlide}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseSlider;
