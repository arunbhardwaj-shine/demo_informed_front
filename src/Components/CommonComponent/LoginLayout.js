import React from "react";
import Header from "./HeaderComponent/Header";
import Sidebar from "./SidebarComponent/Sidebar";
import { Route, Navigate } from "react-router-dom";

const LoginLayout = ({ component: Component, ...rest }) => {
  // Check if the user is authenticated (e.g. via a token stored in localStorage)
  const isAuthenticated = localStorage.getItem("user_id") !== null;

  return (
    <>
    {
      isAuthenticated ?
      <>
        <Header />
        <div className="warpper">
          <div className="container-fluid">
            <div className="row">
              <Sidebar />
              <Component {...rest} />
            </div>
          </div>
        </div>
      </>
      : <Navigate to="/" />
    }
    </>
  );
};

export default LoginLayout;
