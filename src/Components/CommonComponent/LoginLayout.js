import React from "react";
import Header from "./HeaderComponent/Header";
import Sidebar from "./SidebarComponent/Sidebar";

const LoginLayout = ({ component: Component, ...rest }) => {
  return (
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
  );
};

export default LoginLayout;
