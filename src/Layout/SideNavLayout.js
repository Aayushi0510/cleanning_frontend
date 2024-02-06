import React, { useState } from "react";
import { SideNavLayoutData as sideLinks } from "../Component/Utils/SideNavLayoutData";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../src/Assets/logo.jpg";

const SideNavLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const { logOut } = useUserAuth();

  const handleLogout = () => {};
  const handleOpenSideBar = () => {};
  return (
    <>
      <div
        className={`bg-secondry h-full lg:w-[270px] xs:hidden lg:block 
            
             text-white p-4 sticky top-0 `}
      >
        {sideLinks.map((sideLink, i) => {
          if (sideLink.title === "Logout") {
            return (
              <div
                key={i}
                className="flex items-center gap-7 py-4 px-2 border-yellow-100 border-b-double shadow-lg hover:bg-slate-800"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                <div className="text-white">{sideLink.icons}</div>
                <span>{sideLink.title}</span>
              </div>
            );
          } else {
            return (
              <div
                key={i}
                className="flex items-center mb-3 gap-7 py-4 px-2 border-yellow-100 border-b-double shadow-lg hover:bg-slate-800"
              >
                <div className="text-white">{sideLink.icons}</div>
                <Link to={sideLink.link}>{sideLink.title}</Link>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default SideNavLayout;
