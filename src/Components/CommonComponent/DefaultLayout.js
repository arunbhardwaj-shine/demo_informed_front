import React from "react";
import { Navigate } from "react-router-dom";

const DefaultLayout = ({ component: Component, header, footer, ...rest }) => {

  const isAuthenticated = localStorage.getItem("user_id") !== null;

  return (
    <div className="DefaultLayout">
      {
        isAuthenticated ?
          <Navigate to="/library-content" />
        : <Component {...rest} />
      }

    </div>
  );
};

export default DefaultLayout;
