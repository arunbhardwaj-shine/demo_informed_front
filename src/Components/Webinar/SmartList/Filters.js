import React, { useEffect } from "react";

const Filters = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);

  console.log("hi");
};
export default Filters;
