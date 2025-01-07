import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const Proctected = () => {
  
  let Token = localStorage.getItem("Token");
  return Token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/webinar" />
  );
};

export default Proctected;
