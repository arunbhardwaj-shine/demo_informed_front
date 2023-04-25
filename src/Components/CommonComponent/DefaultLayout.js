import React from "react";

const DefaultLayout = ({ component: Component, header, footer, ...rest }) => {
  return (
    <div className="DefaultLayout">
        <Component {...rest} />
    </div>
  );
};

export default DefaultLayout;
