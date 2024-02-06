import React from "react";
import officeImage1 from "../../../Assets/office.jpg";
import officeImage from "../../../Assets/banner.jpg";
import { useNavigate } from "react-router-dom";

const CardLogin = () => {
  const navigate=useNavigate()
  return (
    <div className="py-10 flex flex-col md:flex-row m-auto justify-center items-center gap-5 md:gap-20">
      <div
        className="flex-col-1 bg-cover rounded relative h-[300px] w-[350px]"
        style={{ backgroundImage: `url(${officeImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded"></div>
        <div className="flex justify-center items-center relative h-full">
          <button className="text-black font-bold px-4 py-4 font-roboto rounded-3xl bg-mains"
          onClick={()=>
          navigate("/login")}>
            Corporate Login
          </button>
        </div>
      </div>
      <div
        className="flex-col-2 bg-cover rounded bg-opacity-60 relative h-[300px] w-[350px]"
        style={{ backgroundImage: `url(${officeImage})`}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded"></div>
        <div className="flex justify-center items-center relative h-full">
          <button className="text-black font-bold px-4 rounded-3xl py-4 bg-mains font-roboto"
            onClick={()=>
              navigate("/login")}>
            Individual Worker Login
          </button>
          {/* Your content */}
        </div>
      </div>
    </div>
  );
};

export default CardLogin;
