import React from "react";

import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const {Components} =props

  return (
    <>
    <div className="h-full ">
    <Components />

    </div>
    </>
  );
};

export default ProtectedRoutes;