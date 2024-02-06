import React from "react";
import Header from "../Component/Header";
import SideNavLayout from "./SideNavLayout";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col   h-full  z-99   overflow-hidden ">
     
      <div className=" top-0 w-full h-full xs:absolute z-0 md:static flex flex-col md:flex-row  ">
       <div className="w-1/5">
       <SideNavLayout className="h-full" />
       </div>
        <div className="-z-10 w-full  md:w-4/5 min-h-screen px-3 bg-gray-50">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
