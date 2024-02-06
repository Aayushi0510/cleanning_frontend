import React, { useState } from "react";
import Rating from "../Rating/Rating";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../Redux/Slice/CartSlice";
import videoSource from "../../Assets/course.mp4";
import BasicRating from "../Rating/Rating";

const TopBanner = ({ selectedCourse }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [coursesToAdd, setCoursesToAdd] = useState([selectedCourse]);

  
  const handleAddToCart = () => {
    dispatch(setCart({ courses: coursesToAdd, quantity: quantity }));
    console.log({ courses: coursesToAdd, quantity: quantity })
    navigate("/checkout");

  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    setCoursesToAdd((prevCourses) => [...prevCourses, selectedCourse]);

  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setCoursesToAdd((prevCourses) => prevCourses.slice(0, -1));

    }
  };
  return (
    <div className="w-full bg-gray-900 min-h-screen">
      <div className="container mx-auto flex flex-col md:flex-row gap-10 py-14 text-white">
        <div className="w-full md:w-1/2 flex flex-col gap-6 p-5">
          <div>
            <h1 className="text-xl md:text-5xl mb-2 md:mb-5 text-white">
              {selectedCourse?.subTitle}
            </h1>
            <p className="text-sm md:text-base leading-5 tracking-wider text-white">
              {selectedCourse?.description}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl md:text-2xl tracking-wide mb-2 md:mb-4 text-white">
              Rating
            </h2>
            <BasicRating selectedCourseRating={selectedCourse?.rating} />
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-main text-white text-xl md:text-2xl px-4 py-2 rounded-full"
              onClick={handleDecreaseQuantity}
            >
              <span className="font-bold">-</span>
            </button>
            <span className="text-white text-xl">{quantity}</span>
            <button
              className="bg-main text-white text-xl md:text-2xl px-4 py-2 rounded-full"
              onClick={handleIncreaseQuantity}
            >
              <span className="font-bold">+</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h2 className="text-xl md:text-2xl text-white">
              Price:{" "}
              {selectedCourse.price === 0
                ? "Free"
                : `$ ${selectedCourse.price}`}
            </h2>
            <button
              className="bg-main text-xl md:text-2xl px-6 py-3"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {/* Assuming 'videoSource' is the source of your video file */}
          <video
            controls
            className="object-cover w-full md:border-4 md:rounded-xl mt-6"
          >
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
