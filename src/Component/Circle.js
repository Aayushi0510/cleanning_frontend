import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Circle = () => {
  return (
    <>
      <div className="fixed top-6  border bg-gray-400 text-white w-12 z-40 h-12 rounded-full flex items-center justify-center">
        {/* You can place any content or icon inside the circle */}
        <span>
          <AiOutlineArrowLeft />
        </span> 
      </div>
    </>
  );
};

export default Circle;
