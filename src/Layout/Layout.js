import React from "react";
import Header from "../Component/Header";
import SideNavLayout from "./SideNavLayout";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  const pathWithoutHeader = "/courseplay"; 

  const showHeader = location.pathname !== pathWithoutHeader;
  return (
    <div className="overflow-hidden ">
      <div className="z-20"> {showHeader && <Header />}</div>
      <div className="-z-10">{children}</div>
    </div>
  );
}

export default Layout;
