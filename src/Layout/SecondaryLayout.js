import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

function SecondaryLayout({ children }) {
  return (
    <div className="flex flex-col  h-full  overflow-hidden ">
      <Header />


        <div className="-z-20">{children}</div>
      <Footer />

    </div>
  );
}


export default SecondaryLayout