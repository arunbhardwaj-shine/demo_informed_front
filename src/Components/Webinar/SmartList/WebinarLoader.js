import React from "react";

const WebinarLoader = (props) => {
  return (
    <>
      {console.log(props)}
      <div className="loader show" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
    </>
  );
};
export default WebinarLoader;
